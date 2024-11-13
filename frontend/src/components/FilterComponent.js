import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import axios from 'axios';
import './FilterComponent.css';
 

function FilterComponent({ apiEndpoint, label, valueKey, displayKey, selected_criteria, onChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await axios.get(apiEndpoint);
        setOptions(response.data);
      } catch (error) {
        console.error(`Error fetching options from ${apiEndpoint}:`, error);
      }
    }
    fetchOptions();
  }, [apiEndpoint]);

  return (
    <Box position="relative" display="flex" alignItems="center" mb={2}>
      <Box flexGrow={1} padding={1}>
      <Autocomplete 
        className='boxstyle'
        options={options}
        getOptionLabel={(option) => option[displayKey]}
        value={options.find(option => option[valueKey] === selected_criteria[valueKey]) || null}
        onChange={(event, newValue) => {
          onChange({ target: { name: valueKey, value: newValue ? newValue[valueKey] : '' } });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            fullWidth
          />
        )}
      />
    </Box>
    </Box>
  );
}

export default FilterComponent;
