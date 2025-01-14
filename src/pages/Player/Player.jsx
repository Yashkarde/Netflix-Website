import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useHistory } from '../../Context/HistoryContext'; // Import History Context

const Player = () => {
  const { id } = useParams(); // Movie ID from URL
  const navigate = useNavigate();
  const { addToHistory } = useHistory(); // Access addToHistory function

  const [apiData, setApiData] = useState(null); // State for storing fetched data
  const [error, setError] = useState(null); // State for handling errors
  const [isLoading, setIsLoading] = useState(true); // State for handling loading

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDI0MzAyMGE1Mjc0ZTgxYTQxYzNhYzA5NTJiYjI3MiIsIm5iZiI6MTczMjg4NDM3Ny40MDg1NTMxLCJzdWIiOiI2NzQ5NjAxMzEwYWEwMzE5ODY3ZTMyZDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.25s3Mkr0z5GPBZagX1Cd9SY16JeR4NRACZoYd0b8dJ4',
    },
  };

  useEffect(() => {
    const fetchTrailer = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );
        const movieData = await response.json();

        const trailerResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        const trailerData = await trailerResponse.json();

        // Find a trailer video in the response
        const trailer = trailerData.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );

        if (trailer) {
          setApiData(trailer);

          // Add to history
          addToHistory({
            id: movieData.id,
            title: movieData.title,
            poster: `https://image.tmdb.org/t/p/w200/${movieData.poster_path}`,
          });
        } else {
          setApiData(null); // No trailer available
        }
      } catch (err) {
        setError('Failed to fetch trailer data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrailer();
  }, [id, addToHistory]);

  if (isLoading) {
    return <div className="player">Loading...</div>;
  }

  if (error) {
    return <div className="player">{error}</div>;
  }

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        onClick={() => navigate('/')}
        className="back-arrow"
      />
      {apiData ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p className="no-trailer-message">Trailer is not available.</p>
      )}
    </div>
  );
};

export default Player;
