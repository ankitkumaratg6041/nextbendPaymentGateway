
import { ServicesSelectionProvider } from '../context/ServicesSelectionContext';
import ServicesContent from '../components/services/ServicesContent';

export default function Services() {

  return (
    <ServicesSelectionProvider>
      <ServicesContent />
    </ServicesSelectionProvider>
  );
}
