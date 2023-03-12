import IconButton from "@mui/material/IconButton";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import html2canvas from "html2canvas";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { ChannelData } from "@/types";

const ShareButton = () => {
  const router = useRouter();
  const channelId = router.query.channelId as string;

  if (typeof navigator.share === "undefined") {
    return null;
  }

  const handleShareButtonClick = () => {
    html2canvas(document.querySelector("#target")!).then((canvas) => {
      canvas.toBlob(async (blob) => {
        if (blob === null) {
          return;
        }

        const { title: channelTitle } = (
          await getDoc(doc(db, "channels", channelId))
        ).data() as ChannelData;

        await navigator.share({
          title: `나의 작은 유튜버`,
          text: channelTitle,
          url: `https://mylittleyoutuber.com/channel/${channelId}?tab=ranking`,
          files: [
            new File([blob], `my-little-youtuber.png`, { type: blob.type }),
          ],
        });
      });
    });
  };

  return (
    <IconButton onClick={handleShareButtonClick}>
      <ShareRoundedIcon fontSize="small" />
    </IconButton>
  );
};

export default ShareButton;
