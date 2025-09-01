import React, { forwardRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Typography, Box } from "@mui/material";

// ResultTable viser søgeresultater i en MUI DataGrid.
// Den bruger forwardRef, så forældre-komponenten kan scrolle hertil (auto-scroll).
const ResultTable = forwardRef(({ response }, ref) => {
  console.log("Response objektet", response);

  // Vis en neutral besked, hvis der ikke er data endnu
  // eller hvis payload ikke har det forventede felt 'response' (liste af rækker).
  if (!response || !Array.isArray(response.response)) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography
          variant="subtitle1"
          textAlign="center"
          sx={{ marginBottom: 2 }}
        >
          Ingen resultater
        </Typography>
      </Box>
    );
  }

  // Backend-svaret forventes at have en property 'response' med rækker til tabellen
  const rows = response.response;

  // Hvis der er en gyldig struktur men ingen rækker, vis en "ingen resultater" besked
  if (rows.length === 0) {
    return <Typography>Ingen resultater</Typography>;
  }

  // Mapping til menneskelige kolonnenavne for kendte felter
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

  // Generér DataGrid-kolonner dynamisk ud fra nøglerne i første række
  // Fald tilbage til at formatere nøglens første bogstav som stort, hvis ikke i displayName
  const columns = Object.keys(rows[0]).map((key) => ({
    field: key,
    headerName: displayName[key] || key.charAt(0).toUpperCase() + key.slice(1),
    width: 150,
  }));

  return (
    // Wrapper: centreret layout og ref som scroll-anker
    <Box
      ref={ref}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {/* Indercontainer med venstrestillet titel og tabel */}
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
        {/* Paper-indpakning for visuel kort-stil omkring DataGrid */}
        <Paper sx={{ height: "auto", width: "100%", paddingInline: 2 }}>
          {/* DataGrid: tabelkomponent fra MUI */}
          <DataGrid
            rows={rows}
            columns={columns}
            // Sikrer stabil unik nøgle pr. række (kræver at hver række har 'id')
            getRowId={(row) => row.id}
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </Box>
  );
});

export default ResultTable;
