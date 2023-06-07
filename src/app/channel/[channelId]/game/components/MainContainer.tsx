"use client";

import Box from "@mui/material/Box";
import Ad from "./Ad";
import Main from "./Main";

export default function MainContainer() {
  return (
    <Box sx={{ flex: 1, px: "24px", display: "flex", flexDirection: "column" }}>
      <Ad />
      <Main />
    </Box>
  );
}
