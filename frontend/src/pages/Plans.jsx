import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlanCard from '../components/plans/PlanCard';
import LiveSelectionPreview from '../components/services/LiveSelectionPreview';
import { useServicesSelection } from '../hooks/useServicesSelection';
import { setFinalOrderDetails } from '@/redux/orderSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Plans() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedServices = useSelector(state => state.orderDetails?.selectedServices || []);
  const [selectedPlans, setSelectedPlans] = useState({});

  // Pull context updater to hydrate it
  const { selections, updateCategorySelection } = useServicesSelection();

  // Rehydrate ServicesSelectionContext from Redux on mount
  useEffect(() => {
    selectedServices.forEach(({ category, services, addons }) => {
      updateCategorySelection(category, services, addons);
    });
  }, []);

  const handleSelectPlan = (category, plan) => {
    setSelectedPlans(prev => ({
      ...prev,
      [category]: plan,
    }));
  };

  const handleSubmitOrder = async () => {
    try {
      // 1. Get service selections from context which is already done at line 15
  
      // 2. Merge with selectedPlans
      const finalOrder = {
        services: selections,        // { Web Dev: { services, addons }, ... }
        plans: selectedPlans,        // { Web Dev: { name, features }, ... }
        submittedAt: new Date().toISOString(),
      };
  
      // 3. Store in Redux
      dispatch(setFinalOrderDetails(finalOrder));
  
      // 4. Send to backend (save to DB + send email)
      const response = await axios.post('http://localhost:5000/api/submit-order', finalOrder, {
        withCredentials: true
      });
  
      // 5. Show success feedback
      // console.log(`response after stroing to db: ${response}`)
      alert('Order submitted successfully!');
      navigate('/profile')
    } catch (error) {
      console.error('Order submission failed:', error);
      alert('Failed to submit order. Try again.');
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6">Select a Plan for Each Category</h1>

      {selectedServices.length === 0 ? (
        <p>No services selected. Please go back and pick services first.</p>
      ) : (
        <div className="flex-1 space-y-10">
          {selectedServices.map((item) => (
            <PlanCard
              key={item.category}
              category={item.category}
              selectedPlan={selectedPlans[item.category]} // ✅ So PlanCard knows what’s selected
              onSelectPlan={handleSelectPlan}             // ✅ So PlanCard can update selectedPlans
            />
          ))}
        </div>
      )}

      {/* Right: Preview panel */}
  <div className="w-full lg:w-80 space-y-6">
    <LiveSelectionPreview />

    {/* 🆕 Plan Preview Inline Here */}
    <div className="bg-gray-800 p-4 rounded-lg shadow text-white">
        <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
          Selected Plans
        </h3>

        {Object.entries(selectedPlans).length === 0 ? (
          <p className="text-sm italic text-gray-400">No plans selected yet.</p>
        ) : (
          Object.entries(selectedPlans).map(([category, plan]) => (
            <div key={category} className="mb-4">
              <h4 className="text-md font-bold text-green-400">{category}</h4>
              <p className="text-sm font-semibold text-white">{plan.name}</p>
              <ul className="text-sm list-disc list-inside text-gray-300 ml-2 mt-1">
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              {plan.price && (
                <p className="text-sm mt-1 text-yellow-300">💲 {plan.price}</p>
              )}
            </div>
          ))
        )}
        </div>
        
        <button
          onClick={handleSubmitOrder}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-2 px-4 rounded"
        >
          Submit Plans
        </button>

    </div>

    </div>
  );
}
