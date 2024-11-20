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
    <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  flexDirection="column"
  sx={{
    //backgroundColor: "#f5f5f5", // Background color for contrast  
    }}
>
  <Box
    width="80%" // Restrict the content width to make it centered
    sx={{
      textAlign: "left", // Left-align the text within this inner box
    }}
  >
    <Typography
      variant="h6"
      sx={{ fontWeight: "bold", color: "#0f1e82" }}
    >
      Ejendomme som matcher dine søgekriterier
    </Typography>
    <Typography
      variant="subtitle1"
      sx={{ marginBottom: 2 }}
    >
      {rows.length} resultater fundet
    </Typography>
    <Paper
      sx={{
        height: "auto",
        width: "100%", // Make the Paper span the full width of the inner container
        paddingInline: 2,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        sx={{ border: 0 }}
      />
    </Paper>
  </Box>
</Box>


  );
}

export default ResultTable;
