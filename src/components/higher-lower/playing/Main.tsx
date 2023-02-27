import { SxProps, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";
import YouTubeModal from "./YouTubeModal";
import { Fade, Skeleton } from "@mui/material";
import CountUp from "react-countup";
import Indicator from "./Indicator";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { higherLowerGameActions } from "@/redux/slices/higherLowerGameSlice";
import { useEffect, useRef } from "react";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import { SystemStyleObject } from "@mui/system";

const getMainCss = (isPc: boolean, index: number) => ({
  videoContainer: [
    {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    },
    index === 0 && {
      flexDirection: "column-reverse",
    },
    isPc && {
      flexGrow: 0,
      flexDirection: "column",
      width: "calc((100% - 16px) / 2)",
    },
  ] as SxProps,
  imageContainer: {
    flexGrow: 1,
    borderRadius: 3,
  } as SystemStyleObject,
  titleContainer: {
    position: "relative",
    flexBasis: 32,
    my: 2,
  } as SystemStyleObject,
  playCircleRoundedIcon: {
    color: "#FF0000",
    fontSize: 24,
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: 0,
  } as SystemStyleObject,
});

const getDurationFromViewCount = (
  viewCount: number,
  higherViewCount: number
): number => {
  // 100,000 > 2
  // 1,000 > 0.2
  const duration = viewCount / (higherViewCount / 2);
  return duration;
};

const Main = () => {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("lg"));
  const { isInitialized, randomVideos, higherRandomVideo, status } =
    useAppSelector((state) => ({
      isInitialized: state.higherLowerGame.isInitialized,
      randomVideos: state.higherLowerGame.randomVideos,
      higherRandomVideo: state.higherLowerGame.higherRandomVideo,
      status: state.higherLowerGame.status,
    }));
  const dispatch = useAppDispatch();
  const failAudioRef = useRef<HTMLAudioElement>(null);
  const successAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (failAudioRef.current === null || successAudioRef.current === null) {
      return;
    }

    switch (status) {
      case "PENDING":
        failAudioRef.current.load();
        successAudioRef.current.load();
        break;
      case "FAILED":
        failAudioRef.current.volume = 0.25;
        failAudioRef.current.play();
        break;
      case "SUCCEEDED":
        successAudioRef.current.play();
        break;
    }
  }, [status]);

  const handleVideoClick = (videoId: string) => {
    dispatch(higherLowerGameActions.click(videoId));
  };

  const handleYoutubeModalButtonClick = (videoId: string) => {
    dispatch(higherLowerGameActions.openYoutubeModal(videoId));
  };

  const handleCountUpEnd = () => {
    dispatch(higherLowerGameActions.compare());
  };

  return (
    <Box
      component={"main"}
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 64px)",
          gap: 2,
          px: 2,
        },
        isPc && {
          flexDirection: "row",
        },
      ]}
    >
      {isInitialized &&
      randomVideos !== undefined &&
      higherRandomVideo !== undefined
        ? randomVideos.map((video, index) => {
            const mainCss = getMainCss(isPc, index);

            return (
              <Box key={video.id} sx={mainCss.videoContainer}>
                <Box
                  sx={[
                    mainCss.imageContainer,
                    {
                      position: "relative",
                      bgcolor: "black",
                      overflow: "hidden",
                      boxShadow: 2,
                    },
                    status === "IDLE" && {
                      cursor: "pointer",
                      ":hover": {
                        opacity: "0.9",
                      },
                    },
                  ]}
                  onClick={() => handleVideoClick(video.id)}
                >
                  <Box
                    component={Image}
                    placeholder="blur"
                    blurDataURL={video.thumbnail.blurDataURL}
                    src={video.thumbnail.url}
                    alt="thumbnail"
                    fill
                    sizes="(max-width: 1200px) 100vw, 50vw"
                    sx={{
                      objectFit: "contain",
                    }}
                  />
                  <Fade in={status !== "IDLE"}>
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
                      {status !== "IDLE" && (
                        <Typography
                          variant="h3"
                          component={CountUp}
                          sx={{ color: "white" }}
                          end={video.viewCount}
                          separator=","
                          suffix="회"
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
                      )}
                    </Box>
                  </Fade>
                </Box>
                <Box sx={mainCss.titleContainer}>
                  <Typography
                    variant="h6"
                    component="h2"
                    noWrap
                    sx={{ px: "32px", textAlign: "center" }}
                  >
                    {video.title}
                  </Typography>
                  <PlayCircleRoundedIcon
                    sx={mainCss.playCircleRoundedIcon}
                    onClick={() => handleYoutubeModalButtonClick(video.id)}
                  />
                </Box>
              </Box>
            );
          })
        : [0, 1].map((index) => {
            const mainCss = getMainCss(isPc, index);

            return (
              <Box key={index} sx={mainCss.videoContainer}>
                <Skeleton variant="rounded" sx={mainCss.imageContainer} />
                <Box sx={mainCss.titleContainer}>
                  <PlayCircleRoundedIcon sx={mainCss.playCircleRoundedIcon} />
                </Box>
              </Box>
            );
          })}
      <YouTubeModal />
      <Indicator />
      <audio ref={failAudioRef} src="/sounds/fail.mp3" />
      <audio ref={successAudioRef} src="/sounds/success.mp3" />
    </Box>
  );
};

export default Main;
