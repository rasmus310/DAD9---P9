import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/SøgPåGemtID/Navbar';
import SearchSection from './components/SøgPåGemtID/SearchSection';
import FilterSearch from './components/NySøgning/FilterSearch';
import Filter_ejendomstype from './components/Filter_ejendomstype';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/search-id" element={<SearchSection />} />
          <Route path="/filter-search" element={<FilterSearch />} />
          <Route path="/" element={<Navigate to="/search-id" />} />
        </Routes>
        <Filter_ejendomstype /> {/* Include the dropdown form here */}
      </div>
    </Router>
  );
}

export default App;