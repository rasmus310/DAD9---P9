import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Typography, Box } from "@mui/material"; //https://mui.com/material-ui/react-autocomplete/

function FilterComponent({
  apiEndpoint,
  label,
  valueKey,
  displayKey,
  onChange,
  selected_criteria,
  active,
}) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => setOptions(data))
      .catch((error) => console.error("Error fetching options:", error));
  }, [apiEndpoint]);

  if (!active) {
    return null; // Do not render if not active
  }

  return (
    <Box>
      <Autocomplete
        style={{ width: '230px' }}
        id={valueKey}
        options={options}
        getOptionLabel={(option) => option[displayKey] || ""}
        value={
          options.find(
            (option) => option[displayKey] === selected_criteria[valueKey]
          ) || null
        }
        onChange={(event, newValue) => {
          // Update the selected value
          onChange({
            target: {
              name: valueKey,
              value: newValue ? newValue[displayKey] : "",
            },
          });
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`${label}`}
            variant="outlined"
            fullWidth
          />
        )}
        isOptionEqualToValue={(option, value) =>
          option[displayKey] === value[displayKey]
        }
      />
    </Box>
  );
}

export default FilterComponent;
