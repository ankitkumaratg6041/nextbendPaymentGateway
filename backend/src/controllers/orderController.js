import { PrismaClient } from '../../generated/prisma/index.js';
import sendOrderEmailToAdmin from '../utils/sendOrderEmailToAdmin.js';
// import sendEmailToAdmin from '../utils/sendEmailToAdmin.js';

const prisma = new PrismaClient();

// this route is hit when user cliks "submit plans" button ->
// 
export const submitOrder = async (req, res) => {
    try {
        // const userId = req.user?.id;
        const user = req.user;
        const userId = user.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { services, plans } = req.body;

    const newOrder = await prisma.orderRequest.create({
      data: {
        userId,
        services,
        plans
      }
    });

    // Send Email to Admin
    await sendOrderEmailToAdmin(user, services, plans);

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// this route is meant to be used when user clicks final "Submit Plans" -> 
// this will fetch their detials and take them to their profile page
export const getMyOrders = async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const myOrders = await prisma.orderRequest.findMany({
        where: { userId },
        orderBy: { submittedAt: 'desc' },
      });
  
      res.status(200).json({ orders: myOrders });
    } catch (error) {
      console.error('Failed to fetch user orders:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const acceptOrder = async (req, res) => {
    const userId = req.user.id;
    const orderId = req.params.id;
  
    try {
      const order = await prisma.orderRequest.findUnique({
        where: { id: orderId },
      });
  
      if (!order || order.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized or order not found' });
      }
  
      const updated = await prisma.orderRequest.update({
        where: { id: orderId },
        data: { dealAccepted: true },
      });
  
      res.json({ success: true, order: updated });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
}
  