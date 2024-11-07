// FilterComponent.js
import React, { useEffect, useState } from "react";
import { MenuItem, Select, Typography, Box, IconButton, Autocomplete, TextField } from "@mui/material"; // Import necessary components
import CloseIcon from '@mui/icons-material/Close';
import './FilterComponent.css'; // Import the CSS file

function FilterComponent({
  apiEndpoint,
  label,
  valueKey,
  displayKey,
  onChange,
  onClose
}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => setOptions(data))
      .catch((error) => console.error("Error fetching options:", error));
  }, [apiEndpoint]);

  const handleChange = (event, newValue) => {
    if (newValue) {
      onChange({ target: { name: valueKey, value: newValue[valueKey] } });
    }
  };

  return (
    <Box position="relative" display="flex" alignItems="center" mb={2}>
      <Box flexGrow={1} padding={1}>
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option[displayKey]}
          renderInput={(params) => (
            <TextField
              {...params}
              label={`${label}`}
              variant="outlined"
              fullWidth
            />
          )}
          onChange={handleChange}
          style={{ minWidth: '250px' }}
        />
      </Box>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 12,
          right: -2,
          transform: 'translate(50%, -50%)',
          color: '#FF0000',
        }}
      >
        <CloseIcon sx={{ fontSize: 12 }} />
      </IconButton>
    </Box>
  );
}

export default FilterComponent;
