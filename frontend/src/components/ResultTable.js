import React, { forwardRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Typography, Box } from "@mui/material";

// For auto-scrolling to the result table
const ResultTable = forwardRef(({ response }, ref) => {
  console.log("Response objektet", response);

  if (!response || !Array.isArray(response.response)) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography
          variant="subtitle1"
          textAlign="center"
          sx={{ marginBottom: 2 }}
        >
          Ingen resultater: Vil du lave en lave en ejendom med valgte
          kriterier??????
        </Typography>
      </Box>
    );
  }

  const rows = response.response;

  if (rows.length === 0) {
    return <Typography>Ingen resultater</Typography>;
  }
  // Denne varibel ændre navnene i kolonerne i tabellen
  const displayName = {
    id: "ID",
    ejendomstype_kode__ejendomstype: "Ejendomstype",
    land__land_navn: "Land",
    fk_brand: "Brandkode",
    forurenet: "Forurenet",
    bfe_nr: "BFE Nr",
    risikovurdering: "Risikovurdering",
    lokation__by_navn: "By",
    lokation__postnummer: "Postnummer",
  };

  const columns = Object.keys(rows[0]).map((key) => ({
    field: key,
    headerName: displayName[key] || key.charAt(0).toUpperCase() + key.slice(1), // Brug displaynavn eller det orignale navn fra model
    width: 150,
  }));

  return (
    <Box
      ref={ref}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box width="80%" sx={{ textAlign: "left" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#0f1e82", paddingTop: 2 }}
        >
          Ejendomme som matcher dine søgekriterier
        </Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
          {rows.length} resultater fundet
        </Typography>
        <Paper sx={{ height: "auto", width: "100%", paddingInline: 2 }}>
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
});

export default ResultTable;
