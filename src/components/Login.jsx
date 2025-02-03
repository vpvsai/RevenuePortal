import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import backgroundImage from '../components/images/sathyabama_pic1.jpg'; // Adjust the path as needed

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    
    // After successful login, navigate to /revenue1
    navigate('/revenue1');
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-90 border border-gray-300 rounded-xl shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-black">Project Monitoring Portal</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-800 font-semibold">Email ID:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-800 font-semibold">Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label className="text-gray-800">Show Password</label>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-red-600 text-white rounded-md font-semibold hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
