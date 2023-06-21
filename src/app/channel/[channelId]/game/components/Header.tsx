"use client";

import Box from "@mui/material/Box";
import { useChannelContext } from "./ChannelContext";
import Typography from "@mui/material/Typography";
import CaretLeftIcon from "@/components/CaretLeftIcon";
import Link from "next/link";
import { grey } from "@/lib/colors";

export default function Header() {
  const {
    channel: { id, title },
  } = useChannelContext();

  return (
    <Box
      component={"header"}
      sx={{
        flexShrink: 0,
        px: "8px",
        height: "56px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        borderBottom: `1px solid`,
        borderColor: "divider",
      }}
    >
      <Box
        component={Link}
        href={`/channel/${id}`}
        sx={{
          display: "flex",
          width: "48px",
          height: "48px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CaretLeftIcon sx={{ fontSize: "32px", stroke: grey[700] }} />
      </Box>
      <Typography noWrap>{title}</Typography>
      <Box
        sx={{
          display: "flex",
          width: "48px",
          height: "48px",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
}
