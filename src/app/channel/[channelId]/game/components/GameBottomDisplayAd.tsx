"use client";

import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import Script from "next/script";
import { useEffect } from "react";

function Left() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4440044743501222"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block", flex: 1, height: "50px" }}
        data-ad-client="ca-pub-4440044743501222"
        data-ad-slot="9182413304"
        data-ad-format="horizontal"
        data-full-width-responsive="false"
      />
    </>
  );
}

function Right() {
  const isMatch = useMediaQuery("(max-width:468px)");

  useEffect(() => {
    if (isMatch) {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error(error);
    }
  }, [isMatch]);

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4440044743501222"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={
          isMatch
            ? { display: "none" }
            : { display: "block", flex: 1, height: "50px" }
        }
        data-ad-client="ca-pub-4440044743501222"
        data-ad-slot="7869331632"
        data-ad-format="horizontal"
        data-full-width-responsive="false"
      />
    </>
  );
}

export default function GameTopDisplayAd() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Left />
      <Right />
    </Box>
  );
}
