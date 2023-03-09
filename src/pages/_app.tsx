import { css, Global } from "@emotion/react";
import type { AppProps } from "next/app";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@/utils/firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  common,
  deepPurple,
  green,
  grey,
  red,
  yellow,
} from "@mui/material/colors";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/utils/firebase";
import { userActions } from "@/redux/slices/userSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import LoginRequestSnackbar from "@/components/common/LoginRequestSnackbar";
import Script from "next/script";
import KakaotalkGuideModal from "@/components/common/KakaotalkGuideModal";

const globalCss = css({
  "#__next": {
    position: "absolute",
    inset: "0px",
  },
  "*": {
    WebkitTapHighlightColor: "transparent", // for removing the highlight
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
});

const theme = createTheme({
  palette: {
    primary: {
      main: grey[700],
    },
    secondary: {
      main: deepPurple[300],
    },
    money: {
      main: green["400"],
      contrastText: common.white,
    },
    brand: deepPurple[300],
    google: "#EA4335",
    youtube: "#FF0000",
    favorite: yellow[800],
    bronzeTrophy: "#cd7f32",
    silverTrophy: "#c0c0c0",
    goldTrophy: "#ffd700",
    bronzeButton: "#964B00",
    silverButton: "#C0C0C0",
    goldButton: "#FFD700",
    diamondButton: "#D4F1F4",
    fire: red[600],
    tabsIndicator: grey["A700"],
  },
  typography: {
    fontFamily: [
      "Pretendard Variable",
      "Pretendard",
      "-apple-system",
      "BlinkMacSystemFont",
      "system-ui",
      "Roboto",
      "Helvetica Neue",
      "Segoe UI",
      "Apple SD Gothic Neo",
      "Noto Sans KR",
      "Malgun Gothic",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "sans-serif",
    ].join(","),
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    money: Palette["primary"];
    brand: React.CSSProperties["color"];
    google: React.CSSProperties["color"];
    youtube: React.CSSProperties["color"];
    favorite: React.CSSProperties["color"];
    bronzeTrophy: React.CSSProperties["color"];
    silverTrophy: React.CSSProperties["color"];
    goldTrophy: React.CSSProperties["color"];
    bronzeButton: React.CSSProperties["color"];
    silverButton: React.CSSProperties["color"];
    goldButton: React.CSSProperties["color"];
    diamondButton: React.CSSProperties["color"];
    fire: React.CSSProperties["color"];
    tabsIndicator: React.CSSProperties["color"];
  }

  interface PaletteOptions {
    money: PaletteOptions["primary"];
    brand: React.CSSProperties["color"];
    google: React.CSSProperties["color"];
    youtube: React.CSSProperties["color"];
    favorite: React.CSSProperties["color"];
    bronzeTrophy: React.CSSProperties["color"];
    silverTrophy: React.CSSProperties["color"];
    goldTrophy: React.CSSProperties["color"];
    bronzeButton: React.CSSProperties["color"];
    silverButton: React.CSSProperties["color"];
    goldButton: React.CSSProperties["color"];
    diamondButton: React.CSSProperties["color"];
    fire: React.CSSProperties["color"];
    tabsIndicator: React.CSSProperties["color"];
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    money: true;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const { photoURL, uid, displayName, email } = user;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        let favoriteChannels: string[];
        if (docSnap.exists()) {
          favoriteChannels = docSnap.data().favoriteChannels;
        } else {
          setDoc(docRef, {
            id: uid,
            displayName,
            email,
            favoriteChannels: [],
          });
          favoriteChannels = [];
        }

        store.dispatch(userActions.signIn({ photoURL, uid, favoriteChannels }));
      } else {
        // User is signed out
        store.dispatch(userActions.signOut());
      }
    });
  }, []);

  return (
    <>
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4440044743501222"
        crossOrigin="anonymous"
      />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <Global styles={globalCss} />
          <Component {...pageProps} />
          <LoginRequestSnackbar />
          <KakaotalkGuideModal />
        </Provider>
      </ThemeProvider>
    </>
  );
}
