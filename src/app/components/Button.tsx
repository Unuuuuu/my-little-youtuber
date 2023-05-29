"use client";

import { default as MuiButton, ButtonProps } from "@mui/material/Button";

export default function Button(props: ButtonProps) {
  // const { sx, ...rest } = props;
  return (
    <MuiButton
      {...props}
      disableElevation
      // sx={{ height: "48px", fontSize: "18px", borderRadius: "8px", ...sx }}
    />
  );
}
