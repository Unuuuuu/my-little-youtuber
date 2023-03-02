import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Grow from "@mui/material/Grow";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { higherLowerGameActions } from "@/redux/slices/higherLowerGameSlice";
import { keyframes, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";

const scaleUpAndDown = keyframes`
  0%{
    scale: 1;
  }
  50%{
    scale: 1.2;
  }
  1000%{
    scale: 1;
  }
`;

const Indicator = () => {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("lg"));
  const { status, score, isTimeLimitedMode, time } = useAppSelector(
    (state) => ({
      status: state.higherLowerGame.status,
      score: state.higherLowerGame.score,
      isTimeLimitedMode: state.higherLowerGame.isTimeLimitedMode,
      time: state.higherLowerGame.time,
    })
  );
  const dispatch = useAppDispatch();

  const handleReplayButtonClick = () => {
    dispatch(higherLowerGameActions.reset());
  };

  const handlePlayButtonClick = () => {
    dispatch(higherLowerGameActions.next());
  };

  useEffect(() => {
    if (!isTimeLimitedMode || status !== "IDLE") {
      return;
    }

    if (time === 0) {
      dispatch(higherLowerGameActions.fail());
      return;
    }

    const timeoutId = setInterval(() => {
      dispatch(higherLowerGameActions.minusTime());
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, isTimeLimitedMode, time, status]);

  return (
    <Box
      sx={[
        {
          width: "100%",
          px: 2,
          position: "absolute",
          top: "calc((100% + 56px) / 2)",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 2,
        },
        isPc && {
          width: "auto",
          px: 0,
          top: "calc((100% - 8px) / 2)",
          flexDirection: "column",
        },
      ]}
    >
      <Box
        sx={{
          position: "relative",
          width: 48,
          height: 48,
          display: "flex",
        }}
      ></Box>
      <Box
        sx={{
          position: "relative",
          width: 48,
          height: 48,
          display: "flex",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "white",
            borderRadius: "50%",
            boxShadow: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography component="span" fontWeight={500}>
            VS
          </Typography>
        </Box>
        <Grow in={status === "SUCCEEDED"}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "success.light",
              color: "success.contrastText",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckRoundedIcon />
          </Box>
        </Grow>
        <Grow in={status === "FAILED"}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "error.light",
              color: "error.contrastText",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CloseRoundedIcon />
          </Box>
        </Grow>
        <Box
          sx={[
            {
              position: "absolute",
              top: "-37.5%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            },
            isPc && {
              top: "-50%",
            },
          ]}
        >
          <Box
            sx={[
              {
                height: 24,
                color: "money.contrastText",
                bgcolor: "money.main",
                display: "flex",
                alignItems: "center",
                borderRadius: 1,
                pl: 0.5,
                pr: 1,
                gap: 0.5,
              },
              status === "SUCCEEDED" && {
                animation: `${scaleUpAndDown} 1s ease infinite`,
              },
            ]}
          >
            <AttachMoneyRoundedIcon sx={{ fontSize: 16 }} />
            <Typography fontSize={12} fontWeight={500}>
              {score}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: 48,
          height: 48,
          display: "flex",
        }}
      >
        <Grow in={status === "SUCCEEDED"}>
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
        <Grow in={status === "FAILED"}>
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
    </Box>
  );
};

export default Indicator;
