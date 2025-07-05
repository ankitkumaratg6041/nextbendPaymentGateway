import Sidebar from './Sidebar';
import CategoryCard from './CategoryCard';

const dummyServices = [
  {
    category: 'Web',
    services: ['Websites', 'E-commerce', 'Web Apps', 'Hosting', 'SEO'],
    addons: ['Domain setup', 'Extra SEO Package']
  },
  {
    category: 'Branding',
    services: ['Graphic Design', 'Print & Merch', 'Brand Booklets'],
    addons: ['Logo pack', 'Brand color guide']
  },
  {
    category: 'Strategy',
    services: ['Content', 'Brand', 'Marketing', 'AI'],
    addons: ['AI strategy session', 'Custom content calendar']
  },
  {
    category: 'Marketing',
    services: ['Email Campaigns', 'Influencer Outreach'],
    addons: ['Custom landing page', 'Copywriting']
  },
  {
    category: 'Development',
    services: ['Custom APIs', 'Admin Panels'],
    addons: ['Testing suite', 'Docker support']
  }
];

export default function Services() {
  return (
    <div className="flex">
      {/* Sidebar stays fixed and narrow */}
      <Sidebar className="w-64" />

      {/* Main content */}
      <div className="ml-64 min-h-screen w-full p-8 bg-gray-700">
        <h1 className="text-4xl font-bold mb-8 text-indigo-50">Our Services</h1>

        <div className="flex flex-wrap justify-center gap-6">
          {dummyServices.map((service, index) => (
            <CategoryCard
              key={index}
              category={service.category}
              services={service.services}
              addons={service.addons}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
