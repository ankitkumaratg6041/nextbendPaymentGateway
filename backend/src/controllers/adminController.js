import { uploadAdminQuoteToS3 } from '../utils/s3Uploader.js';
import { PrismaClient } from '../../generated/prisma/index.js';
const prisma = new PrismaClient();

export const getAllClientRequests = async (req, res) => {
  try {
    // (Optional) Add admin check here in future
    const requests = await prisma.clientRequest.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            companyName: true
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      }
    });

    res.json({ requests });
  } catch (err) {
    console.error('❌ Failed to fetch client requests:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUserRequestDetail = async (req, res) => {
  const { userId, requestId } = req.params;
  console.log(`Fetching request ${requestId} for user ${userId}`);

  try {
    console.log(`Checking if user ${userId} is authorized to view request ${requestId}`);
    const request = await prisma.clientRequest.findFirst({
      where: {
        id: requestId,
        userId: parseInt(userId)
      }
    });
    console.log(`Request found:`, request);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.status(200).json({ request });
  } catch (err) {
    console.error('Error fetching client request:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const uploadQuotePdf = async (req, res) => {
  try {
    const { requestId } = req.params;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded." });

    const { location, key } = await uploadAdminQuoteToS3(file, requestId);

    await prisma.clientRequest.update({
      where: { id: requestId },
      data: { quotePdfUrl: key }, // Save only the key — for signed URL
    });

    res.status(200).json({ success: true, message: "Quote uploaded", quoteUrl: location });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    res.status(500).json({ error: "Server error" });
  }
};