// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/SøgPåGemtID/Navbar';
import SearchSection from './components/SøgPåGemtID/SearchSection';
import FilterSearch from './components/NySøgning/FilterSearch';
import FilterComponent from './components/FilterComponent';
import SimpleSearch2 from './components/simpleSearch2';
import './App.css';

/*
function App() {
  const [filters, setFilters] = useState({
    ejendomstype: '',
    landekode: '',
    // Add more filters as needed
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/search-id" element={<SearchSection />} />
          <Route path="/filter-search" element={<FilterSearch />} />
          <Route path="/" element={<Navigate to="/search-id" />} />
        </Routes>
        <FilterComponent
          apiEndpoint="/api/ejendomstype-options/"
          label="Ejendomstype"
          valueKey="ejendomstype_kode"
          displayKey="ejendomstype"
          onChange={handleFilterChange}
        />
        <FilterComponent
          apiEndpoint="/api/landekode-options/"
          label="Landekode"
          valueKey="land_id"
          displayKey="land_navn"
          onChange={handleFilterChange}
        />
        {/* Add more FilterComponent instances as needed */}
      </div>
    </Router>
  );
}*/

function App() {
  return (
    <div>
      <SimpleSearch2></SimpleSearch2>
    </div>
  )
}

export default App;