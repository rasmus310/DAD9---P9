import React from "react";
import axios from "axios";
import { useState } from "react";
import Button from "@mui/material/Button";
import { MenuItem, Select, Typography } from "@mui/material";

function SimpleSearch2() {
  const [response, setResponse] = useState("");
  const [selected_criteria, setCriteria] = useState([]);
  //const [selected_criteria, setCriteria] = useState({});

  async function handleSearch() {
    try {
      const response = await axios.get("simple_search2/", {
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

    const new_criteria = { ...selected_criteria };

    if (value == "") {
      delete new_criteria[name];
    } else {
      new_criteria[name] = value;
    }

    setCriteria(new_criteria);
  }

  function resetCriteria(event) {
    setCriteria({});
  }

  return (
    <div>
      <h3>V0.2 multiple søgekriterier i dynamisk genereret søgning</h3>
      <p>Ejendomstype</p>
      <Select
        name="ejendomstype_kode__ejendomstype"
        value={selected_criteria["ejendomstype_kode__ejendomstype"] || ""}
        onChange={handleSelect}
      >
        <MenuItem value="">-</MenuItem>
        <MenuItem value="Parcelhus">Parcelhus</MenuItem>
        <MenuItem value="Parcelhus med erhverv">Parcelhus med erhverv</MenuItem>
        <MenuItem value="Nedlagt landbrug">Nedlagt landbrug</MenuItem>
        <MenuItem value="Ejerlejlighed">Ejerlejlighed</MenuItem>
        <MenuItem value="Hobbylandbrug 5-10 ha">Hobbylandbrug 5-10 ha</MenuItem>
        <MenuItem value="9999">Test: ikke eksisterende værdi</MenuItem>
      </Select>
      <p>Risikovurdering</p>
      <Select
        name="risikovurdering"
        value={selected_criteria["risikovurdering"] || ""}
        onChange={handleSelect}
      >
        <MenuItem value="">-</MenuItem>
        <MenuItem value="Normal ejendom">Normal ejendom</MenuItem>
        <MenuItem value="Øget risiko">Øget risiko</MenuItem>
        <MenuItem value="Begrænset risiko">Begrænset risiko</MenuItem>
        <MenuItem value="Ikke risikovurderet">Ikke risikovurderet</MenuItem>
      </Select>
      <p>FK_BRAND</p>
      <Select
        name="fk_brand"
        value={selected_criteria["fk_brand"] || ""}
        onChange={handleSelect}
      >
        <MenuItem value="">-</MenuItem>
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
      </Select>
      <p>Postnummer</p>
      <input
        name="lokation__postnummer"
        value={selected_criteria["lokation__postnummer"] || ""}
        type="text"
        placeholder="Search"
        onChange={handleSelect}
      />
      
      <p>Antal ønskede resultater</p>
      <Select
        name="antal_resultater"
        value={selected_criteria["antal_resultater"] || ""}
        onChange={handleSelect}
      >
        <MenuItem value="">-</MenuItem>
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="5">5</MenuItem>
        <MenuItem value="10">10</MenuItem>
      </Select>
      <p></p>
      <Button type="submit" onClick={handleSearch}>
        søg
      </Button>
      <Button type="submit" onClick={resetCriteria}>
        Reset
      </Button>

      <div>
        <Typography> søgeresultat: {JSON.stringify(response)}</Typography>
      </div>
    </div>
  );
}

export default SimpleSearch2;
