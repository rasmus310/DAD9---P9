import React from "react";
import Nykredit_logo from "/Users/tobias/Documents/Kandidat/Nykredit/DAD9---P9/frontend/src/Nykredit_logo.png";
import { Box } from "@mui/material";

function Logo() {
    return (
        <Box pt={10}>
        <img width={400} src={Nykredit_logo} alt="Nykredit logo" />
        </Box>
    );
    }

export default Logo;