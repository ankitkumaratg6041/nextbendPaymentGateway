import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchClientRequests() { 
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRequests = async () => { 
        try {
            const response = await axios.get('http://localhost:5000/api/my-client-requests', {
                withCredentials: true,
            });
            setRequests(response.data.requests);
        } catch (err) { 
            setError(err);
            console.error('❌ Failed to fetch client requests:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);
    
    return { requests, loading, error };
}
