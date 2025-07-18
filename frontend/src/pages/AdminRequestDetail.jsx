import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function AdminRequestDetail() {
  const { id: userId } = useParams();
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get('requestId');

  const [request, setRequest] = useState(null);
  const [quoteFile, setQuoteFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/user/${userId}/request/${requestId}`, {
          withCredentials: true,
        });
        console.log(`Fetched request for user ${userId}:`, res.data.request);
        setRequest(res.data.request);
      } catch (err) {
        console.error('Error fetching request:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [requestId]);

  const handleUpload = async () => {
    if (!quoteFile) return alert("Please select a PDF file first.");
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("quotePdf", quoteFile);

      await axios.post(`http://localhost:5000/api/admin/upload-quote/${requestId}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert("✅ Pricing quote uploaded!");
      window.location.reload();
    } catch (err) {
      console.error('❌ Upload failed:', err);
      alert("Failed to upload.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p className="p-8 text-black">Loading request details...</p>;

  if (!request) return <p className="p-8 text-red-500">Request not found.</p>;

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl font-bold text-black mb-6">Request from {request.basicInfo.name}</h1>

      <div className="mb-4">
        <strong>Basic Info:</strong>
        <pre className="bg-gray-100 p-2 rounded text-black text-sm">{JSON.stringify(request.basicInfo, null, 2)}</pre>
      </div>

      <div className="mb-4">
        <strong>Selected Help:</strong>
        <pre className="bg-gray-100 p-2 rounded text-black text-sm">{JSON.stringify(request.selectedHelp, null, 2)}</pre>
      </div>

      <div className="mb-4">
        <strong>Answers:</strong>
        <pre className="bg-gray-100 p-2 rounded text-black text-sm">{JSON.stringify(request.answers, null, 2)}</pre>
      </div>

      <div className="mb-4">
        <strong>Uploaded Files by Client:</strong>
        <ul className="list-disc ml-6 text-blue-400">
          {request.uploadedFiles?.map((url, i) => (
            <li key={i}>
              <a href={url} target="_blank" rel="noreferrer">File {i + 1}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 mb-4">
        <label className="block font-semibold mb-2 text-black">Upload Pricing Quote PDF:</label>
        <input type="file" accept=".pdf" onChange={(e) => setQuoteFile(e.target.files[0])} className="text-black" />
      </div>

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-green-600 px-4 py-2 rounded text-white"
      >
        {uploading ? 'Uploading...' : 'Submit Quote'}
      </button>
    </div>
  );
}
