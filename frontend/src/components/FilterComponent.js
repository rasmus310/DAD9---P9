// FilterComponent.js
import React, { useEffect, useState } from 'react';
import './FilterComponent.css';
import { MenuItem, Select, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function FilterComponent({ apiEndpoint, label, valueKey, displayKey, onChange, onClose }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => setOptions(data))
      .catch(error => console.error('Error fetching options:', error));
  }, [apiEndpoint]);

  return (
    <Box className="text-align-left">
      <Typography variant="subtitle2" component="label" htmlFor={valueKey}>
        {label}
      </Typography>
      <Select
        id={valueKey}
        name={valueKey}
        onChange={onChange}
        displayEmpty
        fullWidth
      >
        <MenuItem value="">
          <em>Select {label}</em>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option[valueKey]}>
            {option[displayKey]}
          </MenuItem>
        ))}
      </Select>
      <Box className="closeIcon">
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
      </Box>
    </Box>
  );
}

export default FilterComponent;