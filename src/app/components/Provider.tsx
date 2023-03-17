"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { store } from "@/lib/store";
import { Provider as ReduxProvider } from "react-redux";
import localFont from "next/font/local";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const pretendard = localFont({
  src: "./PretendardVariable.woff2",
});

const theme = createTheme({
  typography: {
    fontFamily: pretendard.style.fontFamily,
  },
});

interface Props {
  children: React.ReactNode;
}

export default function Provider(props: Props) {
  const { children } = props;

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </ThemeProvider>
    </>
  );
}
