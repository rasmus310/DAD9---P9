import React from 'react';
import { TextField, Autocomplete } from '@mui/material';

const options = [
  { label: 'Ejendomstype', value: 'ejendomstype' },
  { label: 'Landekode', value: 'landekode' },
  { label: 'Forurening', value: 'forurenet' },
  { label: 'Risikovurdering', value: 'risikovurdering' },
];

export default function SearchableDropdown({ toggleEjendomstype, toggleLandekode, toggleForurening, toggleRisikovurdering }) {
  const handleChange = (event, newValue) => {
    if (newValue) {
      if (newValue.value === 'ejendomstype') {
        toggleEjendomstype();
      } else if (newValue.value === 'landekode') {
        toggleLandekode();
      } else if (newValue.value === 'forurenet') {
        toggleForurening();
      } else if (newValue.value === 'risikovurdering') {
        toggleRisikovurdering();
    }}
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

