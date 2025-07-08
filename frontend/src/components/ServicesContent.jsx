import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import CategoryCard from './CategoryCard';
import { useServicesSelection } from '../hooks/useServicesSelection';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSelectedServices } from '../redux/orderSlice';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { selections } = useServicesSelection();

  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = false; // later replace with real auth check

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/services');
        setServiceData(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch services:', err);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleSelectPlans = () => {
    // dispatch to Redux here
    const cleanedSelections = Object.entries(selections)
    .filter(([_, val]) => Array.isArray(val.services) || Array.isArray(val.addons))
    .map(([category, val]) => ({
      category,
      services: val.services || [],
      addons: val.addons || []
    }));

    dispatch(addSelectedServices(cleanedSelections));
  };

  if (loading) return <div className="text-white p-8">Loading services...</div>;

  return (
      <div className="flex">
          {/* Sidebar */}
          <Sidebar
            isCollapsed={isCollapsed}
            toggleCollapse={() => setIsCollapsed(!isCollapsed)}
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
      
      {/* Right side showing order details for the user */}
      <div>

      </div>
        
      </div>
  );
}
