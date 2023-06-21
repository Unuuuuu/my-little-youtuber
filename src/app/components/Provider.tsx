"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import { gmarketSans, notoSansKR } from "@/lib/fonts";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/lib/store";
import { grey } from "@/lib/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9254de",
    },
    secondary: {
      main: "#F9F0FF",
    },
    buttonSecondary: {
      main: grey[700],
    },
    error: {
      main: "#DE5454",
    },
    text: {
      primary: grey[900],
    },
    divider: grey[200],
    tab: "#FAFBFD",
  },
  typography: {
    fontFamily: gmarketSans.style.fontFamily,
    h1: {
      fontFamily: gmarketSans.style.fontFamily,
      fontWeight: 500,
      fontSize: "24px",
      lineHeight: "28px",
      color: grey[900],
    },
    h2: {
      fontFamily: gmarketSans.style.fontFamily,
      fontWeight: 500,
      fontSize: "22px",
      lineHeight: "26px",
      color: grey[900],
    },
    h3: {
      fontFamily: gmarketSans.style.fontFamily,
      fontWeight: 500,
      fontSize: "20px",
      lineHeight: "24px",
      color: grey[900],
    },
    h4: {
      fontFamily: gmarketSans.style.fontFamily,
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "22px",
      color: grey[900],
    },
    h5: {
      fontFamily: notoSansKR.style.fontFamily,
      fontWeight: 500,
      fontSize: "22px",
      lineHeight: "32px",
      color: grey[900],
    },
    h6: {
      fontFamily: notoSansKR.style.fontFamily,
      fontWeight: 700,
      fontSize: "18px",
      lineHeight: "22px",
      color: grey[900],
    },
    subtitle1: {
      fontFamily: notoSansKR.style.fontFamily,
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "20px",
      color: grey[900],
    },
    subtitle2: {
      fontFamily: notoSansKR.style.fontFamily,
      fontWeight: 700,
      fontSize: "14px",
      lineHeight: "16px",
      color: grey[900],
    },
    body1: {
      fontFamily: notoSansKR.style.fontFamily,
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: "20px",
      color: grey[900],
    },
    body2: {
      fontFamily: notoSansKR.style.fontFamily,
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "16px",
      color: grey[900],
    },
    detail1: {
      fontFamily: notoSansKR.style.fontFamily,
      fontWeight: 700,
      fontSize: "12px",
      lineHeight: "14px",
      color: grey[900],
    },
    detail2: {
      fontFamily: notoSansKR.style.fontFamily,
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "14px",
      color: grey[900],
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          detail1: "p",
          detail2: "p",
        },
      },
    },
  },
  breakpoints: {
    values: {
      sm: 0,
      md: 768,
      lg: 1024,
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    buttonSecondary: Palette["primary"];
    tab: React.CSSProperties["color"];
  }

  interface PaletteOptions {
    buttonSecondary: PaletteOptions["primary"];
    tab: React.CSSProperties["color"];
  }
  interface TypographyVariants {
    detail1: React.CSSProperties;
    detail2: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    detail1?: React.CSSProperties;
    detail2?: React.CSSProperties;
  }
  interface BreakpointOverrides {
    xs: false;
    sm: true;
    md: true;
    lg: true;
    xl: false;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    detail1: true;
    detail2: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    buttonSecondary: true;
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
