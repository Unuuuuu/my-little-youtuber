"use client";

import { notoSansKR } from "@/lib/fonts";
import {
  default as MuiTextField,
  OutlinedTextFieldProps,
} from "@mui/material/TextField";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { z } from "zod";

export default function TextField(props: OutlinedTextFieldProps) {
  const { size, ...rest } = props;
  const [innerValue, setInnerValue] = useState("");
  const value = props.value ?? innerValue;

  const handleChange: OutlinedTextFieldProps["onChange"] = (event) => {
    if (props.onChange != null) {
      props.onChange(event);
      return;
    }

    setInnerValue(event.target.value);
  };

  let fontSize = 14;
  let outlinedTransform = "translate(12px, -6px) scale(0.86)";
  switch (size) {
    case "small":
      fontSize = 14;
      outlinedTransform = "translate(12px, -6px) scale(0.86)";
      break;
    case "medium":
      fontSize = 16;
      outlinedTransform = "translate(14px, -6px) scale(0.75)";
      break;
  }

  return (
    <MuiTextField
      {...rest}
      onChange={handleChange}
      fullWidth
      autoComplete="off"
      sx={{
        ".MuiInputLabel-root": {
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
        },
        ".MuiOutlinedInput-root": {
          height: "48px",
          fontSize: `${fontSize}px`,
          fontWeight: 400,
          color: grey[900],
          bgcolor: z.string().min(1).safeParse(value).success
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
        },
        ".MuiFormHelperText-root": {
          fontFamily: notoSansKR.style.fontFamily,
          lineHeight: "14px",
          mt: "4px",
        },
        ...props.sx,
      }}
    />
  );
}
