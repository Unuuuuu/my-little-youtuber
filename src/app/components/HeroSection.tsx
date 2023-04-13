"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import vsImageSrc from "@/assets/vs-image.svg";
import bgImageSrc from "@/assets/hero-section-bg-image.svg";
import Image from "next/image";
import HomeDisplayAd from "./HomeDisplayAd";
import youtubeLogoSrc from "@/assets/hero-youtube-logo.svg";
import coffeeSrc from "@/assets/coffee.png";
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
            pt: "35px",
          },
          isSm && {
            pt: "38px",
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
          <Typography
            sx={[
              {
                fontSize: 16,
                color: "#313131",
                lineHeight: "30px",
              },
              isSm && {
                fontSize: 20,
                mb: "5px",
              },
            ]}
          >
            조회수 높은 영상 맞추기 게임
          </Typography>
          <Box
            sx={[
              {
                display: "flex",
                alignItems: "center",
                mb: "14px",
                gap: "8px",
              },
              isSm && {
                gap: "10px",
                mb: "13px",
              },
            ]}
          >
            <Image
              src={youtubeLogoSrc}
              alt="youtube logo"
              style={
                isSm
                  ? {
                      width: "48px",
                      height: "32px",
                    }
                  : { width: "36px", height: "24.5px" }
              }
            />
            <Typography
              fontWeight={800}
              color={"#313131"}
              sx={[
                { fontSize: 24, lineHeight: "46px" },
                isSm && {
                  fontSize: 36,
                },
              ]}
            >
              나의 작은 유튜버
            </Typography>
          </Box>
          <Box
            sx={[
              { position: "relative", mb: "21px" },
              isSm && {
                mb: "13px",
              },
            ]}
          >
            <Typography
              textAlign="center"
              color={"#241149"}
              sx={[
                {
                  fontSize: 18,
                  lineHeight: "28px",
                },
                isSm && {
                  fontSize: 20,
                },
              ]}
            >
              서비스 개선을 위한 설문조사 참여하고
              <br />
              <Typography
                component={"b"}
                fontWeight={600}
                sx={[
                  {
                    px: "2.5px",
                    lineHeight: "23px",
                    bgcolor: "rgb(254, 255, 212)",
                    fontSize: 18,
                  },
                  isSm && {
                    px: "4px",
                    fontSize: 20,
                  },
                ]}
              >
                커피 기프티콘
              </Typography>{" "}
              받아가세요!
            </Typography>
            <Image
              src={coffeeSrc}
              alt="coffee"
              width={isSm ? 50 : 39}
              height={isSm ? 35 : 27}
              style={
                isSm
                  ? { position: "absolute", bottom: -8, left: -12 }
                  : { position: "absolute", bottom: -2, left: 1 }
              }
            />
          </Box>
          <Box
            sx={[
              { display: "flex", alignItems: "center", gap: "8px" },
              isSm && {
                gap: "5px",
              },
            ]}
          >
            <Box
              sx={[
                {
                  bgcolor: "#595068",
                  borderRadius: "99px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: "4px 8.5px",
                },
                isSm && {
                  p: "4.5px 10px",
                },
              ]}
            >
              <Typography
                color="white"
                sx={[
                  { fontSize: 15, lineHeight: "16px" },
                  isSm && {
                    fontSize: 18,
                    fontWeight: 500,
                    lineHeight: "21px",
                  },
                ]}
              >
                <Typography
                  component={"b"}
                  sx={[
                    { color: "#FBFFD0", lineHeight: "16px", fontSize: 15 },
                    isSm && {
                      fontSize: 18,
                      lineHeight: "21px",
                      fontWeight: 500,
                    },
                  ]}
                >
                  2차
                </Typography>{" "}
                이벤트 기간
              </Typography>
            </Box>
            <Typography
              color="#242424"
              sx={[
                { fontSize: 15, lineHeight: "30px" },
                isSm && { fontSize: 18, fontWeight: 500, lineHeight: "42px" },
              ]}
            >
              4월 14일 ~ 4월 21일
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
