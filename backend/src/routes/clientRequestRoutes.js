import express from 'express';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { getMyClientRequests, submitClientRequest } from '../controllers/clientRequestController.js';
import { getQuoteDownloadLink } from '../controllers/clientRequestController.js';
import multer from 'multer';

const requestRouter = express.Router();
const upload = multer(); // We'll use memory storage for now

requestRouter.post('/submit-questionnaire', authenticateUser, upload.array('files'), submitClientRequest);

//Get all requests submitted by current user
requestRouter.get('/my-client-requests', authenticateUser, getMyClientRequests);
requestRouter.get('/quote-download/:requestId', authenticateUser, getQuoteDownloadLink);

export default requestRouter;
