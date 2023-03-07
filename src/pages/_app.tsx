import { css, Global } from "@emotion/react";
import type { AppProps } from "next/app";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import localFont from "@next/font/local";
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
import LoginRequestSnackbar from "@/components/home/LoginRequestSnackbar";

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
    goldTrophy: "#E1D701",
    bronzeButton: "#964B00",
    silverButton: "#C0C0C0",
    goldButton: "#FFD700",
    diamondButton: "#D4F1F4",
    fire: red[600],
    tabsIndicator: grey["A700"],
  },
  typography: {
    fontFamily: pretendard.style.fontFamily,
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
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <Global styles={globalCss} />
        <Component {...pageProps} />
        <LoginRequestSnackbar />
      </Provider>
    </ThemeProvider>
  );
}
