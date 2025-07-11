// src/components/profile/FeedbackModal.jsx
export default function FeedbackModal({ feedback, setFeedback, onCancel, onSubmit }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow w-full max-w-md text-black">
          <h2 className="text-xl font-bold mb-4">Send Feedback</h2>
          <textarea
            className="w-full border p-2 mb-4"
            rows={4}
            placeholder="Write feedback for admin..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <div className="flex justify-between">
            <button onClick={onCancel} className="text-gray-600">Cancel</button>
            <button onClick={onSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Send</button>
          </div>
        </div>
      </div>
    );
  }
  