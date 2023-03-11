import { SxProps, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";
import CountUp from "react-countup";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { higherLowerGameActions } from "@/redux/slices/higherLowerGameSlice";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import { SystemStyleObject } from "@mui/system";
import Fade from "@mui/material/Fade";
import Skeleton from "@mui/material/Skeleton";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import { useEffect, useState } from "react";

const LS_KEY_YOUTUBE_MODAL_GUIDE = "youtube_modal_guide";

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
    bottom: "4px",
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
  const [isYoutubeModalGuideBackdropOpen, setIsYoutubeModalGuideBackdropOpen] =
    useState(false);

  const handleVideoClick = (videoId: string) => {
    dispatch(higherLowerGameActions.click(videoId));
  };

  const handleYoutubeModalButtonClick = (videoId: string) => {
    dispatch(higherLowerGameActions.openYoutubeModal(videoId));
  };

  const handleCountUpEnd = () => {
    dispatch(higherLowerGameActions.compare(userId));
  };

  const handleConfirmButtonClick = () => {
    localStorage.setItem(LS_KEY_YOUTUBE_MODAL_GUIDE, "true");
    setIsYoutubeModalGuideBackdropOpen(false);
  };

  useEffect(() => {
    const youtubeModalGuideValue = localStorage.getItem(
      LS_KEY_YOUTUBE_MODAL_GUIDE
    );
    if (youtubeModalGuideValue === null) {
      setIsYoutubeModalGuideBackdropOpen(true);
    }
  }, []);

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
                        <Box
                          sx={[
                            {
                              display: "flex",
                              flexDirection: "column",
                              color: "white",
                              position: "relative",
                              top: 16,
                            },
                          ]}
                        >
                          <Typography
                            variant={isPc ? "h3" : "h4"}
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
                          <Fade in={status !== "PENDING"}>
                            <Typography
                              variant={isPc ? "h5" : "h6"}
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
                      sx={[
                        interfaceCss.playCircleRoundedIcon,
                        index === 1 && {
                          bgcolor: "white",
                          borderRadius: "50%",
                          zIndex: 2,
                        },
                      ]}
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
      <Backdrop open={isYoutubeModalGuideBackdropOpen} sx={{ zIndex: 1 }}>
        <Box
          sx={{
            position: "absolute",
            bottom: 52,
            right: 16,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 2,
            py: 1,
            pl: 2,
            pr: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography fontSize={14} sx={{ whiteSpace: "nowrap" }}>
            유튜브 영상을 재생시켜 볼 수 있습니다.
          </Typography>
          <Button
            size="small"
            sx={{ minWidth: 48 }}
            onClick={handleConfirmButtonClick}
          >
            확인
          </Button>
        </Box>
      </Backdrop>
    </Box>
  );
};

export default Interface;
