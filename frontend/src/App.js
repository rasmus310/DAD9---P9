// App.js
import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/SøgPåGemtID/Navbar";
import SearchSection from "./components/SøgPåGemtID/SearchSection";
import test from "./components/SøgPåGemtID/test";
import FilterComponent from "./components/FilterComponent";
import "./App.css";
import { Box, Button, Typography, TextField } from "@mui/material";
import axios from "axios";
import Postnummer from "./components/search_components/postnummer";
import Antal_resultater from "./components/search_components/antal_resultater";
import ResultTable from "./components/ResultTable";
import SearchFilter from "./components/SearchFilter";
import Logo from "./components/Logo";

function App() {
  const [filters, setFilters] = useState({
    
    // Add more filters as needed
  });
  const [response, setResponse] = useState();
  const [selected_criteria, setCriteria] = useState({});
  const [search_criteria_configuration, setConfiguration] = useState([]);
  const [saved_searchID, setSavedSearch] = useState(null);
  const [searchID, setSearchID] = useState();
  //const resultForTable = response; BLIVER IKKE BRUGT?
  const [activeFilters, setActiveFilters] = useState([]); // State to track active filters
  const sectionOneRef = useRef(null);
  const [isTableVisible, setTableVisible] = useState(false);


const scrollToSection = (sectionRef) => {
  sectionRef.current?.scrollIntoView({ behavior: "smooth" });
};

useEffect(() => {
  if (isTableVisible) {
    const scrollTimeout = setTimeout(() => {
      scrollToSection(sectionOneRef);
    }, 100); // Wait 100ms to ensure rendering is complete
    return () => clearTimeout(scrollTimeout); // Cleanup timeout
  }
}, [isTableVisible]);

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
    //setTableVisible(false); // Hide table before search
    try {
      const response = await axios.get("search/", {
        params: selected_criteria,
      });
      console.log("Response", response.data);
      setResponse(response.data);
      setTableVisible(true); // Show table after receiving data

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
        antal_matches: "request fejlet.. tag dig sammen amatør-udvikler!!",
      });
    }
  }

  function handleIdselect(event) {
    setSearchID(event.target.value)
  }

  const handleFilterToggle = (filter) => {
    setActiveFilters((prevActiveFilters) =>
      prevActiveFilters.includes(filter)
        ? prevActiveFilters.filter((f) => f !== filter)
        : [...prevActiveFilters, filter]
    );
  };

  const deactivateFilter = (filter) => {
    setActiveFilters((prevActiveFilters) =>
      prevActiveFilters.filter((f) => f !== filter)
    );
  };

  return (
    <Router>
      <div className="App">
      <Navbar
        searchID={searchID}
        handleIdselect={handleIdselect}
        handleIdSearch={handleIdSearch}
        scrollToSection={() => scrollToSection(sectionOneRef)} // Pass the scrollToSection function
        />
        <Logo />
        <SearchFilter activeFilters={activeFilters} onFilterToggle={handleFilterToggle} /> {/* Pass state and handler */}
        <Routes>
          <Route path="/search-id" element={<SearchSection />} />
          <Route path="/test" element={<test />} />
        </Routes>

        <div
        // Styling til visning af filter-komponenter
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            width: "60%",
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
              deactivateFilter={() => deactivateFilter(criteria.valueKey)} // Pass deactivate function
            />
          ))}
        </div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            width: "60%",
            paddingTop: 40,
          }}>
        <Antal_resultater
          selected_criteria={selected_criteria}
          handleSelect={handleSelect}
        ></Antal_resultater>
        <Button
          variant="contained"
          sx={{
            height: '56px', // Match the default height of TextField
            padding: '0 16px', // Optional: Ensure padding matches
            paddingInline: '40px', // Optional: Ensure padding matches
            backgroundColor: '#0f1e82',
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
          type="submit"
          onClick={() => {
            handleSearch();
            scrollToSection(sectionOneRef);
          }}
        >
          Søg
        </Button>
      </div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            width: "60%",
            paddingTop: 15,
          }}>
        <Button type="submit" onClick={resetCriteria}>
          Reset
        </Button>
        <Button onClick={saveSearchFilters}>
          Gem søgning
        </Button>
        {/* <TextField
            type="text"
            variant="outlined"
            placeholder="Search ID"
            onChange={handleIdselect}
            value={searchID || ""}
          />
          <Button 
          variant="contained"
          sx={{
            height: '56px', // Match the default height of TextField
            padding: '0 16px', // Optional: Ensure padding matches
            paddingInline: '40px', // Optional: Ensure padding matches
            backgroundColor: '#0f1e82',
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }} 
          onClick={handleIdSearch}>
            Søg på search ID
          </Button>*/}
        <div>
          {saved_searchID && (
            <div>
              Søgning gemt med ID: {saved_searchID}
            </div>
            
          )}
        </div>
      <div></div>
        </div>
        </div>
        <Box padding={10}>
          {isTableVisible && (
        <ResultTable ref={sectionOneRef} response={response} style={{ padding: 10 }} />    
          )}    
        </Box>
    </Router>
  );
}

export default App;
