"use client";

import Box from "@mui/material/Box";

interface Props {
  children: React.ReactNode;
}

export default function Main(props: Props) {
  const { children } = props;

  return (
    <Box
      component={"main"}
      sx={{
        flex: 1,
        overflowY: "scroll",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
}
