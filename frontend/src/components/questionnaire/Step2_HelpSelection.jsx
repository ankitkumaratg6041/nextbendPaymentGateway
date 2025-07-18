const CATEGORIES = [
    'Website Development',
    'Branding',
    'Advertising',
    'Strategy',
    'Other',
  ];
  
  export default function Step2_HelpSelection({ formData, setFormData }) {
    const { selectedHelp } = formData;
  
    const toggleCategory = (category) => {
      const updated = selectedHelp.includes(category)
        ? selectedHelp.filter((c) => c !== category)
        : [...selectedHelp, category];
  
      setFormData((prev) => ({
        ...prev,
        selectedHelp: updated,
      }));
    };
  
    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">What Do You Need Help With?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`p-4 border rounded-lg text-center transition ${
                selectedHelp.includes(category)
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-white text-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    );
  }
  