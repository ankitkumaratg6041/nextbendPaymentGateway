const CategoryCard = ({category, services, addons}) => {

    return (
      <div className="border p-5 rounded-xl shadow hover:shadow-lg transition bg-white w-1/4">
        <h2 className="text-xl font-semibold text-indigo-600">{category}</h2>
  
        <div className="mt-2">
          <p className="font-semibold text-gray-700">Services:</p>
          <ul className="list-disc list-inside ml-2 text-sm text-gray-800">
            {services.map((service, i) => (
              <li key={i}>{service}</li>
            ))}
          </ul>
        </div>
  
        <div className="mt-2">
          <p className="font-semibold text-gray-700">Add-ons:</p>
          <ul className="list-disc list-inside ml-2 text-sm text-gray-800">
            {addons.map((addon, i) => (
              <li key={i}>{addon}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default CategoryCard;
  