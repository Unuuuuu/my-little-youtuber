"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import vsImageSrc from "@/assets/vs-image.svg";
import bgImageSrc from "@/assets/hero-section-bg-image.svg";
import Image from "next/image";
import HomeDisplayAd from "./HomeDisplayAd";
import youtubeLogoSrc from "@/assets/hero-youtube-logo.svg";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/lib/firebase";

export default function HeroSection() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const handleSurveyBannerClick = () => {
    if (analytics === null) {
      return;
    }

    logEvent(analytics, "improvement_survey_banner_click");
  };

  return (
    <Box
      id="hero"
      component={"section"}
      sx={{
        // backgroundImage: `url(${bgImageSrc.src})`,
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center",
        // backgroundSize: "cover",
        flexShrink: 0,
        bgcolor: "#E8E4F0",
      }}
    >
      {/* <HomeDisplayAd /> */}
      <Box
        component={"a"}
        href="https://docs.google.com/forms/d/e/1FAIpQLSdk6iUjcaLJfjupoBRocLVWnnMswN1ek1Y-5Vsan-5_BuNghQ/viewform"
        target="_blank"
        rel="noopener noreferrer"
        sx={[
          {
            display: "block",
            position: "relative",
            width: "100%",
            height: 270,
            pt: "54px",
          },
          isSm && {
            pt: "40px",
          },
        ]}
        onClick={handleSurveyBannerClick}
      >
        {/* <Box sx={{ zIndex: 1, textAlign: "center", color: "#4A4453" }}>
          <Typography component={"h1"} fontSize={24} fontWeight={500}>
            나의 작은 유튜버 <br />
            조회수 높은 영상 맞추기 게임
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
        /> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "18px",
              alignItems: "center",
              mb: "24px",
            }}
          >
            <Image
              src={youtubeLogoSrc}
              alt="youtube logo"
              style={
                isSm
                  ? { width: "70px", height: "48px" }
                  : { width: "50px", height: "34px" }
              }
            />
            <Typography
              fontWeight={800}
              fontSize={isSm ? 42 : 28}
              lineHeight={"46px"}
              color={"#313131"}
            >
              나의 작은 유튜버
            </Typography>
          </Box>
          <Typography
            fontSize={isSm ? 28 : 18}
            textAlign="center"
            color={"#241149"}
            sx={{ mb: isSm ? "24px" : "30px" }}
          >
            서비스 개선을 위한 설문조사 참여하고
            <br />
            <Box component={"b"} fontWeight={600}>
              커피 기프티콘
            </Box>{" "}
            받아가세요!
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Box
              sx={[
                {
                  bgcolor: "#595068",
                  borderRadius: "99px",
                  width: "95px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                isSm && {
                  width: "115px",
                  height: "30px",
                },
              ]}
            >
              <Typography
                color="white"
                fontWeight={500}
                fontSize={isSm ? 18 : 15}
              >
                이벤트 기간
              </Typography>
            </Box>
            <Typography
              color="#242424"
              fontWeight={500}
              fontSize={isSm ? 18 : 15}
            >
              4월 6일 ~ 4월 13일
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
