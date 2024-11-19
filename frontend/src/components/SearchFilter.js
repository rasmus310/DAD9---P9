import React, { useState } from "react";
import { Autocomplete, TextField, Box, Typography } from "@mui/material";

function SearchFilter({ onFilterToggle }) {
  const options = [
    { label: "Ejendomstype", value: "ejendomstype_kode__ejendomstype" },
    { label: "Landekode", value: "land__land_navn" },
    { label: "Forurenet", value: "forurenet" },
    { label: "Brand", value: "fk_brand" },
    { label: "Risikovurdering", value: "risikovurdering" },
    { label: "By", value: "lokation__by_navn" },
    { label: "Postnummer", value: "postnummer" },
  ];

  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <Box p={8}>
      <Autocomplete
        id="autocomplete"
        options={options}
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
            label="Søg på filter"
            variant="outlined"
            fullWidth
          />
        )}
        style={{ width: 600, display: 'inline-block' }}
      />
    </Box>
  );
}

export default SearchFilter;