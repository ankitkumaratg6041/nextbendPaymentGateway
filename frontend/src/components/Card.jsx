import web from "../images/web.jpg";
import ServiceList from "./ServiceList";

export default function Card({ category, services, addons }) {
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
          <ServiceList title="Services" items={services} />
          <ServiceList title="Addons" items={addons} />
        </div>
      </div>
    </div>
  );
}
