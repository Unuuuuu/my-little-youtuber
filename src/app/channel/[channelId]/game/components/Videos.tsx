"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import Image from "next/image";
import { modalSliceActions } from "@/lib/slices/modalSlice";
import { gameSliceActions } from "@/lib/slices/gameSlice";
import Fade from "@mui/material/Fade";
import CountUp from "react-countup";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import Control from "./Control";

const getDurationFromViewCount = (
  viewCount: number,
  higherViewCount: number
): number => {
  // 100,000 > 2
  // 1,000 > 0.2
  const duration = viewCount / (higherViewCount / 2);
  return duration;
};

export default function Videos() {
  const {
    isSignedIn,
    isInitialized,
    gameMode,
    gameStatus,
    randomVideos,
    higherRandomVideo,
  } = useAppSelector((state) => ({
    isSignedIn: state.user.isSignedIn,
    userId: state.user.id,
    isInitialized: state.game.isInitialized,
    gameMode: state.game.gameMode,
    gameStatus: state.game.gameStatus,
    randomVideos: state.game.randomVideos,
    higherRandomVideo: state.game.higherRandomVideo,
  }));
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const handleYoutubeButtonClick = (videoId: string) => {
    dispatch(modalSliceActions.openYoutubePlayerModal(videoId));
  };

  const handleVideoClick = (videoId: string) => {
    dispatch(gameSliceActions.select(videoId));
  };

  const handleCountUpEnd = () => {
    dispatch(gameSliceActions.compare());
  };

  if (!isSignedIn && gameMode === "RANK") {
    return null;
  }

  return (
    <Box
      sx={[
        {
          position: "relative",
          width: "100%",
          height: "100%",
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        },
        isLg && {
          flexDirection: "row",
        },
      ]}
    >
      {isInitialized
        ? randomVideos !== undefined &&
          higherRandomVideo !== undefined &&
          randomVideos?.map((video, index) => {
            return (
              <Box
                key={video.id}
                sx={[
                  {
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column-reverse",
                  },
                  index === 1 && { flexDirection: "column" },
                  isLg && {
                    flexDirection: "column",
                    width: "calc((100% - 16px) / 2)",
                  },
                ]}
              >
                <Box
                  sx={{
                    flex: 1,
                    borderRadius: 2,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <ButtonBase
                    centerRipple
                    sx={{
                      width: "100%",
                      height: "100%",
                      bgcolor: "black",
                    }}
                    onClick={() => handleVideoClick(video.id)}
                  >
                    <Image
                      placeholder="blur"
                      blurDataURL={video.thumbnail.blurDataURL}
                      src={video.thumbnail.url}
                      alt="thumbnail"
                      fill
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </ButtonBase>
                  <Fade in={gameStatus !== "IDLE"}>
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "rgba(0,0,0,0.75)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {gameStatus !== "IDLE" && (
                        <Box
                          sx={{
                            color: "white",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            position: "relative",
                            top: 16,
                          }}
                        >
                          <Typography
                            variant={isLg ? "h3" : "h4"}
                            component={CountUp}
                            end={video.viewCount}
                            separator=","
                            useEasing={false}
                            duration={getDurationFromViewCount(
                              video.viewCount,
                              higherRandomVideo.viewCount
                            )}
                            onEnd={() => {
                              if (video.id === higherRandomVideo.id) {
                                handleCountUpEnd();
                              }
                            }}
                          />
                          <Fade in={gameStatus !== "PENDING"}>
                            <Typography
                              variant={isLg ? "h5" : "h6"}
                              component={"span"}
                            >
                              {new Intl.NumberFormat("ko", {
                                notation: "compact",
                              }).format(video.viewCount)}
                              회
                            </Typography>
                          </Fade>
                        </Box>
                      )}
                    </Box>
                  </Fade>
                </Box>
                <Box sx={{ position: "relative", py: "13px" }}>
                  <Typography
                    sx={{ flex: 1, px: "40px" }}
                    noWrap
                    fontSize={20}
                    textAlign="center"
                  >
                    {video.title}
                  </Typography>
                  {gameMode === "GENERAL" && (
                    <Tooltip
                      title="영상 재생하기"
                      placement={
                        !isLg && index === 0 ? "bottom-end" : "top-end"
                      }
                    >
                      <IconButton
                        id="guide-youtube-player-modal"
                        sx={{
                          color: "youtube",
                          position: "absolute",
                          right: 0,
                          top: 8,
                        }}
                        onClick={() => handleYoutubeButtonClick(video.id)}
                      >
                        <PlayCircleRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>
            );
          })
        : [0, 1].map((index) => {
            return (
              <Box
                key={index}
                sx={[
                  { flex: 1, display: "flex", flexDirection: "column-reverse" },
                  index === 1 && { flexDirection: "column" },
                  isLg && {
                    flexDirection: "column",
                  },
                ]}
              >
                <Skeleton variant="rounded" sx={{ flex: 1, borderRadius: 2 }} />
                <Box
                  sx={{
                    position: "relative",
                    height: 56,
                  }}
                >
                  {gameMode === "GENERAL" && (
                    <IconButton
                      sx={{
                        color: "youtube",
                        position: "absolute",
                        right: 0,
                        top: 8,
                      }}
                    >
                      <PlayCircleRoundedIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
            );
          })}
      <Control />
    </Box>
  );
}
