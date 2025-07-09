import express from 'express'
import { authenticateUser } from '../middlewares/authMiddleware.js';
import {getAllServices, createService} from '../controllers/serviceController.js';

const servicesRouter = express.Router();

servicesRouter.get('/', authenticateUser, getAllServices);
servicesRouter.post('/', createService);

export default servicesRouter;