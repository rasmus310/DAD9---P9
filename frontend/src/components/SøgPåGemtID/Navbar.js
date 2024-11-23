import React, { forwardRef } from "react";
import './Navbar.css';
import Nykredit_logo from '../../Nykredit_logo.png'; // Adjust the path to your image file
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';


function Navbar({ searchID, handleIdselect, handleIdSearch, scrollToSection }) {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <span className="nav-logo">
          <a href="http://localhost:3000/">
          <img src={Nykredit_logo} alt="Nykredit logo" style={{ height: '25px' }} />
          </a>
        </span>
        <Link to="/filter-search" className="nav-item">Ny søgning</Link>
        <Link to="/search-id" className="nav-item">Søg på gemt ID</Link>
      </div>
      <div className="searchSection">
        <TextField
          type="text"
          variant="outlined"
          size="small"
          placeholder="Search ID"
          onChange={handleIdselect}
          value={searchID || ""}
        />
        <Button 
          variant="contained"
          size='small'
          sx={{
            height: '40px',
            //padding: '0 16px',
            //paddingInline: '40px',
            backgroundColor: '#0f1e82',
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
          onClick={() => {
            handleIdSearch();
            scrollToSection();
          }}
        >
          Søg
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;