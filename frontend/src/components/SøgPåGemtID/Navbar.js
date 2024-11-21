import React from 'react';
import './Navbar.css';
import Nykredit_logo from '../../Nykredit_logo.png'; // Adjust the path to your image file
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar"> 
      <span className="nav-logo">
        <img src={Nykredit_logo} alt="Nykredit logo" style={{ height: '25px' }} /> {/* Adjust the height as needed */}
      </span>      
      <Link to="/filter-search" className="nav-item">Ny søgning</Link>
      <Link to="/search-id" className="nav-item">Søg på gemt ID</Link>
    </nav>
  );
}

export default Navbar;