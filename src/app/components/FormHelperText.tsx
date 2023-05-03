"use client";

import { notoSansKR } from "@/lib/fonts";
import {
  default as MuiFormHelperText,
  FormHelperTextProps,
} from "@mui/material/FormHelperText";

export default function FormHelperText(props: FormHelperTextProps) {
  return (
    <MuiFormHelperText
      {...props}
      sx={{
        fontFamily: notoSansKR.style.fontFamily,
        lineHeight: "14px",
        mt: "4px",
        ...props.sx,
      }}
    />
  );
}
