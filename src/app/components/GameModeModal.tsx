"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { modalSliceActions } from "@/lib/slices/modalSlice";
import Button from "@mui/material/Button";
import { useCallback, useEffect } from "react";
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { gameSliceActions } from "@/lib/slices/gameSlice";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import Link from "next/link";
import Typography from "@mui/material/Typography";

const generalGameModeRows = [
  "시간 제한이 없습니다.",
  "점수가 기록되지 않습니다.",
  "유튜브 영상 재생이 가능합니다.",
  "로그인하지 않아도 됩니다.",
];
const rankGameModeRows = [
  "10초의 시간 제한이 있습니다.",
  "점수가 기록되어 유저들과 경쟁할 수 있습니다.",
  "유튜브 영상 재생이 불가능합니다.",
  "로그인이 필수입니다.",
];

export default function GameModeModal() {
  const {
    isGameModeModalOpen,
    channelId,
    channelUpdateTime,
    isSignedIn,
    gameMode,
  } = useAppSelector((state) => ({
    isGameModeModalOpen: state.modal.isGameModeModalOpen,
    channelId: state.modal.gameModeModalChannelId,
    channelUpdateTime: state.modal.gameModeModalChannelUpdateTime,
    isSignedIn: state.user.isSignedIn,
    gameMode: state.game.gameMode,
  }));
  const dispatch = useAppDispatch();

  const handleModalClose = useCallback(() => {
    dispatch(modalSliceActions.closeGameModeModal());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      handleModalClose();
    };
  }, [handleModalClose]);

  const handleToggleButtonGroupChange: ToggleButtonGroupProps["onChange"] = (
    _,
    newMode
  ) => {
    if (newMode === null) {
      return;
    }

    dispatch(gameSliceActions.updateGameMode(newMode));
  };

  const handlePlayButtonClick = () => {};

  const handleLoginButtonClick = () => {
    if (navigator.userAgent.includes("KAKAOTALK")) {
      dispatch(modalSliceActions.closeGameModeModal());
      dispatch(modalSliceActions.openKakaotalkGuideModal());
      return;
    }

    signInWithRedirect(auth, provider);
  };

  return (
    <Modal
      open={isGameModeModalOpen}
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
        <ToggleButtonGroup
          fullWidth
          color="primary"
          value={gameMode}
          exclusive
          onChange={handleToggleButtonGroupChange}
          size="small"
          sx={{ mb: 1 }}
        >
          <ToggleButton value="GENERAL">일반 게임</ToggleButton>
          <ToggleButton value="RANK">랭크 게임</ToggleButton>
        </ToggleButtonGroup>
        {gameMode === "GENERAL" && (
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 1 }}>
            <Table>
              <TableBody>
                {generalGameModeRows.map((row) => (
                  <TableRow
                    key={row}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{row}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {gameMode === "RANK" && (
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 1 }}>
            <Table>
              <TableBody>
                {rankGameModeRows.map((row) => (
                  <TableRow
                    key={row}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{row}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {!isSignedIn && gameMode === "RANK" ? (
          <Button
            fullWidth
            startIcon={<GoogleIcon />}
            color="secondary"
            onClick={handleLoginButtonClick}
            variant="contained"
          >
            구글 계정으로 로그인하기
          </Button>
        ) : (
          <Link href={`/channel/${channelId}/game`}>
            <Button
              startIcon={<PlayArrowRoundedIcon />}
              fullWidth
              color="secondary"
              variant="contained"
              onClick={handlePlayButtonClick}
            >
              시작하기
            </Button>
          </Link>
        )}
        <Typography
          component={"p"}
          variant="caption"
          color={"GrayText"}
          textAlign="center"
          sx={{ mt: 0.5 }}
        >
          {new Date(channelUpdateTime!).toLocaleDateString("ko", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          에 마지막으로 업데이트되었습니다.
        </Typography>
      </Box>
    </Modal>
  );
}
