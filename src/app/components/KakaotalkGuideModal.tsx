"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { modalSliceActions } from "@/lib/slices/modalSlice";
import Button from "@mui/material/Button";

export default function KakaotalkGuideModal() {
  const isKakaotalkGuideModalOpen = useAppSelector(
    (state) => state.modal.isKakaotalkGuideModalOpen
  );
  const dispatch = useAppDispatch();

  const handleModalClose = () => {
    dispatch(modalSliceActions.closeKakaotalkGuideModal());
  };

  return (
    <Modal
      open={isKakaotalkGuideModalOpen}
      onClose={handleModalClose}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          p: 2,
          bgcolor: "white",
          borderRadius: 2,
        }}
      >
        <Typography fontSize={14}>구글 로그인 정책 상의 이유로</Typography>
        <Typography fontWeight={500}>
          카카오톡 안에서는 로그인할 수 없습니다.
        </Typography>
        <Typography fontWeight={500} sx={{ wordBreak: "keep-all", mb: 2 }}>
          다음의 절차를 따라 다른 브라우저로 접속해주세요.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <AndroidIcon fontSize="small" sx={{ color: "#00DE7A" }} />
          <Typography fontSize={14}>안드로이드</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>하단의</Typography>
          <MoreVertIcon
            sx={{ fontSize: 16, px: 0.5, boxSizing: "content-box" }}
          />
          <Typography>버튼을 누릅니다.</Typography>
        </Box>
        <Typography sx={{ mb: 2 }}>
          다른 브라우저로 열기를 선택합니다.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <AppleIcon fontSize="small" sx={{ color: "#666666" }} />
          <Typography fontSize={14}>애플</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>하단의</Typography>
          <IosShareRoundedIcon
            sx={{ fontSize: 16, px: 0.5, boxSizing: "content-box" }}
          />
          <Typography>버튼을 누릅니다.</Typography>
        </Box>
        <Typography sx={{ mb: 2 }}>Safari로 열기를 선택합니다.</Typography>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleModalClose}
        >
          닫기
        </Button>
      </Box>
    </Modal>
  );
}
