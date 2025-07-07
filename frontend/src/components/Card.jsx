import { useEffect, useState } from "react";
import web from "../images/web.jpg";
import ServiceList from "./ServiceList";

/**
 * 
 * Only job of this component is to just create one individual card with required fileds
 * 1. Image
 * 2. Title of the card
 * 3. Services section
 * 4. Addons section
 *  
 */

export default function Card({ category, services, addons }) {
    const [localSelection, setLocalSelection] = useState({
        category: category,
        services: [],
        addons: []
      });
      
      const TYPES = {
        SERVICES: 'services',
        ADDONS: 'addons'
      };
    
    const handleSelection = (service, serviceType) => {
          console.log(`Service in handleSelection: ${serviceType}`)
        setLocalSelection(prev => {
            console.log(`Prev category: ${prev.category}`)
            console.log(`Prev Services: ${prev.services}`)
            console.log(`Prev addons: ${prev.addons}`)
          const updatedList = prev[serviceType].includes(service)
            ? prev[serviceType].filter(i => i !== service)
            : [...prev[serviceType], service];
      
          return {
            ...prev,
            [serviceType]: updatedList
          };
        });
      };      

      useEffect(() => {
        console.log("Current selection for:", category);
        console.log(localSelection);
      }, [localSelection, category]);
    
  return (
    <div className="grid grid-cols-12 border border-black rounded-lg overflow-hidden w-[45em] shadow-md">
      
      {/* Left: Image section (5/12) */}
      <div className="col-span-5">
        <img
          src={web}
          alt={`${category} image`}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right: Content section (7/12) */}
      <div className="col-span-7 bg-red-600 text-white p-4 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-3">{category}</h2>
        
        <div className="grid grid-cols-1 gap-4">
                  <ServiceList
                      title="Services"
                      services={services}
                      category={category}
                      serviceType={TYPES.SERVICES}
                      onItemClick={handleSelection}
                  />
                  <ServiceList
                      title="Addons"
                      services={addons}
                      category={category}
                      serviceType={TYPES.ADDONS}
                      onItemClick={handleSelection}
                  />
        </div>
      </div>
    </div>
  );
}
