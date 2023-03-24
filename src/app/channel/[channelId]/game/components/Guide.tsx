"use client";

import { useAppSelector } from "@/lib/hooks";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import Fade from "@mui/material/Fade";

const SESSION_STORAGE_KEY = "NO_MORE_GUIDE";

export default function Guide() {
  const { isInitialized, randomVideos, gameMode } = useAppSelector((state) => ({
    isInitialized: state.game.isInitialized,
    randomVideos: state.game.randomVideos,
    gameMode: state.game.gameMode,
  }));
  const [step, setStep] = useState(0);
  const [targetDOMRect, setTargetDOMRect] = useState<DOMRect>();
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    const isNoMoreGuide = window.sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (!isInitialized || isNoMoreGuide === "true" || gameMode === "RANK") {
      return;
    }

    setTargetDOMRect(
      document
        .querySelector("#guide-youtube-player-modal")
        ?.getBoundingClientRect()
    );
    setIsOpen(true);

    window.addEventListener("resize", () => {
      setTargetDOMRect(
        document
          .querySelector("#guide-youtube-player-modal")
          ?.getBoundingClientRect()
      );
    });

    return () => {
      window.removeEventListener("resize", () => {
        setTargetDOMRect(
          document
            .querySelector("#guide-youtube-player-modal")
            ?.getBoundingClientRect()
        );
      });
    };
  }, [isInitialized]);

  const handleNextButtonClick = () => {
    setStep((prev) => prev + 1);
  };

  const handleConfirmButtonClick = () => {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
    setIsOpen(false);
  };

  return (
    <Backdrop open={isInitialized && isOpen}>
      <Fade in={step === 0}>
        <Box
          sx={{
            position: "absolute",
            top: targetDOMRect?.top,
            left: targetDOMRect?.left,
            bgcolor: "white",
            borderRadius: "50%",
          }}
        >
          <IconButton
            id="guide-youtube-player-modal"
            sx={{
              color: "youtube",
            }}
          >
            <PlayCircleRoundedIcon />
          </IconButton>
          <Box
            sx={[
              {
                position: "absolute",
                top: 48,
                right: 0,
                bgcolor: "white",
                borderRadius: 2,
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              },
              isLg && {
                top: "auto",
                right: "auto",
                bottom: 48,
                left: 0,
              },
            ]}
          >
            <Typography variant="caption" color={"GrayText"}>
              1/2
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography noWrap>
                유튜브 영상을 재생시켜볼 수 있어요.
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{ minWidth: 0, width: "max-content" }}
                onClick={handleNextButtonClick}
              >
                다음
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
      <Fade in={step === 1}>
        <Box
          sx={[
            {
              position: "absolute",
              bgcolor: "black",
              borderRadius: 2,
              display: "flex",
              top: 112,
              left: 16,
              right: 16,
              height: "calc((100% - 184px) / 2)",
            },
            isLg && {
              top: 56,
              bottom: 56,
              left: 16,
              right: "auto",
              height: "auto",
              width: "calc((100% - 16px) / 2 - 16px)",
            },
          ]}
        >
          {randomVideos !== undefined && (
            <Image
              src={randomVideos[0].thumbnail.url}
              alt="thumbnail"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          )}
          <Box
            sx={[
              {
                position: "absolute",
                top: "calc(100% + 16px)",
                right: 0,
                bgcolor: "white",
                borderRadius: 2,
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              },
              isLg && {
                top: "auto",
                right: "auto",
                bottom: 0,
                left: "calc(100% + 16px)",
              },
            ]}
          >
            <Typography variant="caption" color={"GrayText"}>
              2/2
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Typography noWrap>썸네일을 클릭해 골라주세요.</Typography>
              <Button
                variant="contained"
                size="small"
                sx={{ minWidth: 0, width: "max-content" }}
                onClick={handleConfirmButtonClick}
              >
                확인
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Backdrop>
  );
}
