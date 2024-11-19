import React, { useState } from "react";
import { Autocomplete, TextField, Box, Typography } from "@mui/material";

function SearchFilter() {
    const options = [
        { label: "Ejendomstype", value: "Ejendomstype" },
        { label: "Landekode", value: "Landekode" },
        { label: "Forurenet", value: "Forurenet" },
        { label: "Brand", value: "Brand" },
        { label: "Risikovurdering", value: "Risikovurdering" },
        { label: "By", value: "By" },
        { label: "Postnummer", value: "Postnummer" },
    ];

    const [inputValue, setInputValue] = React.useState("");
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
    )
}

export default SearchFilter;