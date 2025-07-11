import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Optional
  const [error, setError] = useState(null);     // Optional

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/my-orders', {
          withCredentials: true,
        });
        setOrders(res.data.orders);
      } catch (err) {
        console.error('❌ Failed to fetch orders:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, setOrders, loading, error };
}
