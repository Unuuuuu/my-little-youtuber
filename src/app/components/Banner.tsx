"use client";

import { gmarketSans } from "@/lib/fonts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import logoImageSrc from "../../assets/logo.png";

export default function Banner() {
  return (
    <Box sx={{ p: "24px", display: "flex", justifyContent: "center" }}>
      <Box>
        <Typography
          sx={{
            fontSize: "12px",
            lineHeight: "14px",
            letterSpacing: "0.349em",
            mb: "4px",
          }}
        >
          2023.06.08
        </Typography>
        <Box sx={{ display: { md: "flex" } }}>
          <Box>
            <Box sx={{ display: "flex", gap: "32px", mb: "20px" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontFamily: gmarketSans.style.fontFamily,
                  fontSize: {
                    sm: "24px",
                    md: "36px",
                  },
                  lineHeight: {
                    sm: "34px",
                    md: "44px",
                  },
                }}
              >
                나의 작은 유튜버
                <br />
                리뉴얼 안내
              </Typography>
              <Box sx={{ display: { sm: "block", md: "none" } }}>
                <Image src={logoImageSrc} alt="logo" width={70} height={70} />
              </Box>
            </Box>
            <Box
              component={"ul"}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {[
                "로그인 없이 즐기세요",
                "채널별 태그 업데이트 진행 중",
                "일반&타임어택 모드 간 점수 산정 방식 통일",
                "리뉴얼 이전 사용자 데이터 추후 업데이트 예정",
              ].map((value, index) => (
                <Box
                  key={index}
                  component={"li"}
                  sx={{ display: "flex", gap: "10px" }}
                >
                  <Typography variant="body2">#</Typography>
                  <Typography variant="body2">{value}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: { sm: "none", md: "block" }, ml: "36px" }}>
            <Image src={logoImageSrc} alt="logo" width={184} height={184} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
