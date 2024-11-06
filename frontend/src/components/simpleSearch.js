import React from "react";
import axios from "axios";
import { useState } from "react";
//import axios from "axios";

function SimpleSearch() {

    const [response, setResponse] = useState("ingen søgning foretaget");
    const [selected_criteria, setCriteria] = useState("");


    async function handleSearch() {
        try {
            const response = await axios.get('simple_search/', {params: {filter : selected_criteria}});
            setResponse(response.data);
        } catch {
            setResponse("request fejlet.. tag dig sammen amatør-udvikler")
        }
    }

    function handleSelect(event) {
        setCriteria(event.target.value);
    }

    return (
        <div>
            <h3>simple search ejendomstype</h3>
            <select name="ejendomstype" value={selected_criteria.value} onChange={handleSelect} >
                <option value="">-</option>
                <option value="131">Parcelhus</option>
                <option value="132">Parcelhus med erhverv</option>
                <option value="135">Nedlagt landbrug</option>
                <option value="141">Ejerlejlighed</option>
                <option value="148">Hobbylandbrug 5-10 ha</option>
                <option value="9999">Test: ikke eksisterende værdi</option>
            </select>

            <button type="submit" onClick={handleSearch}>søg</button>
            
            <p>valgt: {selected_criteria}</p>
            <p>søgeresultat: {response.response.id}</p>
            
        
        </div>
    )
    
  }

  export default SimpleSearch;

