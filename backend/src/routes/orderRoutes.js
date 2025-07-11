import express from 'express';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { submitOrder, getMyOrders, acceptOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/submit-order', authenticateUser, submitOrder);
orderRouter.post('/accept-deal/:id', authenticateUser, acceptOrder);
  

// GET all orders for current user
orderRouter.get('/my-orders', authenticateUser, getMyOrders);

export default orderRouter;
