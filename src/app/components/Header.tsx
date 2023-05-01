"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import MagnifyingGlassIcon from "./MagnifyingGlassIcon";
import CirclePlusIcon from "./CirclePlusIcon";

export default function Header() {
  return (
    <Box
      component={"header"}
      sx={{
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: "0 12px 0 24px",
      }}
    >
      <Box
        component={Link}
        href={"/"}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Box sx={{ width: 32, height: 32, bgcolor: "#d9d9d9" }} />
        <Typography variant="h2">나의 작은 유튜버</Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <MagnifyingGlassIcon
            sx={{
              color: "white",
              fontSize: "28px",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <CirclePlusIcon
            sx={{
              color: "white",
              fontSize: "28px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
