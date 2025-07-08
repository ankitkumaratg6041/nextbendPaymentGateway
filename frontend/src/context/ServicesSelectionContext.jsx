import { useState } from 'react';
import { ServicesSelectionContext } from './ServicesSelectionContextObject';

// Create context
// export const ServicesSelectionContext = createContext();

// Create provider
export const ServicesSelectionProvider = ({ children }) => {
    const [selections, setSelections] = useState({});
  
    const updateCategorySelection = (category, services, addons) => {
        setSelections(prev => {
          const updated = { ...prev };
      
          if (services?.length === 0 && addons?.length === 0) {
            delete updated[category];
          } else {
            updated[category] = { services, addons };
          }
          return updated;
        });
      };
      
    const resetSelections = () => setSelections({});

    return (
        <ServicesSelectionContext.Provider
        value={{ selections, updateCategorySelection, resetSelections }}
        >
            {children}
        </ServicesSelectionContext.Provider>
    );
}
