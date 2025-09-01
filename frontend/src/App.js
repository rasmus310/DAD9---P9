// App.js
import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import Navbar from "./components/Navbar";
import FilterComponent from "./components/FilterComponent";
import "./App.css";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import axios from "axios";
import Antal_resultater from "./components/search_components/antal_resultater";
import ResultTable from "./components/ResultTable";
import SearchFilter from "./components/SearchFilter";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [filters, setFilters] = useState({
    // Lokal UI-state for simple filterfelter (bruges ved behov)
  });
  const [response, setResponse] = useState();
  const [selected_criteria, setCriteria] = useState({});
  // State til konfiguration af søgekriterier, hentes fra backend ved load
  const [search_criteria_configuration, setConfiguration] = useState([]); 
  const [saved_searchID, setSavedSearch] = useState(null);
  const [searchID, setSearchID] = useState();
  // (resultForTable var tiltænkt men bruges ikke – kan fjernes)
  const [activeFilters, setActiveFilters] = useState([]); // State til at holde styr på hvilke filtre der er aktive
  const [randomize, setRandomize] = useState(true);
  const sectionOneRef = useRef(null);
  const [isTableVisible, setTableVisible] = useState(false);

  // Funktion der automatisk scroller til en given sektion på siden
  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Når tabellen bliver synlig, scroll automatisk ned til den
  useEffect(() => {
    if (isTableVisible) {
      const scrollTimeout = setTimeout(() => {
        scrollToSection(sectionOneRef);
      }, 100); // Vent 100ms for at sikre at DOM er renderet
      return () => clearTimeout(scrollTimeout); // Ryd timeout, hvis komponenten unmountes eller synlighed ændres hurtigt
    }
  }, [isTableVisible]);

  // Hent søgekriterie-konfiguration fra backend når komponenten loader første gang
  useEffect(() => {
    fetchSearchCriteriaConfigurations();
  }, []);

  const handleRandomizeToggle = () => {
    setRandomize(!randomize);
  };

  // Henter søgekriterie-konfiguration fra backend API og opdaterer state
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
          // Læg alle valgte søgekriterier ind i params-objektet
          ...selected_criteria,
          // Tilføj randomize som streng (backend forventer string)
          randomize: randomize.toString(),
        },
      });
      console.log("Response", response.data);
      setResponse(response.data);
      setTableVisible(true); // Vis tabellen når der er modtaget data
    } catch {
      setResponse({
        // Fallback-fejltekst hvis anmodningen fejler (ResultTable viser dette som ingen resultater)
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
    // Antal resultater gemmes ikke som en del af søgekriterierne
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

  // Henter tidligere gemt søgning baseret på søge-ID og opdaterer state med resultater og kriterier
  async function handleIdSearch() {
    // Udfør kun kald hvis der er angivet et søge-ID
    if (!searchID) {
      return;
    }

    try {
      const response = await axios.get("search_id/", {
        params: { search_id: searchID },
      });

      setResponse(response.data);
      const search_criteria = response.data.search_criteria; // Udtræk søgekriterier fra svaret
      setCriteria(search_criteria || {}); // Opdater state med søgekriterierne
      const newActiveFilters = Object.keys(search_criteria); // Find hvilke filtre der er brugt
      setActiveFilters(newActiveFilters); // Opdater aktive filtre i UI
      setTableVisible(true); // Vis tabellen når der er modtaget data
    } catch {
      setResponse({
        // Fallback-fejltekst hvis anmodningen fejler (ResultTable viser dette som ingen resultater)
        antal_matches: "request fejlet.. tag dig sammen amatør-udvikler!!",
      });
    }
  }

  function handleIdselect(event) {
    setSearchID(event.target.value);
  }

  // Tilføjer eller fjerner et filter fra listen over aktive filtre, bruges af SearchFilter
  const handleFilterToggle = (filter) => {
    setActiveFilters((prevActiveFilters) =>
      prevActiveFilters.includes(filter)
        ? prevActiveFilters.filter((f) => f !== filter)
        : [...prevActiveFilters, filter]
    );
  };

  // Fjerner et filter fra listen over aktive filtre
  const deactivateFilter = (filter) => {
    setActiveFilters((prevActiveFilters) =>
      prevActiveFilters.filter((f) => f !== filter)
    );
  };

  // Nulstiller alle aktive filtre og søgekriterier
  function deactivateAllFilters() {
    setActiveFilters([]);
    resetCriteria();
  }

  return (
    // Router bruges til at håndtere navigation/routing i React-appen
    <Router>
      <div className="App">
        <Navbar
          searchID={searchID}
          handleIdselect={handleIdselect}
          handleIdSearch={handleIdSearch}
          scrollToSection={() => scrollToSection(sectionOneRef)} // Sender scrollToSection som prop, så Navbar kan scrolle til tabellen
        />
        <h1
          style={{
            textAlign: "center",
            paddingTop: 120,
            fontWeight: "ExtraBold",
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
        {/* Passer state og handler til underkomponenter */}
        <div
          // Wrapper med styling for at vise filter-komponenterne pænt centreret
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            width: "60%",
          }}
        >
          {/* Itererer over konfigurationen og opretter et FilterComponent for hvert søgekriterie */}
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
              active={activeFilters.includes(criteria.valueKey)} // Marker om filteret er aktivt i UI
              deactivateFilter={() => {
                deactivateFilter(criteria.valueKey);
                resetFilter(criteria.valueKey);
              }} // Deaktiver og ryd det specifikke filter
            />
          ))}
          {/* Skraldespands-ikon til at nulstille alle aktive filtre */}
          {activeFilters.length > 0 && (
            <IconButton
              aria-label="delete"
              size="small"
              sx={{
                color: "#0f1e82",
                position: "flex",
                padding: "5px", // Gør klikområdet større for bedre brugervenlighed
                borderRadius: "5px", // Afrundede hjørner for bedre visuel fremtoning
              }}
              onClick={deactivateAllFilters}
            >
              <DeleteIcon sx={{ fontSize: "25px" }} />
              <span style={{ fontSize: "16px", padding: "5px" }}> Ryd søgekriterier</span>            </IconButton>
          )}
        </div>
        <div
          // Wrapper med styling for at vise søgeknap og ekstra indstillinger centreret
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
              height: "56px", // Matcher standardhøjden for TextField
              padding: "0 16px", // Vandret padding for bedre klikområde
              paddingInline: "40px", // Ekstra bredde på knappen
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
          // Wrapper med styling for at vise knapper og status for gemt søgning centreret
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
