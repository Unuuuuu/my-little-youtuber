"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: grey[100], p: "56px 32px" }}>
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          justifyContent: { sm: "flex-start", md: "center" },
        }}
      >
        <Typography
          component={"span"}
          variant="body2"
          sx={{ color: grey[400] }}
        >
          이메일 문의
        </Typography>
        <Typography
          component={"span"}
          variant="body2"
          sx={{ color: grey[600] }}
        >
          mylittley0tuber@gmail.com
        </Typography>
      </Box>
    </Box>
  );
}
