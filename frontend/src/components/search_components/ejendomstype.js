import React from "react";
import { MenuItem, Select} from "@mui/material";

function Ejendomstype({selected_criteria, handleSelect}) {

    return (
        <div>
            <Select
            name="ejendomstype_kode__ejendomstype"
            value={selected_criteria["ejendomstype_kode__ejendomstype"] || ""}
            onChange={handleSelect}
            >
                <MenuItem value="">-</MenuItem>
                <MenuItem value="Parcelhus">Parcelhus</MenuItem>
                <MenuItem value="Parcelhus med erhverv">Parcelhus med erhverv</MenuItem>
                <MenuItem value="Nedlagt landbrug">Nedlagt landbrug</MenuItem>
                <MenuItem value="Ejerlejlighed">Ejerlejlighed</MenuItem>
                <MenuItem value="Hobbylandbrug 5-10 ha">Hobbylandbrug 5-10 ha</MenuItem>
                <MenuItem value="9999">Test: ikke eksisterende værdi</MenuItem>
            </Select>
        </div>
  );
}

export default Ejendomstype;


