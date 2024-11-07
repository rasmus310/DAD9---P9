// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/SøgPåGemtID/Navbar";
import SearchSection from "./components/SøgPåGemtID/SearchSection";
import FilterSearch from "./components/NySøgning/FilterSearch";
import FilterComponent from "./components/FilterComponent";
import SimpleSearch2 from "./components/simpleSearch2";
import "./App.css";
import { Button, MenuItem, Select, Typography } from "@mui/material";
import axios from "axios";
import Ejendomstype from "./components/search_components/ejendomstype";
import Risikovurdering from "./components/search_components/risikovurdering";
import Postnummer from "./components/search_components/postnummer";
import Antal_resultater from "./components/search_components/antal_resultater";
import Fkbrand from "./components/search_components/fk_brand";


function App() {
  const [filters, setFilters] = useState({
    ejendomstype: "",
    landekode: "",
    // Add more filters as needed
  });

  const [response, setResponse] = useState();
  const [selected_criteria, setCriteria] = useState([]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  async function handleSearch() {
    try {
      const response = await axios.get("App/", {
        params: selected_criteria,
      });
      setResponse(response.data);
    } catch {
      setResponse({
        antal_matches: "request fejlet.. tag dig sammen amatør-udvikler",
      });
    }
  }

  function handleSelect(event) {
    const name = event.target.name;
    const value = event.target.value;

    setCriteria((prevCriteria) => {
      const new_criteria = { ...prevCriteria };
  
      if (value === "") {
        delete new_criteria[name];
      } else {
        new_criteria[name] = value;
      }
  
      return new_criteria;
    });

  }

  function resetCriteria() {
    setCriteria({});
  }

  async function gemFiltre() {
    try {
      const response = await axios.post("", {
        params: selected_criteria,
      });
      // OBS setResponse: skal have egen variabel?
      setResponse(response.data);
    } catch {
      setResponse({
        response: "fejl - søgekriterier ikke gemt",
      });
    }

  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/search-id" element={<SearchSection />} />
        </Routes>
        <FilterComponent
          apiEndpoint="/api/ejendomstype-options/"
          label="Ejendomstype"
          valueKey="ejendomstype_kode"
          displayKey="ejendomstype"
          onChange={(event) => {
            handleFilterChange(event);
            handleSelect(event);
          }}
        />
        <FilterComponent
          apiEndpoint="/api/landekode-options/"
          label="Landekode"
          valueKey="land_id"
          displayKey="land_navn"
          onChange={(event) => {
            handleFilterChange(event);
            handleSelect(event);
          }}
        />
        <p>Ejendomstype</p>
        <Ejendomstype selected_criteria={selected_criteria} handleSelect={handleSelect}></Ejendomstype>
        
        <p>Risikovurdering</p>
        <Risikovurdering selected_criteria={selected_criteria} handleSelect={handleSelect}></Risikovurdering>
        
        <p>FK_BRAND</p>
        <Fkbrand selected_criteria={selected_criteria} handleSelect={handleSelect}></Fkbrand>

        <p>Postnummer</p>
        <Postnummer selected_criteria={selected_criteria} handleSelect={handleSelect}></Postnummer>
        
        <p>Antal ønskede resultater</p>
        <Antal_resultater selected_criteria={selected_criteria} handleSelect={handleSelect}></Antal_resultater>
        {/* Add more FilterComponent instances as needed */}{" "}
        
        <Button
          variant="contained"
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
          type="submit"
          onClick={handleSearch}
        >
          Søg
        </Button>

        <Button type="submit" onClick={resetCriteria}>
        Reset
        </Button>
        
        <Button type="submit" onClick={gemFiltre}>
        Gem søgefiltre
        </Button>


        <p>søgeresultat: {JSON.stringify(response)}</p>
      </div>
      <div>

      </div>
      
    </Router>
  );
}

/*function App() {
  return (
    <div>
      <SimpleSearch2></SimpleSearch2>
    </div>
  );
}*/

export default App;
