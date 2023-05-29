"use client";

import { notoSansKR } from "@/lib/fonts";
import { default as MuiButton, ButtonProps } from "@mui/material/Button";

export default function Button(props: ButtonProps) {
  const { sx, ...rest } = props;
  return (
    <MuiButton
      {...rest}
      disableElevation
      sx={{ fontFamily: notoSansKR.style.fontFamily, ...sx }}
      // sx={{ height: "48px", fontSize: "18px", borderRadius: "8px", ...sx }}
    />
  );
}
