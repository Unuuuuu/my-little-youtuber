import { SxProps, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";
import CountUp from "react-countup";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { higherLowerGameActions } from "@/redux/slices/higherLowerGameSlice";
import { useEffect, useRef } from "react";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import { SystemStyleObject } from "@mui/system";
import Fade from "@mui/material/Fade";
import Skeleton from "@mui/material/Skeleton";
import ButtonBase from "@mui/material/ButtonBase";

const getInterfaceCss = (isPc: boolean, index: number) => ({
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
    color: "youtube",
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

const Interface = () => {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("lg"));
  const {
    userId,
    isInitialized,
    randomVideos,
    higherRandomVideo,
    status,
    mode,
  } = useAppSelector((state) => ({
    userId: state.user.uid,
    isInitialized: state.higherLowerGame.isInitialized,
    randomVideos: state.higherLowerGame.randomVideos,
    higherRandomVideo: state.higherLowerGame.higherRandomVideo,
    status: state.higherLowerGame.status,
    mode: state.higherLowerGame.mode,
  }));
  const dispatch = useAppDispatch();

  const handleVideoClick = (videoId: string) => {
    dispatch(higherLowerGameActions.click(videoId));
  };

  const handleYoutubeModalButtonClick = (videoId: string) => {
    dispatch(higherLowerGameActions.openYoutubeModal(videoId));
  };

  const handleCountUpEnd = () => {
    dispatch(higherLowerGameActions.compare(userId));
  };

  return (
    <Box
      sx={[
        {
          width: "100%",
          height: "100%",
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
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
            const interfaceCss = getInterfaceCss(isPc, index);

            return (
              <Box key={video.id} sx={interfaceCss.videoContainer}>
                <ButtonBase
                  centerRipple
                  disableRipple={status === "SUCCEEDED" || status === "FAILED"}
                  sx={[
                    interfaceCss.imageContainer,
                    {
                      position: "relative",
                      bgcolor: "black",
                      overflow: "hidden",
                      boxShadow: 2,
                    },
                    status !== "IDLE" && {
                      cursor: "default",
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
                  <Fade in={status !== "IDLE"} timeout={500}>
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
                          variant={isPc ? "h3" : "h4"}
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
                </ButtonBase>
                <Box sx={interfaceCss.titleContainer}>
                  <Typography
                    variant="h6"
                    component="h2"
                    noWrap
                    sx={{ px: "32px", textAlign: "center" }}
                  >
                    {video.title}
                  </Typography>
                  {mode === "GENERAL" && (
                    <PlayCircleRoundedIcon
                      sx={interfaceCss.playCircleRoundedIcon}
                      onClick={() => handleYoutubeModalButtonClick(video.id)}
                    />
                  )}
                </Box>
              </Box>
            );
          })
        : [0, 1].map((index) => {
            const interfaceCss = getInterfaceCss(isPc, index);

            return (
              <Box key={index} sx={interfaceCss.videoContainer}>
                <Skeleton variant="rounded" sx={interfaceCss.imageContainer} />
                <Box sx={interfaceCss.titleContainer}>
                  {mode === "GENERAL" && (
                    <PlayCircleRoundedIcon
                      sx={interfaceCss.playCircleRoundedIcon}
                    />
                  )}
                </Box>
              </Box>
            );
          })}
    </Box>
  );
};

export default Interface;
