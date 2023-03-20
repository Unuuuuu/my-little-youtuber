"use client";

import { useAppDispatch } from "@/lib/hooks";
import { modalSliceActions } from "@/lib/slices/modalSlice";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import Box from "@mui/material/Box";
import Image from "next/image";
import { useChannelContext } from "./ChannelContext";

export default function BannerSection() {
  const dispatch = useAppDispatch();
  const { video } = useChannelContext();

  const handleClick = () => {
    dispatch(modalSliceActions.openYoutubePlayerModal(video.id));
  };

  return (
    <Box
      component={"section"}
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
  );
}
