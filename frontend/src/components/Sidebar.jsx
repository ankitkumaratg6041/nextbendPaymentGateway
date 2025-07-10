import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Sidebar({ isCollapsed, toggleCollapse, handleLogout }) {

  return (
    <div
      className={`h-screen bg-gray-100 border-r py-8 fixed top-0 left-0 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Collapse Button -> the three horizontal lines*/}
      <div className="flex justify-between items-center px-4 mb-6">
        {!isCollapsed && (
          <h2 className="text-2xl font-bold text-indigo-600">Nextbend</h2>
        )}
        <button onClick={toggleCollapse}>
          <FaBars className="cursor-pointer text-xl text-indigo-800" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col space-y-4">
        <button
          onClick={handleLogout}
          className="text-red-600 hover:bg-amber-300 px-5 text-left cursor-pointer"
        >
          {isCollapsed ? '🚪' : 'Logout'}
        </button>
      </nav>
    </div>
  );
}
