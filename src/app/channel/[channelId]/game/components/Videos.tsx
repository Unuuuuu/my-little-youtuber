"use client";

import PlayIcon from "@/components/PlayIcon";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { gameSliceActions } from "@/lib/slices/gameSlice";
import { youtubePlayerModalSliceSliceActions } from "@/lib/slices/youtubePlayerModalSlice";
import { Grow } from "@mui/material";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Fade from "@mui/material/Fade";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import CountUp from "react-countup";

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
  const dispatch = useAppDispatch();
  const {
    isInitialized,
    gameMode,
    gameStatus,
    randomVideos,
    higherRandomVideo,
  } = useAppSelector((state) => ({
    isInitialized: state.game.isInitialized,
    gameMode: state.game.gameMode,
    gameStatus: state.game.gameStatus,
    randomVideos: state.game.randomVideos,
    higherRandomVideo: state.game.higherRandomVideo,
  }));

  const handleVideoClick = (videoId: string) => {
    dispatch(gameSliceActions.select(videoId));
  };

  const handleCountUpEnd = () => {
    dispatch(gameSliceActions.compare());
  };

  const handleYoutubeButtonClick = (videoId: string) => {
    dispatch(youtubePlayerModalSliceSliceActions.open(videoId));
  };

  const getElement = (index: number, video: VideoData) => (
    <Box
      sx={[
        {
          position: "absolute",
          top: 0,
          right: 0,
          p: "12px",
          cursor: "pointer",
        },
        index === 1 && {
          top: { sm: "auto", md: 0 },
          bottom: { sm: 0, md: "auto" },
        },
      ]}
    >
      <ButtonBase
        sx={{
          height: "36px",
          bgcolor: "rgba(66, 66, 66, 0.7)",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "18px",
          display: "flex",
          gap: "8px",
          p: "0 15px 0 13px",
        }}
        onClick={() => handleYoutubeButtonClick(video.id)}
      >
        <PlayIcon sx={{ color: "white" }} />
        <Typography
          sx={{
            fontSize: "14px",
            lineHeight: "16px",
            fontWeight: 400,
            color: "white",
          }}
        >
          재생
        </Typography>
      </ButtonBase>
    </Box>
  );

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: {
          sm: "column",
          md: "row",
        },
        gap: "16px",
      }}
    >
      {isInitialized
        ? (randomVideos ?? []).map((video, index) => (
            <Box
              key={video.id}
              sx={[
                {
                  width: {
                    md: "calc((100% - 24px) / 2)",
                  },
                  flex: 1,
                  display: "flex",
                  flexDirection: { sm: "column", md: "column-reverse" },
                  py: { sm: "0px", md: "24px" },
                },
                index === 1 && {
                  flexDirection: { sm: "column-reverse" },
                },
              ]}
            >
              <Box
                sx={[
                  {
                    p: {
                      sm: "16px 0 12px",
                      md: "12px 0 16px",
                    },
                    flexShrink: 0,
                  },
                  index === 1 && {
                    p: {
                      sm: "12px 0 16px",
                      md: "12px 0 16px",
                    },
                  },
                ]}
              >
                <Typography noWrap variant="body1" sx={{ textAlign: "center" }}>
                  {video.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  position: "relative",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <ButtonBase
                  centerRipple
                  sx={{
                    width: "100%",
                    height: "100%",
                    bgcolor: "black",
                    position: "relative",
                  }}
                  onClick={() => handleVideoClick(video.id)}
                >
                  <Image
                    src={video.thumbnail.url}
                    alt="video thumbnail"
                    placeholder="blur"
                    blurDataURL={video.thumbnail.blurDataURL}
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
                          gap: "16px",
                        }}
                      >
                        {higherRandomVideo && (
                          <Typography
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
                            sx={{
                              color: "white",
                              fontSize: {
                                sm: "40px",
                                md: "48px",
                              },
                              lineHeight: "28px",
                              fontWeight: 300,
                            }}
                          />
                        )}
                        <Fade in={gameStatus !== "PENDING"}>
                          <Typography
                            component={"span"}
                            sx={{
                              color: "white",
                              fontSize: "20px",
                              lineHeight: "28px",
                              fontWeight: 400,
                            }}
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
                {gameMode === "GENERAL" ? (
                  getElement(index, video)
                ) : (
                  <Grow
                    in={gameStatus === "FAILED" || gameStatus === "SUCCEEDED"}
                  >
                    {getElement(index, video)}
                  </Grow>
                )}
              </Box>
            </Box>
          ))
        : Array.from({ length: 2 }, (_, i) => i).map((index) => {
            return (
              <Box
                key={index}
                sx={[
                  {
                    flex: 1,
                    display: "flex",
                    flexDirection: { sm: "column", md: "column-reverse" },
                    py: { sm: "0px", md: "24px" },
                  },
                  index === 1 && { flexDirection: "column-reverse" },
                ]}
              >
                <Box sx={[{ height: "48px", flexShrink: 0 }]}></Box>
                <Skeleton
                  variant="rounded"
                  sx={{
                    flex: 1,
                    borderRadius: "8px",
                  }}
                />
              </Box>
            );
          })}
    </Box>
  );
}
