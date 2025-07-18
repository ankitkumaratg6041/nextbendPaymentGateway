import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Load env vars
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

export async function uploadFileToS3(file) {
  const fileExtension = path.extname(file.originalname);
  const uniqueFileName = `${uuidv4()}${fileExtension}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: uniqueFileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location; // this is the public URL
}

export async function uploadAdminQuoteToS3(file, requestId) {
  const fileExtension = path.extname(file.originalname);
  const key = `admin-quotes/${requestId}${fileExtension}`; // fixed file name: admin-quotes/<requestId>.pdf

  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const uploadResult = await s3.upload(params).promise();
  return {
    location: uploadResult.Location, // full URL
    key,                              // s3 object key (used for signed URLs later)
  };
}

export function generateSignedDownloadUrl(key) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
  });

  const params = {
    Key: `${key}`,
    Bucket: process.env.AWS_BUCKET_NAME,
    Expires: 120, // 2 minutes expiry
    ResponseContentDisposition: 'inline', // shows PDF in browser
  };

  return s3.getSignedUrl('getObject', params);
}
