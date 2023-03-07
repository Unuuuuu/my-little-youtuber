import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LocalFireDepartmentTwoToneIcon from "@mui/icons-material/LocalFireDepartmentTwoTone";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { ChannelData } from "@/types";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Empty from "../common/Empty";

const RankingTab = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [scores, setScores] = useState<
    { displayName: string; score: number }[]
  >([]);

  useEffect(() => {
    const channelId = router.query.channelId as string;
    const channelDocRef = doc(db, "channels", channelId);

    getDoc(channelDocRef).then(async (channelDocSnapshot) => {
      const { scores: scoresFromData } =
        channelDocSnapshot.data() as ChannelData;
      const nicknameCache: { [key: string]: string } = {};
      const newScores = [];
      for (const scoreFromData of scoresFromData) {
        console.log(nicknameCache);
        const { userId } = scoreFromData;
        let displayName: string;
        if (userId in nicknameCache) {
          displayName = nicknameCache[userId];
        } else {
          const userDocRef = doc(db, "users", userId);
          displayName =
            (await getDoc(userDocRef)).data()?.displayName ??
            "Empty display name";
          nicknameCache[userId] = displayName;
        }
        newScores.push({ displayName, score: scoreFromData.score });
      }
      setScores(newScores);
      setIsLoading(false);
    });
  }, [router.query.channelId]);

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

  if (scores.length === 0) {
    return <Empty title="랭킹이 없습니다" subtitle="순위권에 도전해보세요" />;
  }

  return (
    <Table sx={{ display: "flex", flexDirection: "column" }}>
      <TableHead sx={{ display: "flex" }}>
        <TableRow sx={{ display: "flex", flexGrow: 1 }}>
          <TableCell
            sx={{
              display: "flex",
              flexBasis: 64,
              flexShrink: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            순위
          </TableCell>
          <TableCell
            sx={{
              display: "flex",
              flexBasis: 64,
              flexShrink: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LocalFireDepartmentTwoToneIcon sx={{ color: "fire" }} />
          </TableCell>
          <TableCell
            sx={{
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
            }}
          >
            닉네임
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {scores.map((row, index) => {
          let rankingElement: JSX.Element | number;
          switch (index + 1) {
            case 1:
              rankingElement = (
                <EmojiEventsTwoToneIcon
                  sx={{
                    color: "goldTrophy",
                  }}
                />
              );
              break;
            case 2:
              rankingElement = (
                <EmojiEventsTwoToneIcon
                  sx={{
                    color: "silverTrophy",
                  }}
                />
              );
              break;
            case 3:
              rankingElement = (
                <EmojiEventsTwoToneIcon
                  sx={{
                    color: "bronzeTrophy",
                  }}
                />
              );
              break;
            default:
              rankingElement = index + 1;
              break;
          }

          return (
            <TableRow
              key={index}
              sx={{
                display: "flex",
              }}
            >
              <TableCell
                sx={{
                  display: "flex",
                  flexBasis: 64,
                  flexShrink: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {rankingElement}
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  flexBasis: 64,
                  flexShrink: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {row.score}
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  alignItems: "center",
                }}
              >
                {row.displayName}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default RankingTab;
