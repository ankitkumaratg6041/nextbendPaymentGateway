import Card from "./Card";

const CategoryCard = ({data}) => {

    return (
      // <div className="w-80 bg-white border rounded-xl p-6 shadow hover:shadow-md transition">

      //   <h2 className="text-xl font-semibold text-indigo-600">{category}</h2>
  
      //   <div className="mt-2">
      //     <p className="font-semibold text-gray-700">Services:</p>
      //     <ul className="list-disc list-inside ml-2 text-sm text-gray-800">
      //       {services.map((service, i) => (
      //         <li key={i}>{service}</li>
      //       ))}
      //     </ul>
      //   </div>
  
      //   <div className="mt-2">
      //     <p className="font-semibold text-gray-700">Add-ons:</p>
      //     <ul className="list-disc list-inside ml-2 text-sm text-gray-800">
      //       {addons.map((addon, i) => (
      //         <li key={i}>{addon}</li>
      //       ))}
      //     </ul>
      //   </div>
      // </div>

      <div className="flex flex-col gap-5">
        {
          data.map((dataItem, index) => (
            <Card key={index} category={dataItem.category} services={dataItem.services} addons={dataItem.addons}/>
          ))
        }
      </div>
    )
  };
  
  export default CategoryCard;
  