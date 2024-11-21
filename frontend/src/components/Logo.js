import React from "react";
import Nykredit_logo from "../Nykredit_logo.png";
import Valid_logo from "../Valid_logo.png";
import { Box } from "@mui/material";

function Logo() {
    return (
        <Box pt={15}>
        {/*    <img width={500} src={Valid_logo} alt="Valid logo" /> */}
        <img width={400} src={Nykredit_logo} alt="Nykredit logo" /> 
        </Box>
    );
    }

export default Logo;