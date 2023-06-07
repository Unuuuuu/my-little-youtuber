"use client";

import Box from "@mui/material/Box";
import Main from "./Main";
import GameDisplayAd from "./GameDisplayAd";

export default function MainContainer() {
  return (
    <Box sx={{ flex: 1, px: "24px", display: "flex", flexDirection: "column" }}>
      <GameDisplayAd />
      <Main />
    </Box>
  );
}
