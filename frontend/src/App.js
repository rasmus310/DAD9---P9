import React, { Component } from "react";
import './App.css';
import axios from "axios";
import SimpleSearch from './components/simpleSearch.js'
import SimpleSearch2 from "./components/simpleSearch2.js";

function App() {
  return (
      <div className = "App">
        <div>Nykredit testdata søgeværktøj</div>
        <SimpleSearch2></SimpleSearch2>
      </div>
  )
}

export default App;
