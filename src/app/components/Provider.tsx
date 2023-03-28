"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { store } from "@/lib/store";
import { Provider as ReduxProvider } from "react-redux";
import GlobalStyles from "@mui/material/GlobalStyles";
import localFont from "next/font/local";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepPurple, grey, red, yellow } from "@mui/material/colors";

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
    google: "#EA4335",
    youtube: "#FF0000",
    favorite: yellow[800],
    goldTrophy: "#ffd700",
    silverTrophy: "#c0c0c0",
    bronzeTrophy: "#cd7f32",
    fire: red[600],
  },
  typography: {
    fontFamily: pretendard.style.fontFamily,
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    // money: Palette["primary"];
    google: React.CSSProperties["color"];
    youtube: React.CSSProperties["color"];
    favorite: React.CSSProperties["color"];
    goldTrophy: React.CSSProperties["color"];
    silverTrophy: React.CSSProperties["color"];
    bronzeTrophy: React.CSSProperties["color"];
    fire: React.CSSProperties["color"];
  }

  interface PaletteOptions {
    // money: PaletteOptions["primary"];
    google: React.CSSProperties["color"];
    youtube: React.CSSProperties["color"];
    favorite: React.CSSProperties["color"];
    goldTrophy: React.CSSProperties["color"];
    silverTrophy: React.CSSProperties["color"];
    bronzeTrophy: React.CSSProperties["color"];
    fire: React.CSSProperties["color"];
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
          "*": {
            WebkitTapHighlightColor: "transparent", // for removing the highlight
          },
          body: {
            position: "absolute",
            inset: "0px",
            display: "flex",
            flexDirection: "column",
          },
          a: {
            color: "inherit",
            textDecoration: "none",
          },
          ul: {
            margin: 0,
            padding: 0,
            listStyle: "none",
          },
          "ins.adsbygoogle[data-ad-status='unfilled']": {
            display: "none !important",
          },
        }}
      />
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </ThemeProvider>
    </>
  );
}
