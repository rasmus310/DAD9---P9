import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Typography, Box } from "@mui/material";

function ResultTable({ response }) {
  console.log("Response objektet", response);

  if (!response || !Array.isArray(response.response)) {
    return <Typography>Ingen resultater</Typography>;
  }
  // Extract rows from response
  const rows = response.response;

  if (rows.length === 0) {
    return <Typography>Ingen resultater</Typography>;
  }

  // Define columns based on the keys in the first data object
  const columns = Object.keys(rows[0]).map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    width: 150,
  }));

  console.log("rows and columns", rows, columns);

  return (
    <Box>
      <Typography variant="h6" textAlign={"left"} sx={{ fontWeight: 'bold', color: '#0f1e82' }}>
        Ejendomme som matcher dine søgekriterier
      </Typography>
      <Typography variant="subtitle1" textAlign={"left"} sx={{ marginBottom: 2 }}>
        {rows.length} resultater fundet
      </Typography>
      <Paper sx={{ height: 'auto', width: "100%", paddingInline: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
}

export default ResultTable;
