import { css, Global } from "@emotion/react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import localFont from "@next/font/local";

const pretendard = localFont({ src: "./PretendardVariable.ttf" });

const globalCss = css({
  "#__next": {
    position: "absolute",
    inset: "0px",
  },
});

const theme = createTheme({
  typography: {
    fontFamily: pretendard.style.fontFamily,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <Global styles={globalCss} />
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}
