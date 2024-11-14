import React from "react";
import { MenuItem, Select} from "@mui/material";

function Fkbrand({selected_criteria, handleSelect}) {

    return (
        <div>
            <Select
                name="fk_brand"
                value={selected_criteria["fk_brand"] || ""}
                onChange={handleSelect}
                >
                <MenuItem value="">-</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
            </Select>
        </div>
  );
}

export default Fkbrand;

