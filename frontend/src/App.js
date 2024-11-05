import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/SøgPåGemtID/Navbar';
import SearchSection from './components/SøgPåGemtID/SearchSection';
import FilterSearch from './components/NySøgning/FilterSearch';
import SimpleSearch2 from './components/simpleSearch2';
import './App.css';

/*
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