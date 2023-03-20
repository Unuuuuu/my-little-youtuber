"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import vsImageSrc from "@/assets/vs-image.svg";
import bgImageSrc from "@/assets/hero-section-bg-image.svg";
import Image from "next/image";

export default function HeroSection() {
  return (
    <Box
      component={"section"}
      sx={{
        position: "relative",
        width: "100%",
        height: 270,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${bgImageSrc.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        flexShrink: 0,
      }}
    >
      <Box sx={{ zIndex: 1, textAlign: "center", color: "#4A4453" }}>
        <Typography component={"h1"} fontSize={24}>
          <Typography component={"b"} fontSize={24} fontWeight={500}>
            좋아하는 유튜버
          </Typography>
          의 영상으로
        </Typography>
        <Typography component={"h1"} fontSize={24}>
          <Typography component={"b"} fontSize={24} fontWeight={500}>
            조회수 맞추기 게임
          </Typography>
          을 해보세요
        </Typography>
      </Box>
      <Image
        src={vsImageSrc}
        alt="hero section background image"
        width={298}
        height={374}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.2,
          color: "white",
        }}
      />
    </Box>
  );
}
