import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import History from './pages/History/History'; // Import the History page
import { HistoryProvider } from './Context/HistoryContext'; // Import HistoryProvider
import { logout } from './firebase'; // Ensure the logout function is correctly imported
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Handle user logout and navigation
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from Firebase
      console.log('User logged out successfully');
      toast.success('Logged out successfully!');
      navigate('/login'); // Redirect to the login page after successful logout
    } catch (error) {
      console.error('Logout failed:', error.message);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <div>
      <ToastContainer theme="dark" />
      <HistoryProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Player/:id" element={<Player />} />
          <Route path="/History" element={<History />} />
        </Routes>
      </HistoryProvider>
    </div>
  );
};

export default App;
