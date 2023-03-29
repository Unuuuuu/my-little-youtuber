"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Typography from "@mui/material/Typography";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { gameSliceActions } from "@/lib/slices/gameSlice";
import LocalFireDepartmentTwoToneIcon from "@mui/icons-material/LocalFireDepartmentTwoTone";
import { keyframes, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import RankGameResult from "./RankGameResult";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";

const scaleUpAndDown = keyframes`
  0%{
    scale: 1;
  }
  50%{
    scale: 1.1;
  }
  1000%{
    scale: 1;
  }
`;

export default function Control() {
  const { isSignedIn, gameMode, gameStatus, streak, time, score } =
    useAppSelector((state) => ({
      isSignedIn: state.user.isSignedIn,
      gameMode: state.game.gameMode,
      gameStatus: state.game.gameStatus,
      streak: state.game.streak,
      time: state.game.time,
      score: state.game.score,
    }));
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const [isExpanded, setIsExpanded] = useState(true);

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

  if (!isSignedIn && gameMode === "RANK") {
    return null;
  }

  const handleExpandCheckboxChange: SwitchBaseProps["onChange"] = (
    _,
    checked
  ) => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Box
      sx={[
        {
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width: "calc(100% - 32px)",
          display: "flex",
          justifyContent: "center",
          gap: 2,
        },
        isLg && {
          width: "auto",
          top: "calc((100% - 56px) / 2)",
          flexDirection: "column",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      ]}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          position: "relative",
        }}
      ></Box>
      <Box
        sx={{
          width: 48,
          height: 48,
          position: "relative",
        }}
      >
        <Box
          sx={[
            {
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
            },
            isLg && {
              right: "auto",
              left: "50%",
              transform: "translateX(-50%)",
            },
          ]}
        >
          <Box
            sx={[
              {
                minWidth: 84,
                height: "100%",
                bgcolor: "white",
                borderRadius: 99,
                boxShadow: 2,
                display: "flex",
                alignItems: "center",
                pl: 1.5,
                pr: 2,
                gap: 1.5,
              },
              gameStatus === "SUCCEEDED" && {
                animation: `${scaleUpAndDown} 1s ease infinite`,
              },
            ]}
          >
            <LocalFireDepartmentTwoToneIcon sx={{ color: "fire" }} />
            <Typography
              component={"span"}
              fontWeight={500}
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              {gameMode === "GENERAL" ? streak : score}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: 48,
          height: 48,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            boxShadow: 2,
          }}
        >
          <Typography component="span" fontWeight={500}>
            {gameMode === "GENERAL" ? "VS" : time}
          </Typography>
        </Box>
        <Grow in={gameStatus === "SUCCEEDED"}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "success.light",
              color: "success.contrastText",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              boxShadow: 2,
            }}
          >
            <CheckRoundedIcon />
          </Box>
        </Grow>
        <Grow in={gameStatus === "FAILED"}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "error.light",
              color: "error.contrastText",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              boxShadow: 2,
            }}
          >
            <CloseRoundedIcon />
          </Box>
        </Grow>

        <RankGameResult isExpanded={isExpanded} />
      </Box>
      <Box
        sx={{
          width: 48,
          height: 48,
          position: "relative",
        }}
      >
        <Grow in={gameStatus === "SUCCEEDED"}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "white",
              borderRadius: "50%",
              boxShadow: 2,
            }}
          >
            <IconButton
              color="success"
              size="large"
              onClick={handlePlayButtonClick}
            >
              <PlayArrowRoundedIcon />
            </IconButton>
          </Box>
        </Grow>
        <Grow in={gameStatus === "FAILED"}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "white",
              borderRadius: "50%",
              boxShadow: 2,
            }}
          >
            <IconButton
              color="error"
              size="large"
              onClick={handleReplayButtonClick}
            >
              <ReplayRoundedIcon />
            </IconButton>
          </Box>
        </Grow>
      </Box>
      <Box
        sx={{
          width: 48,
          height: 48,
          position: "relative",
        }}
      >
        <Grow
          in={
            !isLg && gameMode === "RANK" && gameStatus === "FAILED" && score > 0
          }
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "white",
              borderRadius: "50%",
              boxShadow: 2,
            }}
          >
            <Checkbox
              color="secondary"
              sx={{ p: "12px" }}
              icon={<OpenInFullRoundedIcon />}
              checkedIcon={<CloseFullscreenRoundedIcon />}
              checked={isExpanded}
              onChange={handleExpandCheckboxChange}
            />
          </Box>
        </Grow>
      </Box>
    </Box>
  );
}
