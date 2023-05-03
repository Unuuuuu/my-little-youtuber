"use client";

import {
  default as MuiFormControl,
  FormControlProps,
} from "@mui/material/FormControl";

import { createContext, useContext, useState } from "react";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

const FormControlContext = createContext<FormControlContextProps>({
  fontSize: 14,
});

export const useFormControlContext = () => {
  const value = useContext(FormControlContext);
  if (value === null) {
    throw new Error("Should be wrapped in form control context provider.");
  }
  return value;
};

interface FormControlContextProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Partial<ControllerRenderProps<TFieldValues, TName>> {
  fontSize: 14 | 16;
}

interface Props {
  formControlProps?: FormControlProps;
  formControlContextProps: FormControlContextProps;
  children?: React.ReactNode;
}

export default function FormControl(props: Props) {
  const { formControlContextProps, formControlProps, children } = props;
  const [innerValue, setInnerValue] = useState("");
  const value = formControlContextProps.value ?? innerValue;

  const handleChange: FormControlContextProps["onChange"] = (event) => {
    if (formControlContextProps.onChange != null) {
      formControlContextProps.onChange(event);
      return;
    }

    setInnerValue(event.target.value);
  };

  return (
    <FormControlContext.Provider
      value={{ ...formControlContextProps, value, onChange: handleChange }}
    >
      <MuiFormControl {...formControlProps} fullWidth>
        {children}
      </MuiFormControl>
    </FormControlContext.Provider>
  );
}
