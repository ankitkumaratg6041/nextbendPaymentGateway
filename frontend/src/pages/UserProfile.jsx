import useFetchClientRequests from '@/hooks/useFetchClientRequests';
import axios from 'axios';
import { useState } from 'react';

export default function UserProfile() {
  // over here requests contain full data from "ClientRequest" table and so in this id->primary key and userId-> foreign key
  const { requests, loading, error } = useFetchClientRequests();
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleDownload = async (requestId) => {
    try {
      console.log(`here is the requestId: ${requestId}`);
      const res = await axios.get(`http://localhost:5000/api/quote-download/${requestId}`, {
        withCredentials: true,
      });
      window.open(res.data.url, '_blank');
    } catch (err) {
      alert('Failed to generate download link. Try again.');
      console.error(err);
    }
  };
  

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl text-black font-bold mb-6">My Requests</h1>

      {loading ? (
        <p>Loading your requests...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load requests</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-left table-auto">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2">Request ID</th>
                <th className="px-4 py-2">Submitted</th>
                <th className="px-4 py-2">Pricing Quote</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-t border-gray-600 hover:bg-gray-700">
                  <td className="px-4 py-2">{req.id}</td>
                  <td className="px-4 py-2">{new Date(req.submittedAt).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    {req.quotePdfUrl ? (
                      // here req -> denotes one request in requests array
                      <button className="text-blue-400 underline" onClick={() => handleDownload(req.id)}>
                        Download
                      </button>
                    ) : 'Not Available'}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => setSelectedRequest(req)}
                      className="bg-blue-600 px-3 py-1 rounded"
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

      {/* Modal for viewing detailed request */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded shadow max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Request Details</h2>

            <div className="mb-2">
              <strong>Basic Info:</strong>
              <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(selectedRequest.basicInfo, null, 2)}</pre>
            </div>

            <div className="mb-2">
              <strong>Selected Help:</strong>
              <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(selectedRequest.selectedHelp, null, 2)}</pre>
            </div>

            <div className="mb-2">
              <strong>Answers:</strong>
              <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(selectedRequest.answers, null, 2)}</pre>
            </div>

            <div className="mb-2">
              <strong>Files:</strong>
              <ul className="list-disc ml-6">
                {selectedRequest.uploadedFiles?.map((url, i) => (
                  <li key={i}>
                    <a href={url} className="text-blue-500 underline" target="_blank" rel="noreferrer">
                      File {i + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 text-right">
              <button onClick={() => setSelectedRequest(null)} className="bg-gray-600 text-white px-4 py-2 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
