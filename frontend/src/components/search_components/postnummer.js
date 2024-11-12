import React from "react";
import { MenuItem, Select} from "@mui/material";

function Postnummer({selected_criteria, handleSelect}) {

    return (
        <div>
            <input
                name="lokation__postnummer"
                value={selected_criteria["lokation__postnummer"] || ""}
                type="text"
                placeholder="postnummer"
                onChange={handleSelect}
            />
        </div>
  );
}

export default Postnummer;
