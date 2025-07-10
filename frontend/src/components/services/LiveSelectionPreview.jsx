import { useServicesSelection } from '../../hooks/useServicesSelection';

export default function LiveSelectionPreview() {
    const { selections, updateCategorySelection } = useServicesSelection();
    // Object.keys will take an object and will return names of all the properties and methods
    const hasSelections = Object.keys(selections).length > 0;
    
    //  Handler to remove an item
  const handleRemoveItem = (category, type, item) => {
    const current = selections[category];

    const updated = {
      ...current,
      [type]: current[type].filter(i => i !== item),
    };

    updateCategorySelection(category, updated.services, updated.addons);
  };

  if (!hasSelections) {
    return (
      <div className="w-72 p-4 text-white bg-gray-800 rounded-lg shadow-lg">
        <p className="text-sm italic text-gray-400">No services selected yet.</p>
      </div>
    );
  }

  return (
    <div className="w-72 max-h-[80vh] overflow-y-auto p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">Your Selections</h3>

    {/* 
        Object.entries(selections) ===> this will convert all properties in selections in array 
        then we can use .map(() => ()) mehtod on it to get our desired outcome 
    */}
      {Object.entries(selections).map(([category, { services, addons }]) => (
        <div key={category} className="mb-4">
          <h4 className="text-md font-bold text-indigo-400 mb-2">{category}</h4>

          {services.length > 0 && (
            <div className="ml-2 mb-1 space-y-1">
            {services.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <span>• {item}</span>
                <button
                  onClick={() => handleRemoveItem(category, 'services', item)}
                  className="text-red-400 font-bold hover:text-red-600 text-xl ml-2 cursor-pointer"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          )}

          {addons.length > 0 && (
            <div className="ml-2 text-yellow-300 space-y-1">
            {addons.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <span>+ {item}</span>
                <button
                  onClick={() => handleRemoveItem(category, 'addons', item)}
                  className="text-red-400 font-bold hover:text-red-600 text-xl ml-2 cursor-pointer"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          )}
        </div>
      ))}
    </div>
  );
}
