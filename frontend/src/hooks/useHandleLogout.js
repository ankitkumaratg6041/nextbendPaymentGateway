import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function useHandleLogout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return handleLogout;
}
