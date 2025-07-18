import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/requests', {
          withCredentials: true,
        });
        setRequests(response.data.requests);
      } catch (err) {
        setError('Failed to load client requests', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold text-black mb-6">Client Requests (Admin View)</h1>

      {loading ? (
        <p>Loading requests...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-left table-auto">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2">Request ID</th>
                <th className="px-4 py-2">Client Name</th>
                <th className="px-4 py-2">Company</th>
                <th className="px-4 py-2">Submitted</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-t border-gray-600 hover:bg-gray-700">
                  <td className="px-4 py-2">{req.id}</td>
                  <td className="px-4 py-2">{req.user.name}</td>
                  <td className="px-4 py-2">{req.user.companyName || '—'}</td>
                  <td className="px-4 py-2">{new Date(req.submittedAt).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 px-3 py-1 rounded"
                      onClick={() => navigate(`/admin/user/${req.userId}?requestId=${req.id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
