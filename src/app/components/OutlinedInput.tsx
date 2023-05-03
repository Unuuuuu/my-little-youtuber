"use client";

import {
  default as MuiOutlinedInput,
  OutlinedInputProps,
} from "@mui/material/OutlinedInput";
import { useFormControlContext } from "./FormControl";
import { grey } from "@mui/material/colors";
import { z } from "zod";

export default function OutlinedInput(props: OutlinedInputProps) {
  const { fontSize, ...rest } = useFormControlContext();

  return (
    <MuiOutlinedInput
      {...props}
      {...rest}
      autoComplete="off"
      fullWidth
      sx={{
        height: "48px",
        fontSize: `${fontSize}px`,
        fontWeight: 400,
        color: grey[900],
        bgcolor: z.string().min(1).safeParse(rest.value).success
          ? "white"
          : grey[100],
        "&:not(.Mui-error)": {
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: grey[200],
          },
          "&:hover": {
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: grey[900],
            },
          },
          "&.Mui-focused": {
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: grey[900],
            },
          },
        },
        "&.Mui-focused": {
          bgcolor: "white",
          ".MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
          },
        },
        "&.MuiInputBase-adornedEnd": {
          pr: "16px",
        },
        ".MuiOutlinedInput-input": {
          padding: `${(48 - fontSize) / 2}px 16px`,
          height: `${fontSize}px`,
        },
        ...props.sx,
      }}
    />
  );
}
