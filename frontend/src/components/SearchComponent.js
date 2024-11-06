import React from 'react';
import { TextField, Autocomplete } from '@mui/material';

const options = [
  { label: 'Ejendomstype', value: 'ejendomstype' },
  { label: 'Landekode', value: 'landekode' },
];

export default function SearchableDropdown({ toggleEjendomstype, toggleLandekode }) {
  const handleChange = (event, newValue) => {
    if (newValue) {
      if (newValue.value === 'ejendomstype') {
        toggleEjendomstype();
      } else if (newValue.value === 'landekode') {
        toggleLandekode();
      }
    }
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Vælg filter"
          variant="outlined"
        />
      )}
      onChange={handleChange}
    />
  );
}

