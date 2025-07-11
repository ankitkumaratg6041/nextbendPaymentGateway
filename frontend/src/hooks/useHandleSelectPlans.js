import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSelectedServices } from '../redux/orderSlice';

export default function useHandleSelectPlans(selections) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectPlans = () => {
    const cleanedSelections = Object.entries(selections)
      .filter(([, val]) => Array.isArray(val.services) || Array.isArray(val.addons))
      .map(([category, val]) => ({
        category,
        services: val.services || [],
        addons: val.addons || []
      }));

    dispatch(addSelectedServices(cleanedSelections));
    navigate('/plans');
  };

  return handleSelectPlans;
}
