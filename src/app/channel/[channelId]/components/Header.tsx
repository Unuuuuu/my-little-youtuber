"use client";

import Box from "@mui/material/Box";
import { useChannelContext } from "./ChannelContext";
import Typography from "@mui/material/Typography";
import CaretLeftIcon from "@/components/CaretLeftIcon";
import ShareIcon from "@/components/ShareIcon";
import Link from "next/link";

export default function Header() {
  const { channel } = useChannelContext();

  return (
    <Box
      component={"header"}
      sx={{
        px: "8px",
        height: "48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        borderBottom: `1px solid`,
        borderColor: "divider",
      }}
    >
      <Box component={Link} href="/" sx={{ display: "flex" }}>
        <CaretLeftIcon sx={{ fontSize: "48px" }} />
      </Box>
      <Typography noWrap>{channel.title}</Typography>
      <ShareIcon sx={{ fontSize: "48px" }} />
    </Box>
  );
}
