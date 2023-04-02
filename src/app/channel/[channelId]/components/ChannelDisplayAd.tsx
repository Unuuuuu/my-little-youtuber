"use client";

import Box from "@mui/material/Box";
import Script from "next/script";
import { useEffect } from "react";

export default function ChannelDisplayAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Box sx={{ position: "relative", zIndex: 1 }}>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4440044743501222"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center", height: "50px" }}
        data-ad-client="ca-pub-4440044743501222"
        data-ad-slot="1129126488"
        data-ad-format="horizontal"
        data-full-width-responsive="false"
      />
    </Box>
  );
}
