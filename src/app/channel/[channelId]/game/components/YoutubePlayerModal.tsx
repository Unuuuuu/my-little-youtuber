"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import YouTube, { YouTubeProps } from "react-youtube";
import styled from "@emotion/styled";
import { useCallback, useEffect } from "react";
import { youtubePlayerModalSliceSliceActions } from "@/lib/slices/youtubePlayerModalSlice";

const StyledYouTube = styled(({ className, ...props }: YouTubeProps) => (
  <YouTube iframeClassName={className} {...props} />
))`
  width: 100%;
  border-radius: 8px;
`;

export default function YoutubePlayerModal() {
  const { isOpen, videoId } = useAppSelector((state) => ({
    isOpen: state.youtubePlayerModal.isOpen,
    videoId: state.youtubePlayerModal.videoId,
  }));
  const dispatch = useAppDispatch();

  const handleModalClose = useCallback(() => {
    dispatch(youtubePlayerModalSliceSliceActions.close());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      handleModalClose();
    };
  }, [handleModalClose]);

  return (
    <Modal
      open={isOpen}
      onClose={handleModalClose}
      sx={{
        p: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 672,
          borderRadius: 2,
          outline: "none",
        }}
      >
        <StyledYouTube
          videoId={videoId}
          opts={{ playerVars: { modestbranding: 1 } }}
        />
      </Box>
    </Modal>
  );
}
