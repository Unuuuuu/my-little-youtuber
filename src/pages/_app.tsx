import { css, Global } from "@emotion/react";
import type { AppProps } from "next/app";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import localFont from "@next/font/local";
import "@/utils/firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { common, deepPurple, green, yellow } from "@mui/material/colors";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/utils/firebase";
import { userActions } from "@/redux/slices/userSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
      main: deepPurple[300],
    },
    money: {
      main: green["400"],
      contrastText: common.white,
    },
    youtube: "#FF0000",
    favorite: yellow[800],
    bronze: "#964B00",
    silver: "#C0C0C0",
    gold: "#FFD700",
    diamond: "#D4F1F4",
  },
  typography: {
    fontFamily: pretendard.style.fontFamily,
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    money: Palette["primary"];
    youtube: React.CSSProperties["color"];
    favorite: React.CSSProperties["color"];
    bronze: React.CSSProperties["color"];
    silver: React.CSSProperties["color"];
    gold: React.CSSProperties["color"];
    diamond: React.CSSProperties["color"];
  }

  interface PaletteOptions {
    money: PaletteOptions["primary"];
    youtube: React.CSSProperties["color"];
    favorite: React.CSSProperties["color"];
    bronze: React.CSSProperties["color"];
    silver: React.CSSProperties["color"];
    gold: React.CSSProperties["color"];
    diamond: React.CSSProperties["color"];
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
        const { photoURL, uid } = user;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        let favoriteChannels: string[];
        if (docSnap.exists()) {
          favoriteChannels = docSnap.data().favoriteChannels;
        } else {
          await setDoc(docRef, {
            id: uid,
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
      </Provider>
    </ThemeProvider>
  );
}
