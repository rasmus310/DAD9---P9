// App.js
import React, { useEffect, useState } from "react";
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
import ResultTable from "./components/ResultTable";

function App() {
  const [filters, setFilters] = useState({
    ejendomstype: "",
    landekode: "",
    // Add more filters as needed
  });
  const [response, setResponse] = useState();
  const [selected_criteria, setCriteria] = useState({});
  const [search_criteria_configuration, setConfiguration] = useState([]);
  const [saved_searchID, setSavedSearch] = useState(null);
  const [searchID, setSearchID] = useState();

  const resultForTable = response;

  useEffect(() => {
    fetchSearchCriteriaConfigurations();
  }, []);

  async function fetchSearchCriteriaConfigurations() {
    try {
      const response = await axios.get("get_search_criteria/");
      setConfiguration(response.data);
      console.log("Config-Response", response.data);
    } catch (error) {
      console.error("Error fetching search criteria configuration:", error);
    }
  }

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  async function handleSearch() {
    setSavedSearch(null)
    try {
      const response = await axios.get("search/", {
        params: selected_criteria,
      });
      console.log("Response", response.data);
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
    setSearchID();
  }

  async function saveSearchFilters() {
    const criterias_to_save = selected_criteria;
    // number of results is not saved 
    delete criterias_to_save.antal_resultater;
    try {
      const response = await axios.post("/save_search/", {
        params: criterias_to_save,
      });
      
      const savedSearchID = response.data.search_id; 
      setSavedSearch(savedSearchID);  
    } catch {
      setSavedSearch({
        response: "fejl - søgekriterier ikke gemt",
      });
    }
  }

  async function handleIdSearch() {
    try {
      const response = await axios.get("search_id/", {
        params: {search_id: searchID},
      });
      console.log("Response", response.data);
      setResponse(response.data);
    } catch {
      setResponse({
        antal_matches: "request fejlet.. tag dig sammen amatør-udvikler",
      });
    }
  }

  function handleIdselect(event) {
    setSearchID(event.target.value)
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/search-id" element={<SearchSection />} />
        </Routes>
        {search_criteria_configuration.map((criteria) => (
          <FilterComponent
            key={criteria.valueKey}
            apiEndpoint={criteria.optionsEndpoint}
            label={criteria.label}
            valueKey={criteria.valueKey}
            displayKey={criteria.displayKey}
            selected_criteria={selected_criteria}
            onChange={(event) => {
              handleFilterChange(event);
              handleSelect(event);
            }}
          />
        ))}
        <p>Postnummer</p>
        <Postnummer
          selected_criteria={selected_criteria}
          handleSelect={handleSelect}
        ></Postnummer>
        <p>Antal ønskede resultater</p>
        <Antal_resultater
          selected_criteria={selected_criteria}
          handleSelect={handleSelect}
        ></Antal_resultater>
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
        <div>
          <input
            type="text"
            placeholder="indtast ID for gemt søgning"
            onChange={handleIdselect}
            value={searchID || ""}
          />
          <Button onClick={handleIdSearch}>
            Søg på gemte filtre
          </Button>
        </div>
        <Button onClick={resetCriteria}>
          Reset
        </Button>
        <Button onClick={saveSearchFilters}>
          Gem søgefiltre
        </Button>
        <div>
          {saved_searchID && (
            <div>
              Søgning gemt med ID: {saved_searchID}
            </div>
          )}
        </div>
        <ResultTable response={response} />
      </div>
      <div></div>
    </Router>
  );
}

export default App;
