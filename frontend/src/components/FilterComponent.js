// FilterComponent.js
import React, { useEffect, useState } from 'react';

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
      <label htmlFor={valueKey}>{label}</label>
      <select id={valueKey} name={valueKey} onChange={onChange}>
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option[valueKey]}>
            {option[displayKey]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterComponent;