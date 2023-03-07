import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Grow from "@mui/material/Grow";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { higherLowerGameActions } from "@/redux/slices/higherLowerGameSlice";
import { keyframes, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import LocalFireDepartmentTwoToneIcon from "@mui/icons-material/LocalFireDepartmentTwoTone";

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

const Indicator = () => {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("lg"));
  const { userId, status, streak, mode, score, time } = useAppSelector(
    (state) => ({
      userId: state.user.uid,
      status: state.higherLowerGame.status,
      streak: state.higherLowerGame.streak,
      mode: state.higherLowerGame.mode,
      score: state.higherLowerGame.score,
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
    if (mode === "GENERAL" || status !== "IDLE") {
      return;
    }

    if (time === 0) {
      dispatch(higherLowerGameActions.fail(userId));
      return;
    }

    const timeoutId = setInterval(() => {
      dispatch(higherLowerGameActions.updateTime());
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, mode, status, time, userId]);

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
          alignItems: "center",
        },
      ]}
    >
      <Box
        sx={{
          position: "relative",
          width: 48,
          height: 48,
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
            isPc && {
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
              status === "SUCCEEDED" && {
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
              {mode === "GENERAL" ? streak : score}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: 48,
          height: 48,
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
            {mode === "GENERAL" ? "VS" : time}
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
      </Box>
      <Box
        sx={{
          position: "relative",
          width: 48,
          height: 48,
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
