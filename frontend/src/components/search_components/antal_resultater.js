import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import './antal_resultater.css';

function AntalResultater({ selected_criteria, handleSelect }) {
  const options = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '5', value: '5' },
    { label: '10', value: '10' },
  ];

  return (
    <Autocomplete className='boxstyle'
      options={options}
      getOptionLabel={(option) => option.label}
      value={options.find(option => option.value === selected_criteria["antal_resultater"]) || null}
      onChange={(event, newValue) => {
        handleSelect({ target: { name: 'antal_resultater', value: newValue ? newValue.value : '' } });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Antal resultater"
          variant="outlined"
        />
      )}
    />
  );
}

export default AntalResultater;

