export default function OrderDetailModal({ order, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow w-full max-w-lg text-black">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Submitted At:</strong> {new Date(order.submittedAt).toLocaleString()}</p>
  
          <h3 className="font-semibold mt-4">Services:</h3>
          <ul className="list-disc list-inside text-sm">
            {Object.entries(order.services).map(([cat, data]) => (
              <li key={cat}><strong>{cat}:</strong> {data.services.join(', ')} (Addons: {data.addons.join(', ')})</li>
            ))}
          </ul>
  
          <h3 className="font-semibold mt-4">Plans:</h3>
          <ul className="list-disc list-inside text-sm">
            {Object.entries(order.plans).map(([cat, plan]) => (
              <li key={cat}><strong>{cat}:</strong> {plan.name} – {plan.features.join(', ')}</li>
            ))}
          </ul>
  
          <button onClick={onClose} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">Close</button>
        </div>
      </div>
    );
  }
  