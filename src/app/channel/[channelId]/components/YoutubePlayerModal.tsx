"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { modalSliceActions } from "@/lib/slices/modalSlice";
import YouTube, { YouTubeProps } from "react-youtube";
import styled from "@emotion/styled";
import { useCallback, useEffect } from "react";

const StyledYouTube = styled(({ className, ...props }: YouTubeProps) => (
  <YouTube iframeClassName={className} {...props} />
))`
  width: 100%;
  border-radius: 8px;
`;

export default function YoutubePlayerModal() {
  const { isYoutubePlayerModalOpen, youtubePlayerVideoId } = useAppSelector(
    (state) => ({
      isYoutubePlayerModalOpen: state.modal.isYoutubePlayerModalOpen,
      youtubePlayerVideoId: state.modal.youtubePlayerVideoId,
    })
  );
  const dispatch = useAppDispatch();

  const handleModalClose = useCallback(() => {
    dispatch(modalSliceActions.closeYoutubePlayerModal());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      handleModalClose();
    };
  }, [handleModalClose]);

  return (
    <Modal
      open={isYoutubePlayerModalOpen}
      onClose={handleModalClose}
      sx={{
        p: 2,
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
          videoId={youtubePlayerVideoId}
          opts={{ playerVars: { modestbranding: 1 } }}
        />
      </Box>
    </Modal>
  );
}
