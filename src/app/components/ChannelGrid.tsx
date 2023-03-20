import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { default as Grid } from "@mui/material/Unstable_Grid2";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Image from "next/image";
import Link from "next/link";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { userSliceActions } from "@/lib/slices/userSlice";
import { snackbarSliceActions } from "@/lib/slices/snackbarSlice";
import { modalSliceActions } from "@/lib/slices/modalSlice";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Props {
  channels: Pick<
    ChannelData,
    "title" | "id" | "thumbnail" | "scoresSize" | "updateTime"
  >[];
}

export default function ChannelGrid(props: Props) {
  const { channels } = props;
  const [end, setEnd] = useState(23);
  const targetElementRef = useRef<HTMLDivElement | null>(null);
  const { isInitialized, isSignedIn, favoriteChannelIds } = useAppSelector(
    (state) => ({
      isInitialized: state.user.isInitialized,
      isSignedIn: state.user.isSignedIn,
      favoriteChannelIds: state.user.favoriteChannelIds,
    })
  );

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    if (targetElementRef.current === null || channels.length < end) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) {
          return;
        }

        setEnd((prev) => prev + 12);
        observer.unobserve(entry.target);
      },
      { root: document.querySelector("main"), rootMargin: "128px" }
    );

    observer.observe(targetElementRef.current);
  }, [channels.length, end]);

  const handleCheckboxChange = async (checked: boolean, channelId: string) => {
    if (!isInitialized) {
      return;
    }

    if (!isSignedIn) {
      dispatch(snackbarSliceActions.openLoginRequestSnackbar());
      return;
    }

    dispatch(userSliceActions.updateFavoriteChannel({ checked, channelId }));
  };

  const handleRequestButtonClick = () => {
    if (!isInitialized) {
      return;
    }

    if (!isSignedIn) {
      dispatch(snackbarSliceActions.openLoginRequestSnackbar());
      return;
    }

    dispatch(modalSliceActions.openYoutuberAddRequestModal());
  };

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid xs={12} sm={6} md={4} lg={3}>
        <Paper
          variant="outlined"
          sx={{
            height: 120,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 2 }}>
            <Skeleton
              variant="circular"
              width={48}
              height={48}
              animation={false}
            />
            <Box
              sx={{
                flex: 1,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography noWrap>나의 작은 유튜버</Typography>
              <Typography
                color="GrayText"
                fontSize={14}
                noWrap
                sx={{ width: "100%" }}
              >
                좋아하는 유튜브 채널 추가를 요청해보세요
              </Typography>
            </Box>
          </Box>
          <Box sx={{ borderTop: 1, borderColor: "divider" }}>
            <Button
              sx={{ borderRadius: 0 }}
              startIcon={<AddRoundedIcon />}
              fullWidth
              color="secondary"
              onClick={handleRequestButtonClick}
            >
              요청하기
            </Button>
          </Box>
        </Paper>
      </Grid>
      {channels.slice(0, end).map((channel, index, array) => (
        <Grid
          key={channel.id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          ref={(element) => {
            if (index === array.length - 1) {
              targetElementRef.current = element;
            }
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              height: 120,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 2 }}>
              <Box
                component={Link}
                href={`/channel/${channel.id}`}
                sx={{ flex: 1, display: "flex", gap: 1, overflow: "hidden" }}
              >
                <Image
                  placeholder="blur"
                  blurDataURL={channel.thumbnail.blurDataURL}
                  src={channel.thumbnail.url}
                  alt="channel thumbnail"
                  width={48}
                  height={48}
                  style={{ borderRadius: "50%" }}
                />
                <Box
                  sx={{
                    flex: 1,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography noWrap sx={{ width: "100%" }}>
                    {channel.title}
                  </Typography>
                  <Typography
                    sx={{ display: "flex", alignItems: "center" }}
                    color="GrayText"
                    fontSize={14}
                  >
                    {channel.scoresSize}명이 참여 중
                    <ChevronRightRoundedIcon
                      fontSize="small"
                      sx={{ ml: 0.5 }}
                    />
                  </Typography>
                </Box>
              </Box>
              <Checkbox
                checked={favoriteChannelIds.includes(channel.id)}
                icon={<StarOutlineRoundedIcon />}
                checkedIcon={<StarRoundedIcon />}
                onChange={(_, checked) => {
                  handleCheckboxChange(checked, channel.id);
                }}
                sx={{
                  color: "favorite",
                  "&.Mui-checked": {
                    color: "favorite",
                  },
                }}
              />
            </Box>
            <Box sx={{ borderTop: 1, borderColor: "divider" }}>
              <Button
                sx={{ borderRadius: 0 }}
                startIcon={<PlayArrowRoundedIcon />}
                fullWidth
                color="secondary"
                onClick={() => {
                  dispatch(
                    modalSliceActions.openGameModeModal({
                      channelId: channel.id,
                      channelUpdateTime: channel.updateTime,
                    })
                  );
                }}
              >
                게임하기
              </Button>
            </Box>
          </Paper>
        </Grid>
      ))}
      {channels.length >= end &&
        Array.from(
          { length: isLg ? 4 : isMd ? 3 : isSm ? 2 : 1 },
          () => undefined
        ).map((_, i) => (
          <Grid key={i} xs={12} sm={6} md={4} lg={3}>
            <Paper
              variant="outlined"
              sx={{
                height: 120,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 2 }}>
                <Skeleton
                  variant="circular"
                  width={48}
                  height={48}
                  animation="wave"
                />
                <Box
                  sx={{
                    flex: 1,
                    pr: "42px",
                  }}
                >
                  <Skeleton sx={{ fontSize: 16 }} animation="wave" />
                  <Skeleton sx={{ fontSize: 14 }} animation="wave" />
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
    </Grid>
  );
}
