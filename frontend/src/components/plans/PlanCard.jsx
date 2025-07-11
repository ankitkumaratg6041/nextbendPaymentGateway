import React from 'react';
import { categoryPlans } from '../../data/categoryPlans';

export default function PlanCard({ category, selectedPlan, onSelectPlan }) {
  const plans = categoryPlans[category] || [];

  return (
    <div className="border rounded-lg p-6 bg-gray-800 shadow">
      <h2 className="text-2xl font-semibold mb-4">{category}</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => {
          const isSelected = selectedPlan?.name === plan.name;

          return (
            <div
              key={idx}
              className={`border rounded p-4 transition-all duration-300 ${
                isSelected
                  ? 'bg-green-600 text-white border-green-400'
                  : 'bg-white text-black border-gray-300'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <ul className="mb-2 space-y-1">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="text-sm">• {feature}</li>
                ))}
              </ul>
              {plan.price && (
                <p className="text-sm font-semibold mt-2">Price: {plan.price}</p>
              )}

              <button
                onClick={() => onSelectPlan(category, plan)}
                className={`cursor-pointer mt-4 w-full px-4 py-2 rounded ${
                  isSelected ? 'bg-white text-green-700' : 'bg-green-700 text-white'
                }`}
              >
                {isSelected ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
