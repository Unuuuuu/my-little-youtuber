"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";

export default function Footer() {
  return (
    <Box
      component={"footer"}
      sx={{
        bgcolor: grey[100],
        p: "42px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h6" sx={{ color: grey[400], mb: "16px" }}>
          나작유 팀
        </Typography>
        <Box sx={{ display: "flex", gap: "16px", mb: "12px" }}>
          <Box sx={{ display: "flex", gap: "8px" }}>
            <Typography variant="body2" sx={{ color: grey[500] }}>
              개발자
            </Typography>
            <Typography
              component={"a"}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/unuuuuu"
              variant="body2"
              sx={{ color: grey[600], textDecoration: "underline" }}
            >
              지윤우
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "8px" }}>
            <Typography variant="body2" sx={{ color: grey[500] }}>
              디자이너
            </Typography>
            <Typography
              component={"a"}
              target="_blank"
              rel="noopener noreferrer"
              href="https://kimbaul.notion.site/6a9e8130c23c426f9e5d5fa40ec8d7f0"
              variant="body2"
              sx={{ color: grey[600], textDecoration: "underline" }}
            >
              김바울
            </Typography>
            <Typography
              component={"a"}
              target="_blank"
              rel="noopener noreferrer"
              href="https://sanghunlee.imweb.me"
              variant="body2"
              sx={{ color: grey[600], textDecoration: "underline" }}
            >
              이상훈
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" sx={{ color: grey[500] }}>
            이메일 문의
          </Typography>
          <Typography
            component={"a"}
            href="mailto:mylittley0tuber@gmail.com"
            variant="detail2"
            sx={{ color: grey[600], textDecoration: "underline" }}
          >
            mylittley0tuber@gmail.com
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
