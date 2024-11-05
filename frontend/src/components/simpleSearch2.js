import React from "react";
import axios from "axios";
import { useState } from "react";
//import axios from "axios";

function SimpleSearch2() {

    const [response, setResponse] = useState("");
    const [selected_criteria, setCriteria] = useState([]);
    //const [selected_criteria, setCriteria] = useState({});

    async function handleSearch() {
        try {
            const response = await axios.get('simple_search2/', {params: selected_criteria});
            setResponse(response.data);
        } catch {
            setResponse({ ejendomsID: null, antal_matches: "request fejlet.. tag dig sammen amatør-udvikler" });
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
            <h3>V0.2 multiple søgekriterier i dynamisk genereret søgning</h3>
            <p>Ejendomstype</p>
            <select name="ejendomstype_kode__ejendomstype_kode" value={selected_criteria["ejendomstype_kode__ejendomstype_kode"]||""} onChange={handleSelect} >
                <option value="">-</option>
                <option value="131">Parcelhus</option>
                <option value="132">Parcelhus med erhverv</option>
                <option value="135">Nedlagt landbrug</option>
                <option value="141">Ejerlejlighed</option>
                <option value="148">Hobbylandbrug 5-10 ha</option>
                <option value="9999">Test: ikke eksisterende værdi</option>
            </select>
            <p>Risikovurdering</p>
            <select name="risikovurdering" value={selected_criteria["risikovurdering"]||""} onChange={handleSelect} >
                <option value="">-</option>
                <option value="Normal ejendom">Normal ejendom</option>
                <option value="Øget risiko">Øget risiko</option>
                <option value="Begrænset risiko">Begrænset risiko</option>
                <option value="Ikke risikovurderet">Ikke risikovurderet</option>
            </select>
            <p>FK_BRAND</p>
            <select name="fk_brand" value={selected_criteria["fk_brand"]||""} onChange={handleSelect} >
                <option value="">-</option>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
            <p>Postnummer</p>
            <input name="lokation__postnummer" value={selected_criteria["lokation__postnummer"]||""} type="text" placeholder="Search" onChange={handleSelect}/>
            
            <p>søg</p>
    
            <button type="submit" onClick={handleSearch}>søg</button>
            
            <div>
                <p>søgeresultat: {response.response}</p>  
            </div>
            
        </div>
    )
    
  }

  export default SimpleSearch2;

