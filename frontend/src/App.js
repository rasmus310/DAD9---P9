import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/SøgPåGemtID/Navbar';
import SearchSection from './components/SøgPåGemtID/SearchSection';
import FilterSearch from './components/NySøgning/FilterSearch';
import './App.css';
import axios from "axios";
import SimpleSearch from './components/simpleSearch.js';
import SimpleSearch2 from "./components/simpleSearch2.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div>Nykredit testdata søgeværktøj</div>
        <SimpleSearch2 />
        <Routes>
          <Route path="/search-id" element={<SearchSection />} />
          <Route path="/filter-search" element={<FilterSearch />} />
          <Route path="/" element={<Navigate to="/search-id" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;