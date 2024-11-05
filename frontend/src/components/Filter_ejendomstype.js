import React, { useEffect, useState } from 'react';

function Filter_ejendomstype() {
  const [ejendomstypeOptions, setEjendomstypeOptions] = useState([]);

  useEffect(() => {
    // Fetch data from the Django API endpoint
    fetch('/api/ejendomstype-options/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Log the fetched data
        setEjendomstypeOptions(data);
      })
      .catch(error => {
        console.error("Error fetching ejendomstype options:", error);
      });
  }, []);

  return (
    <div>
      <h1>Select Ejendomstype</h1>
      <label htmlFor="ejendomstype">Choose Ejendomstype:</label>
      <select id="ejendomstype" name="ejendomstype">
        {ejendomstypeOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter_ejendomstype;