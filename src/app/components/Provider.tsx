"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { store } from "@/lib/store";
import { Provider as ReduxProvider } from "react-redux";
import GlobalStyles from "@mui/material/GlobalStyles";
import localFont from "next/font/local";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepPurple, grey } from "@mui/material/colors";

const pretendard = localFont({
  src: "./PretendardVariable.woff2",
});

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[300],
    },
    secondary: {
      main: grey[700],
    },
    brand: deepPurple[300],
    google: "#EA4335",
  },
  typography: {
    fontFamily: pretendard.style.fontFamily,
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    brand: React.CSSProperties["color"];
    google: React.CSSProperties["color"];
  }

  interface PaletteOptions {
    brand: React.CSSProperties["color"];
    google: React.CSSProperties["color"];
  }
}

interface Props {
  children: React.ReactNode;
}

export default function Provider(props: Props) {
  const { children } = props;

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          a: {
            color: "inherit",
            textDecoration: "none",
          },
          ul: {
            margin: 0,
            padding: 0,
            listStyle: "none",
          },
        }}
      />
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </ThemeProvider>
    </>
  );
}
