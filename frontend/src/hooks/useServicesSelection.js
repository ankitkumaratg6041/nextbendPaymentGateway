import { useContext } from 'react';
import { ServicesSelectionContext } from '../context/ServicesSelectionContextObject';

export const useServicesSelection = () => useContext(ServicesSelectionContext);
