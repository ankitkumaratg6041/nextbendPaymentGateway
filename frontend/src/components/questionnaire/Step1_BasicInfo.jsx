import { useEffect } from 'react';

export default function Step1_BasicInfo({ formData, setFormData }) {
  const { basicInfo } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [e.target.name]: e.target.value,
      },
    }));
  };

  useEffect(() => {
    // Optionally pre-fill with logged in user's data here
    // setFormData({ ...formData, basicInfo: { ...basicInfo, name, email } });
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Your Name</label>
        <input
          type="text"
          name="name"
          value={basicInfo.name || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          value={basicInfo.email || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Company Name (Optional)</label>
        <input
          type="text"
          name="company"
          value={basicInfo.company || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Phone Number (Optional)</label>
        <input
          type="tel"
          name="phone"
          value={basicInfo.phone || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
    </div>
  );
}
