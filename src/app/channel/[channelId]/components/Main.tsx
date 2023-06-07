"use client";

import Box from "@mui/material/Box";
import About from "./About";
import Ranking from "./Ranking";

export default function Main() {
  return (
    <Box
      component={"main"}
      sx={{
        maxWidth: "598px",
        margin: "0 auto",
        minHeight: "calc(100vh - 56px - 166px)",
      }}
    >
      <About />
      <Ranking />
    </Box>
  );
}
