import axios from 'axios';

export default function useAcceptDeal(setOrders) {
  const acceptDeal = async (orderId) => {
    try {
      await axios.post(`http://localhost:5000/api/accept-deal/${orderId}`, null, {
        withCredentials: true,
      });

      // Optimistically update UI
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, dealAccepted: true } : order
        )
      );
    } catch (error) {
      console.error('❌ Failed to accept deal:', error);
    }
  };

  return acceptDeal;
}
