"use client";

import { useEffect, useState } from "react";
import RankingTabPanel, { Props as RankingPanelProps } from "./RankingTabPanel";
import { useChannelContext } from "./ChannelContext";
import {
  QueryDocumentSnapshot,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import goldMedalImageSrc from "@/assets/ranking-gold-medal.png";
import silverMedalImageSrc from "@/assets/ranking-silver-medal.png";
import bronzeMedalImageSrc from "@/assets/ranking-bronze-medal.png";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { gmarketSans } from "@/lib/fonts";
import RankingDisplayAd from "./RankingDisplayAd";

interface Props extends Omit<RankingPanelProps, "children"> {}

export default function TimeAttackRankingTabPanel(props: Props) {
  const { selectedValue, value } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [scores, setScores] = useState<ScoreData[]>();
  const {
    channel: { id },
  } = useChannelContext();

  useEffect(() => {
    getDocs(
      query(
        collection(db, "channels-v2", id, "timeattack-scores"),
        orderBy("score", "desc"),
        orderBy("createdAt")
      )
    ).then((querySnapshot) => {
      const newScores = (
        querySnapshot.docs as QueryDocumentSnapshot<ScoreData>[]
      ).map((doc) => doc.data());
      setScores(newScores);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <RankingTabPanel value={value} selectedValue={selectedValue}>
      {isLoading && (
        <Box
          sx={{
            pt: "24px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isLoading &&
        scores &&
        (scores.length === 0 ? (
          <Typography
            variant="h4"
            sx={{ color: grey[500], textAlign: "center" }}
          >
            랭커가 없습니다.
            <br />
            순위권에 도전해보세요!!
          </Typography>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                mb: "24px",
              }}
            >
              {scores[0] && (
                <Box sx={{ flexBasis: "calc((100% - 24px) / 3)" }}>
                  <Box sx={{ position: "relative", aspectRatio: "1/1" }}>
                    <Image
                      src={goldMedalImageSrc}
                      alt="gold medal"
                      fill
                      style={{ marginBottom: "4px", objectFit: "contain" }}
                    />
                  </Box>
                  <Typography sx={{ mb: "4px", textAlign: "center" }}>
                    {scores[0].nickname}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: grey[800] }}>
                      {scores[0].score}
                    </Typography>
                    <Typography variant="body2" sx={{ color: grey[500] }}>
                      회
                    </Typography>
                  </Box>
                </Box>
              )}
              {scores[1] && (
                <Box sx={{ flexBasis: "calc((100% - 24px) / 3)" }}>
                  <Box sx={{ position: "relative", aspectRatio: "1/1" }}>
                    <Image
                      src={silverMedalImageSrc}
                      alt="silver medal"
                      fill
                      style={{ marginBottom: "4px", objectFit: "contain" }}
                    />
                  </Box>
                  <Typography sx={{ mb: "4px", textAlign: "center" }}>
                    {scores[1].nickname}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: grey[800] }}>
                      {scores[1].score}
                    </Typography>
                    <Typography variant="body2" sx={{ color: grey[500] }}>
                      회
                    </Typography>
                  </Box>
                </Box>
              )}
              {scores[2] && (
                <Box sx={{ flexBasis: "calc((100% - 24px) / 3)" }}>
                  <Box sx={{ position: "relative", aspectRatio: "1/1" }}>
                    <Image
                      src={bronzeMedalImageSrc}
                      alt="bronze medal"
                      fill
                      style={{ marginBottom: "4px", objectFit: "contain" }}
                    />
                  </Box>
                  <Typography sx={{ mb: "4px", textAlign: "center" }}>
                    {scores[2].nickname}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: grey[800] }}>
                      {scores[2].score}
                    </Typography>
                    <Typography variant="body2" sx={{ color: grey[500] }}>
                      회
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
            {scores.length >= 4 && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    bgcolor: grey[50],
                    borderBottom: `1px solid ${grey[200]}`,
                    height: "40px",
                    borderRadius: "8px 8px 0 0",
                  }}
                >
                  <Box
                    sx={{
                      width: "50px",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ color: grey[700] }}>순위</Typography>
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      p: "0 10px 0 20px",
                    }}
                  >
                    <Typography sx={{ color: grey[700] }}>닉네임</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "84px",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ color: grey[700] }}>맞춘 횟수</Typography>
                  </Box>
                </Box>
                {scores.slice(3).map((score, index) => (
                  <>
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        borderBottom: `1px solid ${grey[200]}`,
                        height: "60px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          width: "50px",
                          flexShrink: 0,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: grey[800],
                            fontSize: "20px",
                            lineHeight: "24px",
                            fontWeight: 700,
                            fontFamily: gmarketSans.style.fontFamily,
                          }}
                        >
                          {index + 4}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          alignItems: "center",
                          p: "0 10px 0 20px",
                        }}
                      >
                        <Typography>{score.nickname}</Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "84px",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <Typography variant="subtitle1">
                          {score.score}
                        </Typography>
                        <Typography sx={{ color: grey[500] }}>회</Typography>
                      </Box>
                    </Box>
                    {(index + 4) % 20 === 0 && <RankingDisplayAd />}
                  </>
                ))}
              </>
            )}
          </>
        ))}
    </RankingTabPanel>
  );
}
