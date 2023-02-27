import { css, Global } from "@emotion/react";
import type { AppProps } from "next/app";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import localFont from "@next/font/local";
import "@/utils/firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const pretendard = localFont({
  src: [
    {
      path: "./Pretendard-Light.subset.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

const globalCss = css({
  "#__next": {
    position: "absolute",
    inset: "0px",
  },
  a: {
    color: "inherit",
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
