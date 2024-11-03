import React from 'react';
import './SearchSection.css';

function SearchSection() {
  return (
    <div className="search-section">
      <div className="search-bar-ss">
        <input type="text" placeholder="Søg efter ID..." />
      </div>
      <button className="search-button-ss">SØG</button>
      <div className="results">
        <h3>Resultater</h3>
        <div className="result-box"> {/* Her skal resultalterne så dynamisk sættes ind */}
          <button className="save-button-ss">GEM SØGNING</button>
        </div>
      </div>
    </div>
  );
}

export default SearchSection;