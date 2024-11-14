import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Typography } from "@mui/material";

function ResultTable({ response }) {
  console.log("Response objektet", response);

  if (!response || !Array.isArray(response.response)) {
    return <Typography>No results</Typography>;
  }
  // Extract rows from response
  const rows = response.response;

  if (rows.length === 0) {
    return <Typography>No results</Typography>;
  }

  // Define columns based on the keys in the first data object
  const columns = Object.keys(rows[0]).map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    width: 150,
  }));

  console.log("rows and columns", rows, columns);

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default ResultTable;
