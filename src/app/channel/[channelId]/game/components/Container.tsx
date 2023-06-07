"use client";

import Box from "@mui/material/Box";

interface Props {
  children: React.ReactNode;
}

export default function Container(props: Props) {
  const { children } = props;

  return (
    <Box
      sx={{
        position: "absolute",
        inset: "0px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
}
