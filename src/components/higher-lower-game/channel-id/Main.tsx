import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";
import YouTubeModal from "./YouTubeModal";
import { Fade } from "@mui/material";
import CountUp from "react-countup";
import Indicator from "./Indicator";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { higherLowerGameActions } from "@/redux/slices/higherLowerGameSlice";
import { useEffect, useRef } from "react";

const Main = () => {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("lg"));
  const { selectedVideos, status } = useAppSelector((state) => ({
    selectedVideos: state.higherLowerGame.selectedVideos,
    status: state.higherLowerGame.status,
  }));
  const dispatch = useAppDispatch();
  const failAudioRef = useRef<HTMLAudioElement>(null);
  const successAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    switch (status) {
      case "PENDING":
        failAudioRef.current?.load();
        successAudioRef.current?.load();
        break;
      case "FAILED":
        failAudioRef.current?.play();
        break;
      case "SUCCEEDED":
        successAudioRef.current?.play();
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
      {selectedVideos.map((video, index) => (
        <Box
          key={video.id}
          sx={[
            {
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            },
            index === 0 && {
              flexDirection: "column-reverse",
            },
            isPc && {
              flexGrow: 0,
              flexDirection: "column",
              width: "calc((100% - 16px) / 2)",
            },
          ]}
        >
          <Box
            sx={[
              {
                flexGrow: 1,
                position: "relative",
                bgcolor: "black",
                borderRadius: 3,
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
              blurDataURL={video.thumbnail.placeholder}
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
                    end={Number(video.viewCount)}
                    separator=","
                    suffix="회"
                    onEnd={() => {
                      if (index === 0) {
                        handleCountUpEnd();
                      }
                    }}
                  />
                )}
              </Box>
            </Fade>
          </Box>
          <Box
            sx={{
              flexBasis: 32,
              py: 2,
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              noWrap
              sx={{
                fontWeight: 600,
                flexGrow: 1,
              }}
            >
              {video.title}
            </Typography>
            <YouTubeIcon
              sx={{ color: "#FF0000", cursor: "pointer", fontSize: 28 }}
              onClick={() => handleYoutubeModalButtonClick(video.id)}
            />
          </Box>
        </Box>
      ))}
      <YouTubeModal />
      <Indicator />
      <audio ref={failAudioRef} src="/sounds/fail.mp3" />
      <audio ref={successAudioRef} src="/sounds/success.mp3" />
    </Box>
  );
};

export default Main;
