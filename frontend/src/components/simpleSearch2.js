import React from "react";
import axios from "axios";
import { useState } from "react";
//import axios from "axios";

function SimpleSearch2() {

    const [response, setResponse] = useState("ingen søgning foretaget");
    const [selected_criteria, setCriteria] = useState([]);

    async function handleSearch() {
        try {
            //const request_object = Object.fromEntries(selected_criteria);
            const response = await axios.get('simple_search2/', {params: selected_criteria});
            setResponse(response.data);
        } catch {
            setResponse("request fejlet.. tag dig sammen amatør-udvikler")
        }
    }

    function handleSelectOLD(event) {
        const name = event.target.name;
        const value = event.target.value;

        if (value === "") {
            setCriteria([["",""]]); 
        } else {
            setCriteria([[name, value]]); 
        }
    }

    function handleSelect(event) {
        const name = event.target.name;
        const value = event.target.value;

        const new_criteria = {...selected_criteria};

        if (value == "") {
            delete new_criteria[name];
        } else {
            new_criteria[name] = value;
        }

        setCriteria(new_criteria);
    }

    return (
        <div>
            <h3>SS_2 risikovurdering</h3>
            <select name="ejendomstype_kode" value={selected_criteria.value} onChange={handleSelect} >
                <option value="">-</option>
                <option value="131">Parcelhus</option>
                <option value="132">Parcelhus med erhverv</option>
                <option value="135">Nedlagt landbrug</option>
                <option value="141">Ejerlejlighed</option>
                <option value="148">Hobbylandbrug 5-10 ha</option>
                <option value="9999">Test: ikke eksisterende værdi</option>
            </select>
            <select name="risikovurdering" value={selected_criteria.value} onChange={handleSelect} >
                <option value="">-</option>
                <option value="Normal ejendom">Normal ejendom</option>
                <option value="Øget risiko">Øget risiko</option>
                <option value="Begrænset risiko">Begrænset risiko</option>
                <option value="Ikke risikovurderet">Ikke risikovurderet</option>
            </select>

            <button type="submit" onClick={handleSearch}>søg</button>
            
            <p>valgt: {selected_criteria[0]} {selected_criteria[1]}</p>
            <p>søgeresultat: {response.response}</p>
        </div>
    )
    
  }

  export default SimpleSearch2;

