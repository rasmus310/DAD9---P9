import React, { useState } from 'react';
import './FilterSearch.css';

// The FilterSearch component allows users to search for properties and apply various filters.
function FilterSearch() {
    // State to hold the selected filter values (State is used to manage dynamic data that can change over time, typically as a result of user interactions)
    // The useState hook initializes the state with an object containing the filter values (ejendomstype, antalMatrikler, stoerrelse, forurening)
  const [selectedFilters, setSelectedFilters] = useState({
    ejendomstype: '',
    antalMatrikler: '',
    stoerrelse: '',
    forurening: '',
  });

  // This is an arrow function(=>), which updates the state when a filter value changes.
  // Why arrow functions? Mere concise og kortere og nemmere at læse (siger folk på StackOverflow og co-pilot)
  const handleFilterChange = (filter, value) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filter]: value,
    }));
  };

  return (
    <div className="filter-search">
      {/* Search bar for searching by ID */}
      <div className="search-bar">
        <input type="text" placeholder="Søg efter filter..." />
        <button className="search-button">SØG</button>
      </div>

      {/* Filter options for various property attributes */}
      <div className="filter-options">
        <div className="filter">
          <label>Ejendomstype</label>
          <select onChange={(e) => handleFilterChange('ejendomstype', e.target.value)}>
            <option value="">Vælg ejendomstype</option>
            <option value="landbrug">Landbrug</option>
            <option value="kontor">Kontor bygning</option>
            <option value="privat">Privat villa</option>
            <option value="privat">Single-line item</option>
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
          <input
            type="text"
            placeholder="Forurening"
            onChange={(e) => handleFilterChange('forurening', e.target.value)}
          />
        </div>
      </div>
      {/* This is the placeholder for our results (we should gon make it dynamic soon enough) */}
      <div className="result-box">
        <button className="save-button">GEM SØGNING</button>
      </div>
    </div>
  );
}

export default FilterSearch;