"use client";

import {
  default as MuiInputLabel,
  InputLabelProps,
} from "@mui/material/InputLabel";
import { useFormControlContext } from "./FormControl";
import { grey } from "@/lib/colors";
import { z } from "zod";

export default function InputLabel(props: InputLabelProps) {
  const { fontSize, value } = useFormControlContext();
  const outlinedTransform =
    fontSize === 14
      ? "translate(12px, -6px) scale(0.86)"
      : "translate(14px, -6px) scale(0.75)";

  return (
    <MuiInputLabel
      {...props}
      sx={{
        fontSize: `${fontSize}px`,
        lineHeight: `${fontSize}px`,
        fontWeight: 400,
        color: grey[500],
        transform: z.string().min(1).safeParse(value).success
          ? outlinedTransform
          : "translate(16px, 16px) scale(1)",
        "&.Mui-focused": {
          color: grey[500],
          transform: outlinedTransform,
        },
        "&.Mui-error": {
          color: grey[500],
        },
        ".MuiFormLabel-asterisk": {
          color: "error.main",
        },
        ...props.sx,
      }}
    />
  );
}
