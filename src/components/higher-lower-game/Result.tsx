import { ChannelData, Nicknames } from "@/types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import RankingListItem from "../common/RankingListItem";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import html2canvas from "html2canvas";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useRouter } from "next/router";

interface ResultProps {
  displayName?: string | null;
  channelId?: string;
  rank?: number;
  score?: number;
  nicknames: Nicknames;
}

const Result: React.FC<ResultProps> = (props) => {
  const { channelId, displayName, rank, score, nicknames } = props;
  const router = useRouter();

  if (
    displayName == null ||
    channelId === undefined ||
    rank === undefined ||
    score === undefined
  ) {
    return null;
  }

  const handleShareButtonClick = () => {
    const targetElement = document.querySelector("#target") as HTMLElement;
    targetElement.style.paddingRight = "0px";
    html2canvas(targetElement).then((canvas) => {
      targetElement.style.paddingRight = "100px";
      canvas.toBlob(async (blob) => {
        if (blob === null) {
          return;
        }

        const { title: channelTitle } = (
          await getDoc(doc(db, "channels", channelId))
        ).data() as ChannelData;

        await navigator.share({
          text: `나의 작은 유튜버 - ${channelTitle}`,
          url: `https://mylittleyoutuber.com/channel/${channelId}?tab=ranking`,
          files: [
            new File([blob], `my-little-youtuber.png`, { type: blob.type }),
          ],
        });
      });
    });
  };

  const handleArrowButtonClick = () => {
    router.push(`/channel/${channelId}?tab=ranking`);
  };

  return (
    <>
      <Box
        id="target"
        sx={[
          { pr: "56px" },
          typeof navigator.share !== "undefined" && {
            pr: "100px",
          },
        ]}
      >
        <RankingListItem
          rank={rank}
          nickname={nicknames[channelId] ?? displayName}
          score={score}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          gap: 1,
        }}
      >
        {typeof navigator.share !== "undefined" && (
          <IconButton onClick={handleShareButtonClick}>
            <ShareRoundedIcon fontSize="small" />
          </IconButton>
        )}
        <IconButton onClick={handleArrowButtonClick}>
          <ArrowForwardIosRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </>
  );
};

export default Result;
