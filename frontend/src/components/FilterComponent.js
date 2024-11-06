// FilterComponent.js
import React, { useEffect, useState } from 'react';
import { MenuItem, Select, Typography } from "@mui/material"; //https://mui.com/x/introduction/


function FilterComponent({ apiEndpoint, label, valueKey, displayKey, onChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => setOptions(data))
      .catch(error => console.error('Error fetching options:', error));
  }, [apiEndpoint]);

  return (
    <div>
      <Typography variant="subtitle1" component="label" htmlFor={valueKey}>
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
    </div>
  );
}

export default FilterComponent;