// FilterComponent.js
import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import './FilterComponent.css'; // Import the CSS file
import { MenuItem, Select, Typography, Box, Autocomplete, IconButton } from "@mui/material"; //https://mui.com/x/introduction/

function FilterComponent({
  apiEndpoint,
  label,
  valueKey,
  displayKey,
  onChange,
  onClose,
  TextField,
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
    <Box className='placement' mb={2}>
      <Box flexGrow={1}>
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
      <IconButton onClick={onClose}>
        <CloseIcon sx={{ fontSize: 12 }} />
      </IconButton>
    </Box>
  );
}

export default FilterComponent;
