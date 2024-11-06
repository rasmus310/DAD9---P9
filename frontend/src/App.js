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
import { Button } from "@mui/material";
import axios from "axios";

function App() {
  const [filters, setFilters] = useState({
    ejendomstype: "",
    landekode: "",
    // Add more filters as needed
  });

  const [response, setResponse] = useState("");
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
        ejendomsID: null,
        antal_matches: "request fejlet.. tag dig sammen amatør-udvikler",
      });
    }
  }

  function handleSelect(event) {
    const name = event.target.name;
    const value = event.target.value;

    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
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
        <p>søgeresultat: {JSON.stringify(response)}</p>
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
