"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import xsBgImage from "@/assets/hero-section-xs-bg-image.png";
import smBgImage from "@/assets/hero-section-sm-bg-image.png";
import mdBgImage from "@/assets/hero-section-md-bg-image.png";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

const xsBgImageBlurDataUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGOIzUydvH5N1a4jJj2LGRg4OJ98+f7k/38GbUsGIXZuf09vR1dPHRsHAFPcDxlm7bGaAAAAAElFTkSuQmCC";
const smBgImageBlurDataUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAI0lEQVR4nGNgEOAsXbzQ0Nblwrf/DGrW5sf//dcxNGNgEwAAe4cJTxeRUJcAAAAASUVORK5CYII=";
const mdBgImageBlurDataUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAIAAAB2XpiaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAFUlEQVR4nGMQt7DY+e1/Znkds4wKACIJBNffNqsRAAAAAElFTkSuQmCC";

export default function HeroSection() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  return (
    <Box
      component={"section"}
      sx={{
        position: "relative",
        width: "100%",
        height: 270,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "black",
      }}
    >
      <Box sx={{ zIndex: 1, textAlign: "center" }}>
        <Typography component={"h1"} fontSize={24} fontWeight={700}>
          나의 작은 유튜버
        </Typography>
        <Typography component={"h1"} fontSize={24} fontWeight={700}>
          유튜브 영상 조회수 맞추기 게임
        </Typography>
      </Box>
      <Box
        sx={[
          {
            position: "absolute",
            inset: 0,
            maxWidth: 360,
            margin: "auto",
          },
          isSm && {
            maxWidth: 600,
          },
          isMd && {
            maxWidth: 900,
          },
        ]}
      >
        {isInitialized && (
          <Image
            src={isMd ? mdBgImage : isSm ? smBgImage : xsBgImage}
            alt="hero section background image"
            fill
            style={{ objectFit: "cover" }}
            placeholder="blur"
            blurDataURL={
              isMd
                ? mdBgImageBlurDataUrl
                : isSm
                ? smBgImageBlurDataUrl
                : xsBgImageBlurDataUrl
            }
          />
        )}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.75)",
          }}
        />
      </Box>
    </Box>
  );
}
