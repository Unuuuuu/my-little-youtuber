import { db } from "@/lib/firebase";
import { useAppSelector } from "@/lib/hooks";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Skeleton from "@mui/material/Skeleton";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import RankingListItem from "../../components/RankingListItem";
import { useChannelContext } from "./ChannelContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useRouter } from "next/navigation";

interface Props {
  isExpanded: boolean;
}

export default function RankGameResult(props: Props) {
  const { id: channelId, title: channelTitle } = useChannelContext();
  const { gameMode, gameStatus, score, nicknames, userId, displayName } =
    useAppSelector((state) => ({
      gameMode: state.game.gameMode,
      gameStatus: state.game.gameStatus,
      score: state.game.score,
      nicknames: state.user.nicknames,
      displayName: state.user.displayName,
      userId: state.user.id,
    }));
  const [isLoading, setIsLoading] = useState(true);
  const [highScore, setHighScore] = useState<number>();
  const [rank, setRank] = useState<number>();
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const nickname = nicknames[channelId];
  const router = useRouter();

  useEffect(() => {
    if (
      gameMode === "RANK" &&
      gameStatus === "FAILED" &&
      score > 0 &&
      userId !== undefined
    ) {
      getDocs(
        query(
          collection(db, "channels", channelId, "scores"),
          orderBy("score", "desc")
        )
      ).then((querySnapshot) => {
        const scores = (
          querySnapshot.docs as QueryDocumentSnapshot<ScoreData>[]
        ).map((doc) => doc.data());

        const scoreDocRef = doc(db, "channels", channelId, "scores", userId);

        const foundIndex = scores.findIndex((value) => value.userId === userId);
        if (foundIndex === -1) {
          // 이전에 기록했던 점수가 없는 경우

          setDoc(scoreDocRef, {
            userId,
            nickname: nickname ?? displayName,
            score,
            createdAt: serverTimestamp(),
          });

          updateDoc(doc(db, "channels", channelId), {
            scoresSize: querySnapshot.size + 1,
          });

          const targetIndex = scores.findIndex((value) => value.score < score);
          if (targetIndex === -1) {
            // 내 점수보다 낮은 점수가 없는 경우
            setRank(scores.length + 1);
          } else {
            // 내 점수보다 낮은 점수가 있는 경우
            setRank(targetIndex + 1);
          }
          setHighScore(score);
        } else {
          // 이전에 기록했던 점수가 있는 경우
          if (scores[foundIndex].score < score) {
            // 이번에 받은 점수가 더 높은 경우

            updateDoc(scoreDocRef, {
              score,
              createdAt: serverTimestamp(),
            });

            const targetIndex = scores.findIndex(
              (value) => value.score < score
            );
            if (targetIndex === -1) {
              // 내 점수보다 낮은 점수가 없는 경우
              setRank(scores.length + 1);
            } else {
              // 내 점수보다 낮은 점수가 있는 경우
              setRank(targetIndex + 1);
            }
            setHighScore(score);
          } else {
            // 이번에 받은 점수가 같거나 낮은 경우
            setRank(foundIndex + 1);
            setHighScore(scores[foundIndex].score);
          }
        }

        setIsLoading(false);
      });

      return () => {
        setIsLoading(true);
      };
    }
  }, [channelId, displayName, gameMode, gameStatus, nickname, score, userId]);

  const handleShareButtonClick = async () => {
    await navigator.share({
      text: `나의 작은 유튜버, ${channelTitle}에서 ${highScore}점을 기록했어요!`,
      url: `https://mylittleyoutuber.com/channel/${channelId}`,
    });
  };

  const handleArrowButtonClick = () => {
    router.push(`/channel/${channelId}`);
  };

  return (
    <Fade
      in={
        gameMode === "RANK" &&
        gameStatus === "FAILED" &&
        score > 0 &&
        props.isExpanded
      }
    >
      <Box
        sx={[
          {
            maxWidth: 304,
            width: "calc(100vw - 32px)",
            position: "absolute",
            bottom: 64,
            left: 0,
            transform: "translateX(calc(-50% + 24px))",
            borderRadius: 2,
            boxShadow: 2,
            bgcolor: "white",
          },
          isLg && {
            bottom: 128,
          },
        ]}
      >
        {!isLoading && rank !== undefined && highScore !== undefined ? (
          <Box sx={{ display: "flex", pr: 1.5 }}>
            <Box sx={{ flex: 1, overflow: "hidden" }}>
              <RankingListItem
                nickname={nickname ?? displayName!}
                rank={rank}
                score={highScore}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {typeof navigator.share !== "undefined" && (
                <IconButton onClick={handleShareButtonClick}>
                  <ShareRoundedIcon fontSize="small" />
                </IconButton>
              )}
              <IconButton onClick={handleArrowButtonClick}>
                <ArrowForwardIosRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <Skeleton
              variant="circular"
              width={48}
              height={48}
              animation="wave"
            />
            <Box sx={{ flex: 1 }}>
              <Skeleton animation="wave" sx={{ fontSize: 16 }} />
              <Skeleton animation="wave" sx={{ fontSize: 14 }} />
            </Box>
          </Box>
        )}
      </Box>
    </Fade>
  );
}
