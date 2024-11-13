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
    forurenet: "",
    risikovurdering: "",
    // Add more filters as needed
  });

  const [showEjendomstype, setShowEjendomstype] = useState(true); // State to manage the visibility of Ejendomstype filter
  const [showLandekode, setShowLandekode] = useState(true); // State to manage the visibility of Landekode filter
  const [showForurening, setShowForurening] = useState(false); // State to manage the visibility of Forurening filter
  const [showRisikovurdering, setShowRisikovurdering] = useState(false); // State to manage the visibility of Risikovurdering filter
  const [search_criteria_configuration, setConfiguration] = useState([]);
  const [response, setResponse] = useState();
  const [selected_criteria, setCriteria] = useState([]);

  const toggleEjendomstype = () => {
    setShowEjendomstype((prevShow) => !prevShow); // Toggle the visibility of Ejendomstype filter
  };

  const toggleLandekode = () => {
    setShowLandekode((prevShow) => !prevShow); // Toggle the visibility of Landekode filter
  };

  const toggleForurening = () => {
    setShowForurening((prevShow) => !prevShow); // Toggle the visibility of Forurening filter
  };

  const toggleRisikovurdering = () => {
    setShowRisikovurdering((prevShow) => !prevShow); // Toggle the visibility of Risikovurdering filter
  };

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
    // overvej om det er bedre at håndtere i backend
    const criterias_to_save = selected_criteria;
    delete criterias_to_save.antal_resultater;
    try {
      const response = await axios.post("/save_search/", {
        params: criterias_to_save,
      });
      // OBS gem respons in egen variabel i stedet for at bruge samme som til søgeresultat
      setResponse(response.data);
    } catch {
      // OBS gem respons in egen variabel i stedet for at bruge samme som til søgeresultat
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
        <Button type="submit" onClick={resetCriteria}>
          Reset
        </Button>
        <Button type="submit" onClick={gemFiltre}>
          Gem søgefiltre
        </Button>
        <ResultTable response={response} />
      </div>
      <div></div>
    </Router>
  );
}

{
  /*}
        <FilterComponent
          apiEndpoint="/api/ejendomstype-options/"
          label="Ejendomstype"
          valueKey="ejendomstype"
          displayKey="ejendomstype"
          selected_criteria={selected_criteria}
          onChange={(event) => {
            handleFilterChange(event);
            handleSelect(event);
          }}
        />
        <FilterComponent
          apiEndpoint="/api/landekode-options/"
          label="Landekode"
          valueKey="land"
          displayKey="land_navn"
          selected_criteria={selected_criteria}
          onChange={(event) => {
            handleFilterChange(event);
            handleSelect(event);
          }}
        />
        <FilterComponent
          apiEndpoint="/api/forurenet-options/"
          label="Forurenet"
          valueKey="forurenet"
          displayKey="forurenet"
          selected_criteria={selected_criteria}
          onChange={(event) => {
            handleFilterChange(event);
            handleSelect(event);
          }}
        />
        <FilterComponent
          apiEndpoint="/api/fk_brand-options/"
          label="Fk_brand"
          valueKey="fk_brand"
          displayKey="fk_brand"
          selected_criteria={selected_criteria}
          onChange={(event) => {
            handleFilterChange(event);
            handleSelect(event);
          }}
        />
        <FilterComponent
          apiEndpoint="/api/risikovurdering-options/"
          label="Risikovurdering"
          valueKey="risikovurdering"
          displayKey="risikovurdering"
          selected_criteria={selected_criteria}
          onChange={(event) => {
            handleFilterChange(event);
            handleSelect(event);
          }}
        />
        <FilterComponent
          apiEndpoint="/api/by-options/"
          label="By"
          valueKey="by"
          displayKey="by_navn"
          selected_criteria={selected_criteria}
          onChange={(event) => {
            handleFilterChange(event);
            handleSelect(event);
          }}
        />
        {*/
}

export default App;
