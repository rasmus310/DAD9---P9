import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/SøgPåGemtID/Navbar';
import SearchSection from './components/SøgPåGemtID/SearchSection';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/search-id" element={<SearchSection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
