import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto max-w-6xl flex items-center justify-between p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">UEMS</div>
            <span className="text-white font-semibold text-lg">University EMS</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3 text-sm">
          {!token && (
            <>
              <Link to="/login" className="px-3 py-2 rounded hover:bg-white/5 text-white">Login</Link>
              <Link to="/register" className="px-3 py-2 rounded hover:bg-white/5 text-white">Register</Link>
            </>
          )}

          {token && (
            <>
              {role === 'student' && <Link to="/student" className="px-3 py-2 rounded hover:bg-white/5 text-white">Student</Link>}
              {role === 'teacher' && <Link to="/teacher" className="px-3 py-2 rounded hover:bg-white/5 text-white">Teacher</Link>}
              {role === 'admin' && <Link to="/admin" className="px-3 py-2 rounded hover:bg-white/5 text-white">Admin</Link>}
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {token ? (
            <>
              <div className="hidden sm:flex flex-col text-right mr-2">
                <span className="text-white text-sm uppercase">{role || 'User'}</span>
                <span className="text-white/70 text-xs">Signed in</span>
              </div>

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="md:hidden px-3 py-2 rounded bg-white/10 text-white">Sign in</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;