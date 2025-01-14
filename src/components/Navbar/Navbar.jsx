import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const navRef = useRef();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const API_URL = 'https://api.themoviedb.org/3/search/movie'; // TMDB Movie Search API
  const BEARER_TOKEN =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDI0MzAyMGE1Mjc0ZTgxYTQxYzNhYzA5NTJiYjI3MiIsIm5iZiI6MTczMjg4NDM3Ny40MDg1NTMxLCJzdWIiOiI2NzQ5NjAxMzEwYWEwMzE5ODY3ZTMyZDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.25s3Mkr0z5GPBZagX1Cd9SY16JeR4NRACZoYd0b8dJ4';

  // Handle Navbar Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fetch suggestions from the API
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(`${API_URL}?query=${encodeURIComponent(searchTerm)}`, {
          method: 'GET',
          headers: {
            Authorization: BEARER_TOKEN,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }

        const data = await response.json();
        setSuggestions(data.results || []); // Check if `results` exists
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!navRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  // Handle click on suggestion to navigate to player page
  const handleSuggestionClick = (movieId) => {
    // Navigate to the player page using the movie ID
    navigate(`/player/${movieId}`);
  };

  // Handle Enter key press to navigate to the player page
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && searchTerm.trim()) {
      const movie = suggestions.find((suggestion) => suggestion.title.toLowerCase() === searchTerm.toLowerCase());
      if (movie) {
        navigate(`/player/${movie.id}`);
      }
    }
  };

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>T.V. Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="search-container">
          {showSearchBar && (
            <div className="search-wrapper">
              <input
                type="text"
                className="search-bar"
                placeholder="Search for a movie..."
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress} // Add onKeyPress handler for Enter key
              />
              {suggestions.length > 0 && (
                <ul className="suggestions">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion.id)} // Trigger navigation on click
                    >
                      {suggestion.title || 'No Title'}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <img
            src={search_icon}
            alt="Search"
            className="icons"
            onClick={() => setShowSearchBar(!showSearchBar)}
          />
        </div>
        <p>Children</p>
        <img src={bell_icon} alt="Notifications" className="icons" />
        <div
          className="navbar-profile"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img src={profile_img} alt="Profile" className="profile" />
          <img src={caret_icon} alt="Caret" />
          {dropdownOpen && (
            <div className="dropdown">
              <p onClick={handleLogout}>Sign out of Netflix</p>
              <p
                onClick={() => navigate('/History')}
                style={{ cursor: 'pointer', color: 'white' }}
              >
                History
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
