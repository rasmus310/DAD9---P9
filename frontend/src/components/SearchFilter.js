import React, { useState } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";

// Her viser/skuler vi filtre based på onFilterToggle
// SearchFilter er en react komponent, der tager to props: activeFilters og onFilterToggle
function SearchFilter({ activeFilters, onFilterToggle }) {
  const options = [
    // "options" er en liste over objekter, hvor hvert objekt repræsenterer en filtreringsmulighed
    { label: "Ejendomstype", value: "ejendomstype_kode__ejendomstype" },
    { label: "Landekode", value: "land__land_navn" },
    { label: "Forurenet", value: "forurenet" },
    { label: "Brand", value: "fk_brand" },
    { label: "Risikovurdering", value: "risikovurdering" },
    { label: "By", value: "lokation__by_navn" },
    { label: "Postnummer", value: "lokation__postnummer" },
  ];

  // "inputValue" holder styr på den aktuelle værdi i UI'ens tekstfelt
  const [inputValue, setInputValue] = useState("");
  // "selectedValue" holder styr på den aktuelle valgte værdi i UI'ens dropdown
  const [selectedValue, setSelectedValue] = useState(null);

  // Hold styr på de filtreringsmuligheder, der ikke er aktive (som kan vælges i dropdown)
  const filteredOptions = options.filter(option => !activeFilters.includes(option.value));

  // Frontend stuff for søgefilteret
  return (
    <Box p={8}>
      <Autocomplete
        id="autocomplete"
        options={filteredOptions}
        getOptionLabel={(option) => option.label}
        value={selectedValue}
        onChange={(event, newValue) => {
          setSelectedValue(newValue);
          if (newValue) {
            onFilterToggle(newValue.value); // Call the handler with the selected value
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Vælg søgekriterier"
            variant="outlined"
            fullWidth
          />
        )}
        style={{ width: 660, display: 'inline-block' }}
      />
    </Box>
  );
}

export default SearchFilter;