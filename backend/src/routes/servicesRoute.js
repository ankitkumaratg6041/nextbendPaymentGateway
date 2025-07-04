import express from 'express'
import {getAllServices, createService} from '../controllers/serviceController.js';

const servicesRouter = express.Router();

servicesRouter.get('/', getAllServices);
servicesRouter.post('/', createService);

export default servicesRouter;