"use client";

import { CssBaseline } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

export default function Provider(props: Props) {
  const { children } = props;

  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
}
