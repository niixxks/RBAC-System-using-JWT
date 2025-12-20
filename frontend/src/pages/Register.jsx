import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { username, password, role });
      alert("Registered! Please Login.");
      navigate('/login');
    } catch (err) {
      alert("Error registering");
    }
  };

  // Helper for Role Cards
  const RoleCard = ({ value, label, icon }) => (
    <div 
      onClick={() => setRole(value)}
      className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2
        ${role === value 
          ? 'bg-blue-500/20 border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)] transform scale-105' 
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'
        }
      `}
    >
      <div className={`text-3xl ${role === value ? 'text-blue-300' : 'text-gray-400'}`}>
        {icon}
      </div>
      <span className={`text-sm font-medium ${role === value ? 'text-white' : 'text-gray-400'}`}>
        {label}
      </span>
    </div>
  );

  return (
    // BACKGROUND: Dark Gradient to make the Glass effect pop
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
      
      {/* GLASS CONTAINER */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
        
        <h2 className="text-3xl font-bold text-center text-white mb-2">Join University</h2>
        <p className="text-gray-400 text-center mb-8">Create your academic account</p>

        <form onSubmit={handleRegister} className="space-y-6">
          
          {/* ROLE SELECTION GRID */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <RoleCard 
              value="student" 
              label="Student" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              } 
            />
            <RoleCard 
              value="teacher" 
              label="Teacher" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              } 
            />
            <RoleCard 
              value="admin" 
              label="Admin" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              } 
            />
          </div>

          {/* INPUT FIELDS */}
          <div className="space-y-4">
            <div>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all" 
                placeholder="Choose Username" 
                onChange={e => setUsername(e.target.value)} 
              />
            </div>
            <div>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all" 
                type="password" 
                placeholder="Choose Password" 
                onChange={e => setPassword(e.target.value)} 
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg transform transition-all active:scale-95">
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-300 hover:text-white font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;