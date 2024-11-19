// App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/SøgPåGemtID/Navbar";
import SearchSection from "./components/SøgPåGemtID/SearchSection";
import FilterComponent from "./components/FilterComponent";
import "./App.css";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import Postnummer from "./components/search_components/postnummer";
import Antal_resultater from "./components/search_components/antal_resultater";
import ResultTable from "./components/ResultTable";
import SearchFilter from "./components/SearchFilter";
import Logo from "./components/Logo";

function App() {
  const [filters, setFilters] = useState({
    ejendomstype: "",
    landekode: "",
    // Add more filters as needed
  });
  const [response, setResponse] = useState();
  const [selected_criteria, setCriteria] = useState({});
  const [search_criteria_configuration, setConfiguration] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]); // State to track active filters

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
  }

  async function gemFiltre() {
    const criterias_to_save = selected_criteria;
    delete criterias_to_save.antal_resultater;
    try {
      const response = await axios.post("/save_search/", {
        params: criterias_to_save,
      });
      setResponse(response.data);
    } catch {
      setResponse({
        response: "fejl - søgekriterier ikke gemt",
      });
    }
  }

  const handleFilterToggle = (filter) => {
    setActiveFilters((prevActiveFilters) =>
      prevActiveFilters.includes(filter)
        ? prevActiveFilters.filter((f) => f !== filter)
        : [...prevActiveFilters, filter]
    );
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Logo />
        <SearchFilter activeFilters={activeFilters} onFilterToggle={handleFilterToggle} /> {/* Pass state and handler */}
        <Routes>
          <Route path="/search-id" element={<SearchSection />} />
        </Routes>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
            width: "50%",
          }}
        >
          {search_criteria_configuration.map((criteria) => (
            <FilterComponent
              key={criteria.valueKey}
              apiEndpoint={criteria.optionsEndpoint}
              label={criteria.label}
              valueKey={criteria.valueKey}
              displayKey={criteria.displayKey}
              selected_criteria={selected_criteria}
              handleSelect={handleSelect}
              onChange={(event) => {
                handleFilterChange(event);
                handleSelect(event);
              }}
              active={activeFilters.includes(criteria.valueKey)} // Pass active state
            />
          ))}
        </div>
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
        <Button type="submit" onClick={resetCriteria}>
          Reset
        </Button>
        <Button type="submit" onClick={gemFiltre}>
          Gem søgefiltre
        </Button>
        <ResultTable response={response} style={{ width: "50%" }} />
      </div>
    </Router>
  );
}

export default App;
