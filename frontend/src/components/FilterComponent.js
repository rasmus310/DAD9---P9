import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material"; //https://mui.com/material-ui/react-autocomplete/
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function FilterComponent({
  apiEndpoint,
  label,
  valueKey,
  displayKey,
  onChange,
  selected_criteria,
  active,
  deactivateFilter,
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
    <Box
      sx={{
        display: "flex", // Flexbox layout
        justifyContent: "center", // Centrerer horisontalt
        alignItems: "center", // Centrerer vertikalt
      }}
    >
      <Autocomplete
        style={{ width: "230px" }}
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
      <IconButton aria-label="delete" size="small" sx={{ color: "#d1dded" }}>
        <DeleteIcon
          sx={{ fontSize: "20px" }} // Adjust the icon size here
          onClick={deactivateFilter}
        />
      </IconButton>
    </Box>
  );
}

export default FilterComponent;
