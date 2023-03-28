"use client";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { snackbarSliceActions } from "@/lib/slices/snackbarSlice";
import { userSliceActions } from "@/lib/slices/userSlice";
import Button from "@mui/material/Button";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useChannelContext } from "./ChannelContext";
import { modalSliceActions } from "@/lib/slices/modalSlice";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import ChannelDisplayAd from "./ChannelDisplayAd";

export default function Header() {
  const { id, thumbnail, title, updateTime, video } = useChannelContext();
  const { isInitialized, isSignedIn, favoriteChannelIds } = useAppSelector(
    (state) => ({
      isInitialized: state.user.isInitialized,
      isSignedIn: state.user.isSignedIn,
      favoriteChannelIds: state.user.favoriteChannelIds,
    })
  );
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(modalSliceActions.openYoutubePlayerModal(video.id));
  };

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

  const handlePlayButtonClick = () => {
    dispatch(
      modalSliceActions.openGameModeModal({
        channelId: id,
        channelUpdateTime: updateTime,
      })
    );
  };

  return (
    <section id="info">
      <ChannelDisplayAd />
      <Box
        sx={{
          height: 270,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Image
          src={video.thumbnail.url}
          alt="channel video thumbnail"
          fill
          style={{ objectFit: "cover", cursor: "pointer" }}
          placeholder="blur"
          blurDataURL={video.thumbnail.blurDataURL}
          onClick={handleClick}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
          }}
        >
          <PlayCircleRoundedIcon
            fontSize="large"
            sx={{
              color: "youtube",
              cursor: "pointer",
              zIndex: 1,
            }}
            onClick={handleClick}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 16,
              height: 16,
              bgcolor: "white",
            }}
          ></Box>
        </Box>
      </Box>
      <Box sx={{ p: 2, pt: 0, height: 125, flexShrink: 0 }}>
        <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
          <Image
            placeholder="blur"
            blurDataURL={thumbnail.blurDataURL}
            src={thumbnail.url}
            alt="channel thumbnail"
            width={72}
            height={72}
            style={{
              borderRadius: "50%",
              position: "relative",
              top: -24,
              boxShadow:
                "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flex: 1,
              overflow: "hidden",
              mt: 1,
              gap: 1,
            }}
          >
            <Typography
              component={"h2"}
              fontSize={24}
              fontWeight={500}
              noWrap
              sx={{ my: "3px", flex: 1 }}
            >
              {title}
            </Typography>
            <Checkbox
              checked={favoriteChannelIds.includes(id)}
              icon={<StarOutlineRoundedIcon />}
              checkedIcon={<StarRoundedIcon />}
              onChange={(_, checked) => {
                handleCheckboxChange(checked, id);
              }}
              sx={{
                color: "favorite",
                "&.Mui-checked": {
                  color: "favorite",
                },
              }}
            />
          </Box>
        </Box>
        <Button
          startIcon={<PlayArrowRoundedIcon />}
          fullWidth
          color="secondary"
          variant="contained"
          onClick={handlePlayButtonClick}
        >
          게임하기
        </Button>
      </Box>
    </section>
  );
}
