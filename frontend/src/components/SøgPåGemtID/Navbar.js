import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-item">Nykredit</Link>
      <Link to="/search-id" className="nav-item">Ny søgning</Link>
      <Link to="/filter-search" className="nav-item">Søg på gemt ID</Link>
    </nav>
  );
}

export default Navbar;