"use client";

import { gmarketSans } from "@/lib/fonts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";

export default function Banner() {
  return (
    <Box
      sx={{
        p: "24px",
        display: "flex",
        justifyContent: "center",
        bgcolor: "secondary.main",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { sm: "column", md: "row" },
          gap: { sm: "20px", md: "36px" },
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "12px",
              lineHeight: "14px",
              letterSpacing: "0.349em",
              mb: "4px",
              color: grey[700],
            }}
          >
            2023.06.07
          </Typography>
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
        </Box>
        <Box
          component={"ul"}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            mt: { sm: "0px", md: "18px" },
          }}
        >
          {[
            "로그인 없이 즐기세요",
            "채널별 태그 업데이트 진행 중!",
            "일반&타임어택 모드 간 점수 산정 방식 통일했어요",
            "리뉴얼 이전 사용자 데이터 추후 업데이트 예정입니다",
          ].map((value, index) => (
            <Box
              key={index}
              component={"li"}
              sx={{ display: "flex", gap: "10px" }}
            >
              <Typography variant="body2" sx={{ color: grey[700] }}>
                #
              </Typography>
              <Typography variant="body2" sx={{ color: grey[700] }}>
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
