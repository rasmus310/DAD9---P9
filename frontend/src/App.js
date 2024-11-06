// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/SøgPåGemtID/Navbar';
import SearchSection from './components/SøgPåGemtID/SearchSection';
import FilterSearch from './components/NySøgning/FilterSearch';
import FilterComponent from './components/FilterComponent';
import SimpleSearch2 from './components/simpleSearch2';
import './App.css';
import { MenuItem, Select, Typography, Box } from "@mui/material"; //https://mui.com/x/introduction/



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
          <Route path="/filter-search" element={<FilterSearch />} />
          <Route path="/" element={<Navigate to="/search-id" />} />
          <Route path="/search-id" element={<SearchSection />} />
        </Routes>
        <Box display="flex" alignItems="center" gap={2}>
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
        </Box>
        {/* Add more FilterComponent instances as needed */}
      </div>
    </Router>
  );
}


export default App;