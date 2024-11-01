import React from 'react';
import './SearchSection.css';

function SearchSection() {
  return (
    <div className="search-section">
      <div className="search-bar">
        <input type="text" placeholder="Søg efter ID..." />
      </div>
      <button className="search-button">SØG</button>
      <div className="results">
        <h3>Resultater</h3>
        <div className="result-box">
          {/* Placeholder for results */}
        </div>
      </div>
      <button className="save-button">GEM SØGNING</button>
    </div>
  );
}

export default SearchSection;
