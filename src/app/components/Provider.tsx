"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import { gmarketSans, notoSansKR } from "@/lib/fonts";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/lib/store";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9254de",
    },
    buttonSecondary: {
      main: grey[700],
    },
    error: {
      main: "#DE5454",
    },
  },
  typography: {
    fontFamily: gmarketSans.style.fontFamily,
    h1: {
      fontFamily: gmarketSans.style.fontFamily,
      fontWeight: 500,
      fontSize: "24px",
      lineHeight: "28px",
    },
    h2: {
      fontFamily: gmarketSans.style.fontFamily,
      fontWeight: 500,
      fontSize: "22px",
      lineHeight: "26px",
    },
    h3: {
      fontFamily: gmarketSans.style.fontFamily,
      fontWeight: 500,
      fontSize: "20px",
      lineHeight: "24px",
    },
    h4: {
      fontFamily: gmarketSans.style.fontFamily,
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "22px",
    },
    h5: {
      fontFamily: notoSansKR.style.fontFamily,
      fontWeight: 500,
      fontSize: "22px",
      lineHeight: "32px",
    },
    subtitle1: {
      fontFamily: notoSansKR.style.fontFamily,
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "20px",
    },
    subtitle2: {
      fontFamily: notoSansKR.style.fontFamily,
      fontWeight: 700,
      fontSize: "14px",
      lineHeight: "16px",
    },
    body1: {
      fontFamily: notoSansKR.style.fontFamily,
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: "20px",
    },
    body2: {
      fontFamily: notoSansKR.style.fontFamily,
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "16px",
    },
    detail1: {
      fontFamily: notoSansKR.style.fontFamily,
      fontWeight: 700,
      fontSize: "12px",
      lineHeight: "14px",
    },
    detail2: {
      fontFamily: notoSansKR.style.fontFamily,
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "14px",
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
      mobile: 0,
      tablet: 768,
      desktop: 1024,
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    buttonSecondary: Palette["primary"];
    // google: React.CSSProperties["color"];
  }

  interface PaletteOptions {
    buttonSecondary: PaletteOptions["primary"];
    // google: React.CSSProperties["color"];
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
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    desktop: true;
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
