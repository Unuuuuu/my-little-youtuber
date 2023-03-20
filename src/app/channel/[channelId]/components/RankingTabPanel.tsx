import TabPanel, { Props as TabPanelProps } from "@/app/components/TabPanel";
import { useEffect, useState } from "react";
import { useChannelContext } from "./ChannelContext";
import {
  collection,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Box from "@mui/material/Box";
import RankingListItem from "./RankingListItem";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import LocalFireDepartmentTwoToneIcon from "@mui/icons-material/LocalFireDepartmentTwoTone";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "@/lib/hooks";
import CircularProgress from "@mui/material/CircularProgress";

interface Props extends Omit<TabPanelProps<ChannelTabsValue>, "children"> {}

function generateTopRankingListItemElement({
  nickname,
  score,
  rank,
}: {
  nickname: string;
  score: number;
  rank: number;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        height: 96,
        px: 2,
        border: 1,
        borderRadius: 2,
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -14,
          left: "50%",
          transform: "translateX(-50%)",
          bgcolor: "white",
        }}
      >
        <EmojiEventsTwoToneIcon
          sx={{
            color:
              rank === 1
                ? "goldTrophy"
                : rank === 2
                ? "silverTrophy"
                : "bronzeTrophy",
            fontSize: 32,
          }}
        />
      </Box>
      <Box sx={{ overflow: "hidden" }}>
        <Typography textAlign={"center"} noWrap>
          {nickname}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LocalFireDepartmentTwoToneIcon
            sx={{ color: "fire", fontSize: 16 }}
          />
          <Typography fontSize={14} color="GrayText">
            {score}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function RankingTabPanel(props: Props) {
  const { selectedValue, value } = props;
  const { id: channelId } = useChannelContext();
  const [isLoading, setIsLoading] = useState(true);
  const [scores, setScores] = useState<ScoreData[]>([]);
  const { userId, nicknames } = useAppSelector((state) => ({
    userId: state.user.id,
    nicknames: state.user.nicknames,
  }));

  useEffect(() => {
    getDocs(
      query(
        collection(db, "channels", channelId, "scores"),
        orderBy("score", "desc")
      )
    ).then((querySnapshot) => {
      const newScores = (
        querySnapshot.docs as QueryDocumentSnapshot<ScoreData>[]
      ).map((doc) => doc.data());
      setScores(newScores);
      setIsLoading(false);
    });
  }, [channelId]);

  useEffect(() => {
    setScores((prev) => {
      const foundIndex = prev.findIndex((value) => value.userId === userId);
      if (foundIndex === -1) {
        return prev;
      }

      const nickname = nicknames[channelId];
      if (nickname === undefined) {
        return prev;
      }

      return [
        ...prev.slice(0, foundIndex),
        { ...prev[foundIndex], nickname },
        ...prev.slice(foundIndex + 1),
      ];
    });
  }, [channelId, nicknames, userId]);

  return (
    <TabPanel<ChannelTabsValue> value={value} selectedValue={selectedValue}>
      <Box sx={{ p: 2, width: "100%", height: "100%" }}>
        {isLoading && (
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
        )}
        {!isLoading && scores.length === 0 && (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography fontSize={20}>랭킹이 없습니다</Typography>
            <Typography>순위권에 도전해보세요</Typography>
          </Box>
        )}
        {!isLoading &&
          scores.length !== 0 &&
          (scores.length < 4 ? (
            <Box
              component={"ul"}
              sx={{
                border: 1,
                borderRadius: 2,
                borderColor: "divider",
                overflow: "hidden",
              }}
            >
              {scores.map((value, index) => {
                return (
                  <RankingListItem
                    key={value.userId}
                    nickname={value.nickname}
                    rank={index + 1}
                    score={value.score}
                    isActive={value.userId === userId}
                  />
                );
              })}
            </Box>
          ) : (
            <>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}
              >
                {scores[0] !== undefined &&
                  generateTopRankingListItemElement({
                    ...scores[0],
                    rank: 1,
                  })}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ width: "calc(50% - 8px)" }}>
                    {scores[1] !== undefined &&
                      generateTopRankingListItemElement({
                        ...scores[1],
                        rank: 2,
                      })}
                  </Box>
                  <Box sx={{ width: "calc(50% - 8px)" }}>
                    {scores[2] !== undefined &&
                      generateTopRankingListItemElement({
                        ...scores[2],
                        rank: 3,
                      })}
                  </Box>
                </Box>
              </Box>
              <Box
                component={"ul"}
                sx={{
                  border: 1,
                  borderRadius: 2,
                  borderColor: "divider",
                  overflow: "hidden",
                }}
              >
                {scores.slice(3).map((value, index) => {
                  return (
                    <RankingListItem
                      key={value.userId}
                      nickname={value.nickname}
                      rank={index + 4}
                      score={value.score}
                      isActive={value.userId === userId}
                    />
                  );
                })}
              </Box>
            </>
          ))}
      </Box>
    </TabPanel>
  );
}
