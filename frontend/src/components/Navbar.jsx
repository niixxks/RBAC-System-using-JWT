import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    // 1. Clear the data
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // 2. Redirect to Login
    navigate('/login');
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <div className="flex gap-4">
        {/* Only show these if NOT logged in */}
        {!token && <Link to="/login" className="hover:text-gray-300">Login</Link>}
        {!token && <Link to="/register" className="hover:text-gray-300">Register</Link>}
        
        {/* Optional: Links for testing */}
        {token && <Link to="/student" className="hover:text-gray-300">Student</Link>}
        {token && <Link to="/admin" className="hover:text-gray-300">Admin</Link>}
      </div>

      {/* Show Logout only if logged in */}
      {token && (
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-bold"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;