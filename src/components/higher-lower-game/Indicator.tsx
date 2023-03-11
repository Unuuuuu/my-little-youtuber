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
import { useEffect, useState } from "react";
import LocalFireDepartmentTwoToneIcon from "@mui/icons-material/LocalFireDepartmentTwoTone";
import Fade from "@mui/material/Fade";
import RankingListItem from "../common/RankingListItem";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { ChannelData, ScoreData } from "@/types";
import { getNicknameFromUserId } from "@/utils/function";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonBase from "@mui/material/ButtonBase";
import Link from "next/link";

const getNewScoreDatas = (
  prevScoreDatas: ScoreData[],
  userId: string,
  score: number
) => {
  let targetIndex = prevScoreDatas.findIndex((value) => value.score < score);
  let newScoreDatas: ScoreData[];

  if (targetIndex === -1) {
    newScoreDatas = [
      ...prevScoreDatas,
      {
        userId,
        score,
      },
    ];
    targetIndex = newScoreDatas.length - 1;
  } else {
    newScoreDatas = [
      ...prevScoreDatas.slice(0, targetIndex),
      { userId, score },
      ...prevScoreDatas.slice(targetIndex),
    ];
  }

  return {
    newScoreDatas,
    targetIndex,
  };
};

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
  const { userId, channelId, status, streak, mode, score, time, isResult } =
    useAppSelector((state) => ({
      userId: state.user.uid,
      channelId: state.higherLowerGame.channelId,
      status: state.higherLowerGame.status,
      streak: state.higherLowerGame.streak,
      mode: state.higherLowerGame.mode,
      score: state.higherLowerGame.score,
      time: state.higherLowerGame.time,
      isResult: state.higherLowerGame.isResult,
    }));
  const dispatch = useAppDispatch();
  const [state, setState] = useState<{
    isInitialized: boolean;
    rank?: number;
    nickname?: string;
    score?: number;
  }>({
    isInitialized: false,
  });

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

  useEffect(() => {
    if (channelId === undefined || userId === undefined) {
      return;
    }

    if (isResult) {
      const channelDocRef = doc(db, "channels", channelId);
      getDoc(channelDocRef).then(async (channelDocSnapshot) => {
        const { scores: scoreDatas } = channelDocSnapshot.data() as ChannelData;
        const nickname = await getNicknameFromUserId(userId);
        const foundIndex = scoreDatas.findIndex(
          (value) => value.userId === userId
        );

        if (foundIndex === -1) {
          // 없는 경우
          const { newScoreDatas, targetIndex } = getNewScoreDatas(
            scoreDatas,
            userId,
            score
          );

          updateDoc(channelDocRef, {
            scores: newScoreDatas,
          });

          setState({
            isInitialized: true,
            nickname,
            rank: targetIndex + 1,
            score,
          });
        } else {
          // 있는 경우
          if (scoreDatas[foundIndex].score < score) {
            // 이번에 받은 점수가 더 높은 경우
            const filteredScoreDatas = [
              ...scoreDatas.slice(0, foundIndex),
              ...scoreDatas.slice(foundIndex + 1),
            ];
            const { newScoreDatas, targetIndex } = getNewScoreDatas(
              filteredScoreDatas,
              userId,
              score
            );

            updateDoc(channelDocRef, {
              scores: newScoreDatas,
            });

            setState({
              isInitialized: true,
              nickname,
              rank: targetIndex + 1,
              score,
            });
          } else {
            // 이번에 받은 점수가 같거나 낮은 경우
            setState({
              isInitialized: true,
              nickname,
              rank: foundIndex + 1,
              score: scoreDatas[foundIndex].score,
            });
          }
        }
      });

      return () => {
        setState({ isInitialized: false });
      };
    }
  }, [channelId, isResult, score, userId]);

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
            {mode === "GENERAL" || !isResult || state.isInitialized ? (
              <CloseRoundedIcon />
            ) : (
              <CircularProgress size={24} sx={{ color: "white" }} />
            )}
          </Box>
        </Grow>
        <Fade in={isResult && state.isInitialized}>
          <Box>
            <Box
              component={Link}
              href={`/channel/${channelId}?tab=ranking`}
              sx={[
                {
                  width: 248,
                  position: "absolute",
                  left: 0,
                  bottom: 64,
                  transform: "translateX(calc(-50% + 24px))",
                  borderRadius: 2,
                  boxShadow: 2,
                  bgcolor: "white",
                },
                isPc && {
                  bottom: 128,
                },
              ]}
            >
              <ButtonBase
                sx={{
                  width: "100%",
                  ":hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                {state.rank !== undefined &&
                  state.nickname !== undefined &&
                  state.score !== undefined && (
                    <RankingListItem
                      rank={state.rank}
                      nickname={state.nickname}
                      score={state.score}
                    />
                  )}
              </ButtonBase>
            </Box>
          </Box>
        </Fade>
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
        <Grow
          in={
            status === "FAILED" &&
            (mode === "GENERAL" || !isResult || state.isInitialized)
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
