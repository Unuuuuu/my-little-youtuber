"use client";

import Box from "@mui/material/Box";
import Videos from "./Videos";
import Control from "./Control";

export default function Main() {
  return (
    <Box
      component={"main"}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Videos />
      <Control />
    </Box>
  );
}
