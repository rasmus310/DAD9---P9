import React from "react";
import { MenuItem, Select} from "@mui/material";

function Antal_resultater({selected_criteria, handleSelect}) {

    return (
        <div>
            <Select
                name="antal_resultater"
                value={selected_criteria["antal_resultater"] || ""}
                onChange={handleSelect}
            >
                <MenuItem value="">-</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="10">10</MenuItem>
            </Select>
        </div>
  );
}

export default Antal_resultater;

