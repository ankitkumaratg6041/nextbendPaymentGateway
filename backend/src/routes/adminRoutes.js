import express from 'express';
import { getAllClientRequests, getUserRequestDetail } from '../controllers/adminController.js';
import { authenticateAdmin } from '../middlewares/authenticateAdmin.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import multer from 'multer';
import { uploadQuotePdf } from '../controllers/adminController.js';


const upload = multer(); // using memory storage for s3 uploads
const adminRouter = express.Router();

adminRouter.get('/requests', authenticateUser, getAllClientRequests);
adminRouter.get('/user/:userId/request/:requestId', authenticateUser, getUserRequestDetail);

adminRouter.post(
    '/upload-quote/:requestId',
    authenticateUser, // You can change to authenticateAdmin if needed
    upload.single('quotePdf'),
    uploadQuotePdf
  );


export default adminRouter;
