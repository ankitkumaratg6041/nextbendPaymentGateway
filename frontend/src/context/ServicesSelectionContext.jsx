import { useState } from 'react';
import { ServicesSelectionContext } from './ServicesSelectionContextObject';

// Create context
// export const ServicesSelectionContext = createContext();

// Create provider
export const ServicesSelectionProvider = ({ children }) => {
    const [selections, setSelections] = useState([]);
  
    const updateCategorySelection = (newSelection) => {
        setSelections(prev => {
            const existingIndex = prev.findIndex(
                item => item.category === newSelection.category
            );
  
            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex] = newSelection;
                return updated;
            } else {
                return [...prev, newSelection];
            }
        });
    };
    
    const resetSelections = () => setSelections([]);

    return (
        <ServicesSelectionContext.Provider
        value={{ selections, updateCategorySelection, resetSelections }}
        >
            {children}
        </ServicesSelectionContext.Provider>
    );
}
