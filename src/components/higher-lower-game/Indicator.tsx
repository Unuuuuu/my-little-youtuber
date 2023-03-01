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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import { SystemStyleObject } from "@mui/system/styleFunctionSx";

const indicatorCss = {
  item: {
    flexBasis: 48,
    width: "100%",
    position: "relative",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "white",
    boxShadow: 2,
  } as SystemStyleObject,
  absoluteItem: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  } as SystemStyleObject,
};

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
          width: 176,
          height: 48,
          position: "absolute",
          top: "calc((100% + 56px) / 2)",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "row",
          gap: 2,
        },
        isPc && {
          width: 48,
          height: 176,
          top: "calc((100% - 8px) / 2)",
          flexDirection: "column",
        },
      ]}
    >
      <Grow in={isTimeLimitedMode}>
        <Box sx={indicatorCss.item}>
          {status === "FAILED" && score !== 0 ? (
            <IconButton color="error" size="large" onClick={() => {}}>
              <HistoryEduRoundedIcon />
            </IconButton>
          ) : (
            <Typography component="span" fontWeight={500}>
              {time}
            </Typography>
          )}
        </Box>
      </Grow>
      <Box sx={indicatorCss.item}>
        <Typography component="span" fontWeight={500}>
          VS
        </Typography>
        <Grow in={status === "SUCCEEDED"}>
          <Box
            sx={{
              ...indicatorCss.absoluteItem,
              bgcolor: "success.light",
              color: "success.contrastText",
            }}
          >
            <CheckRoundedIcon />
          </Box>
        </Grow>
        <Grow in={status === "FAILED"}>
          <Box
            sx={{
              ...indicatorCss.absoluteItem,
              bgcolor: "error.light",
              color: "error.contrastText",
            }}
          >
            <CloseRoundedIcon />
          </Box>
        </Grow>
      </Box>
      <Grow in={status === "FAILED" || status === "SUCCEEDED"}>
        <Box sx={indicatorCss.item}>
          {status === "FAILED" && (
            <IconButton
              color="error"
              size="large"
              onClick={handleReplayButtonClick}
            >
              <ReplayRoundedIcon />
            </IconButton>
          )}
          {status === "SUCCEEDED" && (
            <IconButton
              color="success"
              size="large"
              onClick={handlePlayButtonClick}
            >
              <PlayArrowRoundedIcon />
            </IconButton>
          )}
        </Box>
      </Grow>
    </Box>
  );
};

export default Indicator;
