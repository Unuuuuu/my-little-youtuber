import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { higherLowerGameActions } from "@/redux/slices/higherLowerGameSlice";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import YouTube, { YouTubeProps } from "react-youtube";

const StyledYouTube = styled(({ className, ...props }: YouTubeProps) => (
  <YouTube iframeClassName={className} {...props} />
))`
  width: 100%;
  border-radius: 12px;
`;

const YouTubeModal = () => {
  const { isOpen, videoId } = useAppSelector((state) => ({
    isOpen: state.higherLowerGame.isYoutubeModalOpen,
    videoId: state.higherLowerGame.youtubeModalVideoId,
  }));
  const dispatch = useAppDispatch();

  const handleModalClose = () => {
    dispatch(higherLowerGameActions.closeYoutubeModal());
  };

  return (
    <Modal open={isOpen} onClose={handleModalClose}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "672px",
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <StyledYouTube
          videoId={videoId}
          opts={{ playerVars: { modestbranding: 1 } }}
        />
      </Box>
    </Modal>
  );
};

export default YouTubeModal;
