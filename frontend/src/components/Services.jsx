
import { ServicesSelectionProvider } from '../context/ServicesSelectionContext';
import ServicesContent from './ServicesContent';

export default function Services() {

  return (
    <ServicesSelectionProvider>
      <ServicesContent />
    </ServicesSelectionProvider>
  );
}
