import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [isLoggedIn, setLoggedIn] = useState();
    
    const toggleLogin = () => {
        setLoggedIn(!isLoggedIn)
    }

  return (
    <div className="w-64 h-screen bg-gray-100 border-r py-8 fixed">
      <h2 className="text-2xl font-bold text-indigo-600 mb-8 px-5">Nextbend</h2>

      <nav className="flex flex-col space-y-4">
        {!isLoggedIn ? (
          <Link to="/login" className="text-indigo-700 hover:bg-amber-300 px-5">
            Login
          </Link>
        ) : (
          <>
            <button className="text-red-600 hover:bg-amber-300 px-5 text-left cursor-pointer" onClick={toggleLogin}>
              Logout
            </button>
            <Link to="/plans" className="text-indigo-700 hover:bg-amber-300 px-5">
              View Plans
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
