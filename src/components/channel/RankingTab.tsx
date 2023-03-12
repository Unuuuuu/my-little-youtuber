import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { ChannelData, ScoreData } from "@/types";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Empty from "../common/Empty";
import RankingListItem from "../common/RankingListItem";
import { getNicknameFromUserId } from "@/utils/function";
import { useAppSelector } from "@/redux/hooks";

interface ScoreDataWithNickname extends ScoreData {
  nickname: string;
}

const RankingTab = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [scoreDatasWithNickname, setScoreDatasWithNickname] = useState<
    ScoreDataWithNickname[]
  >([]);
  const { userId, displayName, nicknames } = useAppSelector((state) => ({
    userId: state.user.uid,
    displayName: state.user.displayName,
    nicknames: state.user.nicknames,
  }));

  const channelId = router.query.channelId as string;

  useEffect(() => {
    setScoreDatasWithNickname((prev) =>
      prev.map((value) => {
        if (value.userId === userId) {
          return {
            ...value,
            nickname: nicknames[channelId] ?? displayName ?? "Empty nickname",
          };
        }

        return value;
      })
    );
  }, [channelId, displayName, nicknames, userId]);

  useEffect(() => {
    const channelDocRef = doc(db, "channels", channelId);

    getDoc(channelDocRef).then(async (channelDocSnapshot) => {
      const { scores: scoreDatas } = channelDocSnapshot.data() as ChannelData;

      const newScoreDatasWithNickname = [];
      for (const scoreData of scoreDatas) {
        const nickname = await getNicknameFromUserId(
          scoreData.userId,
          channelId
        );
        newScoreDatasWithNickname.push({
          userId: scoreData.userId,
          nickname,
          score: scoreData.score,
        });
      }

      setScoreDatasWithNickname(newScoreDatasWithNickname);
      setIsLoading(false);
    });
  }, [channelId]);

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (scoreDatasWithNickname.length === 0) {
    return <Empty title="랭킹이 없습니다" subtitle="순위권에 도전해보세요" />;
  }

  return (
    <Box
      component={"ul"}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      {scoreDatasWithNickname.map((scoreDataWithNickname, index) => (
        <RankingListItem
          key={scoreDataWithNickname.userId}
          rank={index + 1}
          nickname={scoreDataWithNickname.nickname}
          score={scoreDataWithNickname.score}
          active={scoreDataWithNickname.userId === userId}
        />
      ))}
    </Box>
  );
};

export default RankingTab;
