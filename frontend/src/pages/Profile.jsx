import useAcceptDeal from '@/hooks/useAcceptDeal';
import useFetchOrders from '@/hooks/useFetchOrders';
import { useState } from 'react';
import FeedbackModal from '@/components/profile/FeedbackModal';
import OrderDetailModal from '@/components/profile/OrderDetailModal';
import OrderTable from '@/components/profile/OrderTable';

export default function Profile() {
    const { orders, setOrders, loading, error } = useFetchOrders();
    const acceptDeal = useAcceptDeal(setOrders);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedback, setFeedback] = useState('');

    
  const handleDownloadQuote = (url) => {
    if (url) window.open(url, '_blank');
  };

  const submitFeedback = async (orderId) => {
    console.log('Submitting feedback:', feedback, 'for order:', orderId);
    // TODO: Send feedback to backend
    setShowFeedbackModal(false);
    setFeedback('');
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl text-black font-bold mb-6">My Orders</h1>

        {
            loading ?
              (<p className="text-black">⏳ Loading your order history...</p>) :
              error ?
                (<p className="text-red-500">❌ Failed to load orders: {error.message || error}</p>) :
                    orders.length === 0 ?
                        (<p className="text-yellow-400">You have not submitted any orders yet.</p>) :
                        (
                            <div className="overflow-x-auto">
                                <OrderTable
                                orders={orders}
                                onAccept={acceptDeal}
                                onDownload={handleDownloadQuote}
                                onView={(order) => { setSelectedOrder(order); setShowDetailModal(true); }}
                                onMessage={(order) => { setSelectedOrder(order); setShowFeedbackModal(true); }}
                                />
                            </div>
                        )
        }

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setShowDetailModal(false)} />
      )}

      {/* Feedback Modal */}
        {showFeedbackModal && selectedOrder &&
            (
                <FeedbackModal
                    feedback={feedback}
                    setFeedback={setFeedback}
                    onCancel={() => setShowFeedbackModal(false)}
                    onSubmit={() => submitFeedback(selectedOrder.id)}
                />
            )
        }
      
    </div>
  );
}
