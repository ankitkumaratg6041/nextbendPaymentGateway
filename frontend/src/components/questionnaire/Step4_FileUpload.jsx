import React from 'react';

export default function Step4_FileUpload({ formData, setFormData }) {
  const files = formData.files || [];

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles]
    }));
  };

  const handleRemove = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== indexToRemove)
    }));
  };

  return (
    <div className="text-black">
      <h2 className="text-xl font-bold mb-4">Upload Any Additional Files</h2>
      <p className="mb-4 text-gray-600">
        You can optionally upload any files that will help us understand your request better.
        (PDFs, screenshots, briefs, wireframes, etc.)
      </p>

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block mb-4"
      />

      {files.length > 0 && (
        <div className="bg-white p-4 rounded shadow border border-gray-200">
          <h4 className="font-semibold mb-2">Files to be submitted:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {files.map((file, index) => (
              <li key={index} className="flex justify-between items-center">
                {file.name}
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:underline text-xs"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
