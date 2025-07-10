import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetchServices() {
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/services', {
          withCredentials: true
        });
        setServiceData(res.data.data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { serviceData, loading };
}
