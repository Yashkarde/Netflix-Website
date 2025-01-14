import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../firebase'; 
import { useNavigate } from 'react-router-dom';
import netflix_spinner from '../../assets/netflix_spinner.gif';

const Login = () => {
  const [signState, setSignState] = useState('Sign In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (signState === 'Sign In') {
        await login(email, password);
        setMessage('Login successful!');
        navigate('/');
      } else {
        await signup(name, email, password);
        setMessage('Signup successful!');
        navigate('/');
      }
    } catch (error) {
      setMessage(error.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false); // Ensure spinner stops regardless of outcome
    }
  };

  if (loading) {
    return (
      <div className="login-spinner">
        <img src={netflix_spinner} alt="Loading spinner" />
      </div>
    );
  }

  return (
    <div className="login">
      <img src={logo} className="login-logo" alt="Logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === 'Sign Up' && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
          />
          <button type="submit">{signState}</button>
          {/* Error message removed */}
        </form>
        <div className="signup-page">
          {signState === 'Sign In' ? (
            <p>
              New to the site? <span onClick={() => setSignState('Sign Up')}>Sign Up</span>
            </p>
          ) : (
            <p>
              Already have an account? <span onClick={() => setSignState('Sign In')}>Sign In</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
