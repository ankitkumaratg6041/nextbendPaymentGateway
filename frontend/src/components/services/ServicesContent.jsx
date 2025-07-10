import { useState } from 'react';
import Sidebar from '../Sidebar';
import CategoryCard from './CategoryCard';
import { useServicesSelection } from '../../hooks/useServicesSelection';
import LiveSelectionPreview from './LiveSelectionPreview';
import useFetchServices from '@/hooks/useFetchServices';
import useHandleLogout from '@/hooks/useHandleLogout';
import useHandleSelectPlans from '@/hooks/useHandleSelectPlans';

// const dummyServices = [{
//   category: 'Web',
//   services: ['Websites', 'E-commerce', 'Web Apps', 'Hosting', 'SEO'],
//   addons: ['Domain setup', 'Extra SEO Package']
// },
// {
//   category: 'Branding',
//   services: ['Graphic Design', 'Print & Merch', 'Brand Booklets'],
//   addons: ['Logo pack', 'Brand color guide']
// },
// {
//   category: 'Strategy',
//   services: ['Content', 'Brand', 'Marketing', 'AI'],
//   addons: ['AI strategy session', 'Custom content calendar']
// },
// {
//   category: 'Marketing',
//   services: ['Email Campaigns', 'Influencer Outreach'],
//   addons: ['Custom landing page', 'Copywriting']
// },
// {
//   category: 'Development',
//   services: ['Custom APIs', 'Admin Panels'],
//   addons: ['Testing suite', 'Docker support']
// }];

export default function ServicesContent() {
  const { selections } = useServicesSelection();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { serviceData, loading } = useFetchServices();
  const handleLogout = useHandleLogout();
  const handleSelectPlans = useHandleSelectPlans(selections);

  if (loading) return <div className="text-white p-8">Loading services...</div>;

  return (
      <div className="flex">
          {/* Sidebar */}
          <Sidebar
            isCollapsed={isCollapsed}
            toggleCollapse={() => setIsCollapsed(!isCollapsed)}
            handleLogout={handleLogout}
          />

          {/* Main content area shifts based on sidebar width */}
          <div
            className={`min-h-screen w-full p-8 bg-gray-700 transition-all duration-300 ${
              isCollapsed ? 'ml-20' : 'ml-64'
            }`}
          >
              <h1 className="text-4xl font-bold mb-8 text-indigo-50">Our Services</h1>

              <div className="flex flex-wrap justify-left gap-6">
                <CategoryCard data={serviceData} />
              </div>
            <button onClick={handleSelectPlans} className='p-5 mt-5 text-3xl bg-blue-600 border-2 rounded-lg cursor-pointer'>
              Select Plans
            </button>
          </div>
      
          {/* Live preview section */}
          <div className="fixed right-4 top-24 z-10">
            <LiveSelectionPreview />
          </div>
        
      </div>
  );
}
