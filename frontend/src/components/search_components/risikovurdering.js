import React from "react";
import { MenuItem, Select} from "@mui/material";

function Risikovurdering({selected_criteria, handleSelect}) {

    return (
        <div>
            <Select
            name="risikovurdering"
            value={selected_criteria["risikovurdering"] || ""}
            onChange={handleSelect}
            >
            <MenuItem value="">-</MenuItem>
            <MenuItem value="Normal ejendom">Normal ejendom</MenuItem>
            <MenuItem value="Øget risiko">Øget risiko</MenuItem>
            <MenuItem value="Begrænset risiko">Begrænset risiko</MenuItem>
            <MenuItem value="Ikke risikovurderet">Ikke risikovurderet</MenuItem>
        </Select>
        </div>
  );
}

export default Risikovurdering;
