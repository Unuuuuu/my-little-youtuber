"use client";

import Box from "@mui/material/Box";
import Image from "next/image";
import bannerSmImageSrc from "../../assets/banner-sm.png";
import bannerLgImageSrc from "../../assets/banner-lg.png";

export default function Banner() {
  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        height: "260px",
        display: "flex",
        justifyContent: "center",
        pt: {
          sm: "22px",
          md: "32px",
        },
      }}
    >
      <Box
        sx={{
          display: {
            sm: "block",
            md: "none",
          },
        }}
      >
        <Image src={bannerSmImageSrc} alt="banner" width={298} height={216} />
      </Box>
      <Box
        sx={{
          display: {
            sm: "none",
            md: "block",
          },
        }}
      >
        <Image src={bannerLgImageSrc} alt="banner" width={578} height={213} />
      </Box>
    </Box>
  );
}
