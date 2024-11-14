import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Typography } from "@mui/material"; //https://mui.com/material-ui/react-autocomplete/

function FilterComponent({
  apiEndpoint,
  label,
  valueKey,
  displayKey,
  onChange,
  selected_criteria,
}) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => setOptions(data))
      .catch((error) => console.error("Error fetching options:", error));
  }, [apiEndpoint]);

  return (
    <div>
      <Typography variant="subtitle1" component="label" htmlFor={valueKey}>
        {label}
      </Typography>
      <Autocomplete
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
            label={`Select ${label}`}
            variant="outlined"
            fullWidth
          />
        )}
        isOptionEqualToValue={(option, value) =>
          option[displayKey] === value[displayKey]
        }
      />
    </div>
  );
}

export default FilterComponent;

