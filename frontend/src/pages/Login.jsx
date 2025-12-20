import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      if (res.data.role === 'admin') navigate('/admin');
      else if (res.data.role === 'student') navigate('/student');
      else if (res.data.role === 'teacher') navigate('/teacher');
    } catch (err) {
      alert('Invalid login — check username/password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-indigo-900 to-violet-800 p-6">
      <div className="max-w-md w-full">
        <div className="mb-6 text-center text-white">
          <div className="text-5xl">🎓</div>
          <h1 className="mt-3 text-3xl font-extrabold">University EMS</h1>
          <p className="text-slate-300 mt-1">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="relative bg-white/6 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-400/20 via-transparent to-pink-400/10 blur opacity-60" />
          <div className="relative space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👤</span>
              <input
                aria-label="username"
                required
                className="flex-1 bg-transparent placeholder-slate-300 text-white px-3 py-2 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <input
                aria-label="password"
                required
                type="password"
                className="flex-1 bg-transparent placeholder-slate-300 text-white px-3 py-2 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2 rounded-lg shadow-md hover:scale-[1.01] transition-transform disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>

            <div className="text-center text-sm text-slate-300">
              <span>New here? </span>
              <a href="/register" className="text-indigo-200 underline">Create account</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;