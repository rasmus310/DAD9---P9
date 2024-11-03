import React, { useState } from 'react';
import './FilterSearch.css';

function FilterSearch() {
  const [selectedFilters, setSelectedFilters] = useState({
    ejendomstype: '',
    antalMatrikler: '',
    stoerrelse: '',
    forurening: '',
  });

  const handleFilterChange = (filter, value) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filter]: value,
    }));
  };

  return (
    <div className="filter-search">
      <div className="filter-options">
        <div className="filter">
          <label>Ejendomstype</label>
          <select onChange={(e) => handleFilterChange('ejendomstype', e.target.value)}>
            <option value="">Vælg ejendomstype</option>
            <option value="landbrug">Landbrug</option>
            <option value="kontor">Kontor bygning</option>
            <option value="privat">Privat villa</option>
          </select>
        </div>
        <div className="filter">
          <label>Antal matrikler</label>
          <input
            type="number"
            placeholder="Antal matrikler"
            onChange={(e) => handleFilterChange('antalMatrikler', e.target.value)}
          />
        </div>
        <div className="filter">
          <label>Størrelse</label>
          <input
            type="text"
            placeholder="Størrelse"
            onChange={(e) => handleFilterChange('stoerrelse', e.target.value)}
          />
        </div>
        <div className="filter">
          <label>Forurening</label>
          <select onChange={(e) => handleFilterChange('foruerening', e.target.value)}>
            <option value="">Vælg fourenings level</option>
            <option value="landbrug">1</option>
            <option value="kontor">2</option>
          </select>
        </div>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Søg efter filter..." />
        <button className="search-button">SØG</button>
        <div className="random-results">
          <input type="checkbox" id="randomResults" />
          <label htmlFor="randomResults">Tilfældige resultater</label>
        </div>
      </div>
      <div className="results">
        <h3>Resultater</h3>
        <div className="result-box"> {/* Her skal resultalterne så dynamisk sættes ind*/}
          <button className="save-button">GEM SØGNING</button>
        </div>
      </div>
    </div>
  );
}

export default FilterSearch;
