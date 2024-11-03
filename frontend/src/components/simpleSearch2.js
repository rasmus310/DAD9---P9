import React from "react";
import axios from "axios";
import { useState } from "react";
//import axios from "axios";

function SimpleSearch2() {

    const [response, setResponse] = useState("ingen søgning foretaget");
    const [selected_criteria, set_criteria] = useState([{name:"", value: ""}]);

    async function handleClick() {
        try {
            const response = await axios.get('simple_search2/', {params: {filter : selected_criteria}});
            setResponse(response.data);
        } catch {
            setResponse("request fejlet.. tag dig sammen amatør-udvikler")
        }
    }

    function handleSelect(event) {
        const name = event.target.name;
        const value = event.target.value;

        if (value === "") {
            set_criteria({ name: "", value: "" }); 
        } else {
            set_criteria({ name, value }); 
        }
    }

    return (
        <div>
            <h3>SS_2 risikovurdering</h3>
            <select name="risikovurdering" value={selected_criteria.value} onChange={handleSelect} >
                <option value="">-</option>
                <option value="Normal ejendom">Normal ejendom</option>
                <option value="Øget risiko">Øget risiko</option>
                <option value="Begrænset risiko">Begrænset risiko</option>
                <option value="Ikke risikovurderet">Ikke risikovurderet</option>
            </select>

            <button type="submit" onClick={handleClick}>søg</button>
            
            <p>valgt: {selected_criteria.name} {selected_criteria.value}</p>
            <p>søgeresultat: {response.response}</p>
        </div>
    )
    
  }

  export default SimpleSearch2;

