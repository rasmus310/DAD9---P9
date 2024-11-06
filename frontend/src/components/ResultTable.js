import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SimpleSearch2 from "./simpleSearch2";

function ResultTable() {
  return (
    <div>
      <h4>Søgeresultat</h4>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(response[0]).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ResultTable;
