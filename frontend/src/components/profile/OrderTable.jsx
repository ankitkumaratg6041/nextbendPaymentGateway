import React from 'react';

export default function OrderTable({ orders, onAccept, onView, onMessage, onDownload }) {
  return (
    <table className="min-w-full table-auto bg-gray-800 text-left">
      <thead>
        <tr className="bg-gray-700">
          <th className="px-4 py-2">Order ID</th>
          <th className="px-4 py-2">Submitted</th>
          <th className="px-4 py-2">Quote</th>
          <th className="px-4 py-2">Deal Status</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id} className="border-t border-gray-600 hover:bg-gray-700">
            <td className="px-4 py-2">{order.id}</td>
            <td className="px-4 py-2">{new Date(order.submittedAt).toLocaleString()}</td>
            <td className="px-4 py-2">
              {order.pdfUrl ? (
                <button onClick={() => onDownload(order.pdfUrl)} className="text-blue-400 underline">
                  Download
                </button>
              ) : 'Not Uploaded'}
            </td>
            <td className="px-4 py-2">
              {order.dealAccepted ? 'Accepted ✅' : (
                <button className="bg-green-600 px-3 py-1 rounded" onClick={() => onAccept(order.id)}>Accept</button>
              )}
            </td>
            <td className="px-4 py-2 space-x-2">
              <button onClick={() => onView(order)} className="bg-blue-500 px-3 py-1 rounded">View</button>
              <button onClick={() => onMessage(order)} className="bg-yellow-500 px-3 py-1 rounded">Message</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
