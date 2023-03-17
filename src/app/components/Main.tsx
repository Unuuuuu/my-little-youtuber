"use client";

import Box from "@mui/material/Box";

interface Props {
  children: React.ReactNode;
}

export default function Main(props: Props) {
  const { children } = props;

  return (
    <Box component={"main"} sx={{ mt: "56px" }}>
      {children}
    </Box>
  );
}
