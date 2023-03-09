import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { kakaotalkGuideModalActions } from "@/redux/slices/kakaotalkGuideModalSlice";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";

const KakaotalkGuideModal = () => {
  const { isOpen } = useAppSelector((state) => state.kakaotalkGuideModal);
  const dispatch = useAppDispatch();

  const handleModalClose = () => {
    dispatch(kakaotalkGuideModalActions.close());
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleModalClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "672px",
          bgcolor: "white",
          borderRadius: 2,
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography fontSize={14}>구글 로그인 정책 상의 이유로</Typography>
          <Typography fontWeight={500} sx={{ mb: 1 }}>
            카카오톡 안에서는 로그인할 수 없습니다.
          </Typography>
          <Typography sx={{ wordBreak: "keep-all" }}>
            다음의 절차를 따라 다른 브라우저로 접속해주세요.
          </Typography>
        </Box>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}
          >
            <AndroidIcon fontSize="small" sx={{ color: "#00DE7A" }} />
            <Typography fontWeight={500}>안드로이드</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>하단의</Typography>
            <MoreVertIcon
              sx={{ fontSize: 16, px: 0.5, boxSizing: "content-box" }}
            />
            <Typography>버튼을 누릅니다.</Typography>
          </Box>
          <Typography>다른 브라우저로 열기를 선택합니다.</Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}
          >
            <AppleIcon fontSize="small" sx={{ color: "#666666" }} />
            <Typography fontWeight={500}>애플</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>하단의</Typography>
            <IosShareRoundedIcon
              sx={{ fontSize: 16, px: 0.5, boxSizing: "content-box" }}
            />
            <Typography>버튼을 누릅니다.</Typography>
          </Box>
          <Typography>Safari로 열기를 선택합니다.</Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default KakaotalkGuideModal;
