import React from 'react';
import './History.css';
import { useHistory } from '../../Context/HistoryContext';

const History = () => {
  const { history, setHistory } = useHistory();

  const handleRemove = (id) => {
    console.log('Removing movie with id:', id); // Debugging
    setHistory(history.filter((movie) => movie.id !== id));
  };

  return (
    <div className="history">
      <h1>Your Watched Movies</h1>
      {history.length === 0 ? (
        <p>No movies watched yet.</p>
      ) : (
        <div className="history-grid">
          {history.map((movie) => (
            <div key={movie.id} className="history-card">
              <img
                src={movie.poster}
                alt={movie.title}
                className="history-poster"
              />
              <p className="history-title">{movie.title}</p>
              <button
                className="delete-button"
                onClick={() => handleRemove(movie.id)}
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
