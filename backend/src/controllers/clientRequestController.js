import { PrismaClient } from '../../generated/prisma/index.js';
import sendClientRequestEmailToAdmin from '../utils/sendClientRequestEmailToAdmin.js';
import { uploadFileToS3 } from '../utils/s3Uploader.js';
import { generateSignedDownloadUrl } from '../utils/s3Uploader.js';


const prisma = new PrismaClient();

export const submitClientRequest = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;

    // ✅ Parse form-data parts
    const basicInfo = JSON.parse(req.body.basicInfo);
    const selectedHelp = JSON.parse(req.body.selectedHelp);
    const answers = JSON.parse(req.body.answers);

    // ✅ Dummy fileUrls for now
    // const fileUrls = req.files?.map((file) => `dummy-url/${file.originalname}`) || [];
    const uploadedUrls = [];

    // ✅ Handle file uploads to S3 and collecting URLs
    if (req.files && req.files.length > 0) {
        for (const file of req.files) {
            const url = await uploadFileToS3(file);
            uploadedUrls.push(url);
        }
    }

    // ✅ Save to DB
    const newRequest = await prisma.clientRequest.create({
      data: {
        userId,
        basicInfo,
        selectedHelp,
        answers,
        uploadedFiles: uploadedUrls, // Store S3 URLs
      }
    });
      
    // ✅ Send email to admin
    await sendClientRequestEmailToAdmin(user, newRequest);

    res.status(201).json({ success: true, request: newRequest });

  } catch (error) {
    console.error('❌ Failed to submit request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 🆕 NEW: Get all client requests for the logged-in user
export const getMyClientRequests = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const requests = await prisma.clientRequest.findMany({
        where: { userId },
        orderBy: { submittedAt: 'desc' },
      });
  
      res.json({ success: true, requests });
    } catch (err) {
      console.error('❌ Failed to fetch client requests:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getQuoteDownloadLink = async (req, res) => {
  console.log(`here is the getQuoteDownloadLink function`);
  const userId = req.user.id; // this is the id that is present in the JWT token (req) and it's from "User" table
  const { requestId } = req.params; // this is the id of the request from "ClientRequest" table

  try {
    const request = await prisma.clientRequest.findUnique({
      where: { id: requestId },
    });

    if (!request || request.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (!request.quotePdfUrl) {
      return res.status(404).json({ error: 'No quote uploaded yet' });
    }
    
    const fullPath = request.quotePdfUrl; // 'admin-quotes/xyz.pdf'
    const key = fullPath.split('/').pop(); // gets just 'xyz.pdf'
    console.log(`Generating signed URL for request ${requestId} with quote URL ${key}`);
    const signedUrl = generateSignedDownloadUrl(request.quotePdfUrl);
    return res.json({ url: signedUrl });
  } catch (err) {
    console.error('❌ Error generating signed link:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
  