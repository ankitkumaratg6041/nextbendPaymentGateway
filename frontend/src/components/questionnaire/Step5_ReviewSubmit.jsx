import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Step5_ReviewSubmit({ formData }) {
  const navigate = useNavigate();
  const { basicInfo, selectedHelp, answers, files } = formData;

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append('basicInfo', JSON.stringify(basicInfo));
      form.append('selectedHelp', JSON.stringify(selectedHelp));
      form.append('answers', JSON.stringify(answers));

      files.forEach((file, i) => {
        form.append('files', file);
      });

      await axios.post('http://localhost:5000/api/submit-questionnaire', form, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('🎉 Request submitted successfully!');
      navigate('/user-profile'); // Redirect to profile page
    } catch (err) {
      console.error('❌ Submission failed:', err);
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div className="text-black">
      <h2 className="text-xl font-bold mb-4">Review Your Answers</h2>

      <div className="mb-4">
        <h3 className="font-semibold">Basic Info:</h3>
        <ul className="list-disc list-inside">
          {Object.entries(basicInfo).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {value}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Selected Help:</h3>
        <p>{selectedHelp.join(', ') || 'None'}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Your Answers:</h3>
        <ul className="list-disc list-inside">
        {Object.entries(answers).map(([question, response]) => (
          <li key={question}>
            <strong>{question}:</strong>{' '}
            {Array.isArray(response) ? (
              <ul className="list-disc list-inside ml-4">
                {response.map((item, idx) => (
                  <li key={idx}>{String(item)}</li>
                ))}
              </ul>
            ) : typeof response === 'object' && response !== null ? (
              <ul className="list-disc list-inside ml-4">
                {Object.entries(response).map(([k, v]) => (
                  <li key={k}><strong>{k}:</strong> {String(v)}</li>
                ))}
              </ul>
            ) : (
              <span>{String(response)}</span>
            )}
          </li>
        ))}


        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold">Files:</h3>
        <ul className="list-disc list-inside">
          {files.map((file, i) => (
            <li key={i}>{file.name}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Submit Request
      </button>
    </div>
  );
}
