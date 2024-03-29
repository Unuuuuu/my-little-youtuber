"use client";

import NextIcon from "@/components/NextIcon";
import { gmarketSans } from "@/lib/fonts";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { gameSliceActions } from "@/lib/slices/gameSlice";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Grow from "@mui/material/Grow";
import Typography from "@mui/material/Typography";
import { grey } from "@/lib/colors";
import Link from "next/link";
import { useEffect } from "react";
import VsSvgIcon from "@/components/VsSvgIcon";

export default function Control() {
  const {
    channelId,
    gameMode,
    gameStatus,
    score,
    time,
    isResultLoading,
    isResultDialogOpen,
    resultStatus,
  } = useAppSelector((state) => ({
    channelId: state.game.id,
    gameMode: state.game.gameMode,
    gameStatus: state.game.gameStatus,
    score: state.game.score,
    time: state.game.time,
    isResultLoading: state.game.isResultLoading,
    isResultDialogOpen: state.resultDialog.isOpen,
    resultStatus: state.game.resultStatus,
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (gameMode === "GENERAL" || gameStatus !== "IDLE") {
      return;
    }

    if (time === 0) {
      dispatch(gameSliceActions.fail());
      return;
    }

    const timeoutId = setInterval(() => {
      dispatch(gameSliceActions.updateTime());
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, gameMode, gameStatus, time]);

  const handlePlayButtonClick = () => {
    dispatch(gameSliceActions.next());
  };

  const handleReplayButtonClick = () => {
    dispatch(gameSliceActions.reset());
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: { sm: "50%", md: "calc(50% - 24px)" },
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Grow in={gameStatus !== "FAILED"}>
          <Box
            sx={{
              p: {
                sm: "3px 3px 3px 7px",
                md: "7px 3px 3px 3px",
              },
              display: "flex",
              gap: "6px",
              bgcolor: "white",
              boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.5)",
              borderRadius: "99px",
              flexDirection: {
                sm: "row",
                md: "column",
              },
            }}
          >
            <Box
              sx={{
                width: {
                  sm: "64px",
                  md: "56px",
                },
                height: {
                  sm: "56px",
                  md: "64px",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: gmarketSans.style.fontFamily,
                  fontSize: "20px",
                  lineHeight: "24px",
                  fontWeight: 500,
                  color: grey[600],
                }}
              >
                {score}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "56px",
                height: "56px",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "tab",
                  borderRadius: "50%",
                  border: `1px solid ${grey[200]}`,
                }}
              >
                {gameMode === "GENERAL" ? (
                  <VsSvgIcon sx={{ width: 37, height: 21 }} />
                ) : (
                  <Typography
                    sx={[
                      {
                        fontFamily: gmarketSans.style.fontFamily,
                        fontSize: "24px",
                        lineHeight: "24px",
                        fontWeight: 700,
                      },
                      time <= 3 && {
                        color: "error.main",
                      },
                    ]}
                  >
                    {time}
                  </Typography>
                )}
              </Box>
              <Grow in={gameStatus === "SUCCEEDED"}>
                <ButtonBase
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "50%",
                    pl: "18px",
                    justifyContent: "flex-start",
                  }}
                  onClick={handlePlayButtonClick}
                >
                  <NextIcon />
                </ButtonBase>
              </Grow>
            </Box>
          </Box>
        </Grow>
      </Box>
      {gameStatus === "FAILED" && !isResultLoading && !isResultDialogOpen && (
        <Box
          sx={{
            position: "absolute",
            top: { sm: "50%", md: "calc(50% - 24px)" },
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Grow in={true}>
            <Box
              sx={{
                p: "3px",
                display: "flex",
                gap: "4px",
                bgcolor: "white",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.5)",
                borderRadius: {
                  sm: "99px",
                  md: "32px",
                },
                flexDirection: {
                  sm: "row",
                  md: "column",
                },
              }}
            >
              <Link href={`/channel/${channelId}`}>
                <ButtonBase
                  sx={{
                    width: "110px",
                    height: "56px",
                    borderRadius: {
                      sm: "99px 28px 28px 99px",
                      md: "28px 28px 8px 8px",
                    },
                    border: `1px solid ${grey[200]}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: gmarketSans.style.fontFamily,
                      fontSize: "20px",
                      lineHeight: "24px",
                      fontWeight: 500,
                    }}
                  >
                    {resultStatus === "rank" ? "랭킹보기" : "나가기"}
                  </Typography>
                </ButtonBase>
              </Link>
              <ButtonBase
                sx={{
                  width: "110px",
                  height: "56px",
                  borderRadius: {
                    sm: "28px 99px 99px 28px",
                    md: "8px 8px 28px 28px",
                  },
                  bgcolor: "primary.main",
                }}
                onClick={handleReplayButtonClick}
              >
                <Typography
                  sx={{
                    fontFamily: gmarketSans.style.fontFamily,
                    fontSize: "20px",
                    lineHeight: "24px",
                    fontWeight: 500,
                    color: "white",
                  }}
                >
                  다시하기
                </Typography>
              </ButtonBase>
            </Box>
          </Grow>
        </Box>
      )}
    </>
  );
}
