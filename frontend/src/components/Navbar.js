import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <span className="nav-item">Nykredit</span>
      <span className="nav-item">Ny søgning</span>
      <span className="nav-item active">Søg på gemt ID</span>
    </nav>
  );
}

export default Navbar;
