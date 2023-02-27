import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Grow from "@mui/material/Grow";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { higherLowerGameActions } from "@/redux/slices/higherLowerGameSlice";
import { SxProps, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";

const indicatorCss: { [key: string]: SxProps } = {
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
  },
  absoluteItem: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
};

const Indicator = () => {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("lg"));
  const status = useAppSelector((state) => state.higherLowerGame.status);
  const dispatch = useAppDispatch();

  const handleReplayButtonClick = () => {
    dispatch(higherLowerGameActions.reset());
  };

  const handlePlayButtonClick = () => {
    dispatch(higherLowerGameActions.next());
  };

  return (
    <Box
      sx={[
        {
          width: 176,
          height: 48,
          position: "absolute",
          top: "calc((100% + 64px) / 2)",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "row-reverse",
          gap: 2,
        },
        isPc && {
          width: 48,
          height: 176,
          top: "50%",
          flexDirection: "column",
        },
      ]}
    >
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
    </Box>
  );
};

export default Indicator;
