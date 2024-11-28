// App.js
import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import FilterComponent from "./components/FilterComponent";
import "./App.css";
import {
  Box,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import axios from "axios";
import Postnummer from "./components/search_components/postnummer";
import Antal_resultater from "./components/search_components/antal_resultater";
import ResultTable from "./components/ResultTable";
import SearchFilter from "./components/SearchFilter";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [randomize, setRandomize] = useState(true);
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

  const handleRandomizeToggle = () => {
    setRandomize(!randomize);
  };

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
    setSavedSearch(null);
    try {
      const response = await axios.get("search/", {
        params: {
          // spread operator takes all key-value pairs in selected_criteria and includes them in the params object
          ...selected_criteria,
          // add the new key: value pair (bool randomized is converted to string)
          randomize: randomize.toString(),
        },
      });
      console.log("Response", response.data);
      setResponse(response.data);
      setTableVisible(true); // Show table after receiving data
    } catch {
      setResponse({
        //OBS lav om. Overvej hvordan resulttable læser data, og sæt response til noget der giver mening ud fra det
        antal_matches: "request fejlet.. tag dig sammen amatør-udvikler",
      });
    }
  }

  function resetFilter(valueKey) {
    setCriteria((prevCriteria) => {
      const new_criteria = { ...prevCriteria };

      delete new_criteria[valueKey];

      return new_criteria;
    });
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
    // only make request if searchID has a value
    if (!searchID) {
      return;
    }

    try {
      const response = await axios.get("search_id/", {
        params: { search_id: searchID },
      });

      setResponse(response.data);
      const search_criteria = response.data.search_criteria; // extract search criteria
      setCriteria(search_criteria || {}); // set criteria usestate
      const newActiveFilters = Object.keys(search_criteria); // extract keys from search criteria used to set activeFilters usestate
      setActiveFilters(newActiveFilters); // set activeFilters
      setTableVisible(true); // Show table after receiving data
    } catch {
      setResponse({
        //OBS lav om. Overvej hvordan resulttable læser data, og sæt response til noget der giver mening ud fra det
        antal_matches: "request fejlet.. tag dig sammen amatør-udvikler!!",
      });
    }
  }

  function handleIdselect(event) {
    setSearchID(event.target.value);
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

  function deactivateAllFilters() {
    setActiveFilters([]);
    resetCriteria();
  }

  return (
    <Router>
      <div className="App">
        <Navbar
          searchID={searchID}
          handleIdselect={handleIdselect}
          handleIdSearch={handleIdSearch}
          scrollToSection={() => scrollToSection(sectionOneRef)} // Pass the scrollToSection function
        />
        <h1
          style={{
            textAlign: "center",
            paddingTop: 120,
            fontWeight: "bolder",
            fontSize: 60,
            color: "#0f1e82",
            fontFamily: "Arial Black, sans-serif",
          }}
        >
          Find ejendomme
        </h1>{" "}
        <SearchFilter
          activeFilters={activeFilters}
          onFilterToggle={handleFilterToggle}
        />{" "}
        {/* Pass state and handler */}
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
              deactivateFilter={() => {
                deactivateFilter(criteria.valueKey);
                resetFilter(criteria.valueKey);
              }} // Pass deactivate function
            />
          ))}
          {/*Skralde spands ikon for at lave rydde filtrene fra siden 
          lavede den for sjov så slet hvis ikke vil have den*/}
          <IconButton
            aria-label="delete"
            size="small"
            sx={{
              color: "#000",
              position: "flex",
            }}
          >
            <DeleteIcon
              sx={{ fontSize: "50px" }}
              onClick={deactivateAllFilters}
            />
            Ryd filtre
          </IconButton>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            width: "60%",
            paddingTop: 40,
          }}
        >
          <Antal_resultater
            selected_criteria={selected_criteria}
            handleSelect={handleSelect}
          ></Antal_resultater>
          <Button
            variant="contained"
            sx={{
              height: "56px", // Match the default height of TextField
              padding: "0 16px", // Optional: Ensure padding matches
              paddingInline: "40px", // Optional: Ensure padding matches
              backgroundColor: "#0f1e82",
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

          <FormControlLabel
            control={
              <Checkbox
                checked={randomize}
                onChange={handleRandomizeToggle}
                name="randomize"
                color="primary"
              />
            }
            label="Tilfældige resultater"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            width: "60%",
            paddingTop: 15,
          }}
        >
          <Button type="submit" onClick={resetCriteria}>
            nulstil søgekriterier
          </Button>
          <Button onClick={saveSearchFilters}>Gem søgekriterier</Button>
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
            {saved_searchID && <div>Gemt med søgenummer: {saved_searchID}</div>}
          </div>
          <div></div>
        </div>
      </div>
      <Box padding={10}>
        {isTableVisible && (
          <ResultTable
            ref={sectionOneRef}
            response={response}
            style={{ padding: 10 }}
          />
        )}
      </Box>
    </Router>
  );
}

export default App;
