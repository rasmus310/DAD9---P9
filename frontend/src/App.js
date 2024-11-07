import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/SøgPåGemtID/Navbar';
import SearchSection from './components/SøgPåGemtID/SearchSection';
import FilterSearch from './components/NySøgning/FilterSearch';
import FilterComponent from './components/FilterComponent';
import SearchableDropdown from './components/SearchComponent'; // Import the SearchableDropdown component
import { Box, Button } from '@mui/material';
import './App.css';
import './Styles.css'; // Import your stylesheet

function App() {
  const [filters, setFilters] = useState({
    ejendomstype: '',
    landekode: '',
    forurenet: '',
    // Add more filters as needed
  });

  const [showEjendomstype, setShowEjendomstype] = useState(true); // State to manage the visibility of Ejendomstype filter
  const [showLandekode, setShowLandekode] = useState(true); // State to manage the visibility of Landekode filter
  const [showForurening, setShowForurening] = useState(true); // State to manage the visibility of Forurening filter

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const toggleEjendomstype = () => {
    setShowEjendomstype(prevShow => !prevShow); // Toggle the visibility of Ejendomstype filter
  };

  const toggleLandekode = () => {
    setShowLandekode(prevShow => !prevShow); // Toggle the visibility of Landekode filter
  };

  const toggleForurening = () => {
    setShowForurening(prevShow => !prevShow); // Toggle the visibility of Forurening filter
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
        <Box className="searchComponent">
          <SearchableDropdown 
            toggleEjendomstype={toggleEjendomstype}
            toggleLandekode={toggleLandekode}
          /> {/* Include the SearchableDropdown component */}
        </Box>
        <Box display="flex" alignItems="center" gap={2} mt={2}>
        </Box>
        <Box display="flex" alignItems="center" gap={2} mt={2}>
          {showEjendomstype && (
            <FilterComponent
              apiEndpoint="/api/ejendomstype-options/"
              label="Ejendomstype"
              valueKey="ejendomstype_kode"
              displayKey="ejendomstype"
              onChange={handleFilterChange}
              onClose={toggleEjendomstype} // Pass the toggle function as onClose
            />
          )}
          {showLandekode && (
            <FilterComponent
              apiEndpoint="/api/landekode-options/"
              label="Landekode"
              valueKey="land_id"
              displayKey="land_navn"
              onChange={handleFilterChange}
              onClose={toggleLandekode} // Pass the toggle function as onClose
            />
          )}
          {showForurening && (
            <FilterComponent
              apiEndpoint="/api/forurening-options/"
              label="Forurening"
              valueKey="forurenet"
              displayKey="forurenet"
              onChange={handleFilterChange}
              onClose={toggleForurening} // Pass the toggle function as onClose
            />
          )}
        </Box>
      </div>
    </Router>
  );
}

export default App;