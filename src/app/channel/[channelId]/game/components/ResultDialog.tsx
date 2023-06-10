"use client";

import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import CloseIcon from "@/components/CloseIcon";
import { grey } from "@mui/material/colors";
import { resultDialogSliceActions } from "@/lib/slices/resultDialogSlice";
import Image, { StaticImageData } from "next/image";
import goldMedalImageSrc from "@/assets/gold-medal.png";
import silverMedalImageSrc from "@/assets/silver-medal.png";
import bronzeMedalImageSrc from "@/assets/bronze-medal.png";
import greenMedalImageSrc from "@/assets/green-medal.png";
import purpleMedalImageSrc from "@/assets/purple-medal.png";
import { gmarketSans } from "@/lib/fonts";
import Button from "@/app/components/Button";
import { gameSliceActions } from "@/lib/slices/gameSlice";
import {
  CollectionReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

export default function ResultDialog() {
  const {
    id,
    title: channelTitle,
    isOpen,
    gameStatus,
    gameMode,
    score,
    nickname,
    isResultLoading,
    resultStatus,
    ranking,
    diff,
  } = useAppSelector((state) => ({
    id: state.game.id,
    title: state.game.title,
    isOpen: state.resultDialog.isOpen,
    gameStatus: state.game.gameStatus,
    gameMode: state.game.gameMode,
    score: state.game.score,
    nickname: state.game.nickname,
    isResultLoading: state.game.isResultLoading,
    resultStatus: state.game.resultStatus,
    ranking: state.game.ranking,
    diff: state.game.diff,
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (gameStatus === "FAILED") {
      dispatch(resultDialogSliceActions.open());

      if (score !== 0) {
        let path: string;
        if (gameMode === "GENERAL") {
          updateDoc(doc(db, "channels-v2", id), {
            "playCount.general": increment(1),
          });
          path = "general-scores";
        } else {
          updateDoc(doc(db, "channels-v2", id), {
            "playCount.timeAttack": increment(1),
          });
          path = "timeattack-scores";
        }

        const scoresCollectionRef = collection(db, "channels-v2", id, path);
        getDocs(
          query(
            scoresCollectionRef,
            orderBy("score", "desc"),
            orderBy("createdAt")
          ) as CollectionReference<ScoreData>
        ).then((value) => {
          const scores = value.docs.map<ScoreData>((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          if (scores.length < 100) {
            // 100개 보다 적게 있다면, 추가한다.
            addDoc(scoresCollectionRef, {
              score,
              nickname,
              createdAt: serverTimestamp(),
            });

            const targetIndex = scores.findIndex(
              (value) => value.score < score
            );
            if (targetIndex === -1) {
              // 내 점수보다 낮은 점수가 없는 경우
              dispatch(
                gameSliceActions.updateResult({
                  resultStatus: "rank",
                  ranking: scores.length + 1,
                })
              );
            } else {
              // 내 점수보다 낮은 점수가 있는 경우
              dispatch(
                gameSliceActions.updateResult({
                  resultStatus: "rank",
                  ranking: targetIndex + 1,
                })
              );
            }
          } else {
            // 100개 이상 있다면,
            // 마지막 것과 차이를 계산한다.
            const diff = score - scores[99].score;
            if (diff > 0) {
              // diff가 0보다 크다면
              scores.slice(99).forEach((sc) => {
                deleteDoc(doc(db, "channels-v2", id, path, sc.id));
              });

              addDoc(scoresCollectionRef, {
                score,
                nickname,
                createdAt: serverTimestamp(),
              });

              const targetIndex = scores.findIndex(
                (value) => value.score < score
              );
              if (targetIndex === -1) {
                // 내 점수보다 낮은 점수가 없는 경우
                dispatch(
                  gameSliceActions.updateResult({
                    resultStatus: "rank",
                    ranking: scores.length + 1,
                  })
                );
              } else {
                // 내 점수보다 낮은 점수가 있는 경우
                dispatch(
                  gameSliceActions.updateResult({
                    resultStatus: "rank",
                    ranking: targetIndex + 1,
                  })
                );
              }
            } else {
              // diff가 0보다 크지않다면 unrank이다.
              dispatch(
                gameSliceActions.updateResult({
                  resultStatus: "unrank",
                  diff: diff * -1,
                })
              );
            }
          }
        });
      } else {
        dispatch(gameSliceActions.updateResult({}));
      }
    }
  }, [dispatch, gameMode, gameStatus, id, nickname, score]);

  useEffect(() => {
    return () => {
      dispatch(resultDialogSliceActions.close());
    };
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch(resultDialogSliceActions.close());
  }, [dispatch]);

  const handleReplayButtonClick = () => {
    dispatch(gameSliceActions.reset());
  };

  let title: string;
  let medalImageSrc: StaticImageData;
  let strokeColor = "";

  if (score === 0) {
    title = "앗...";
    medalImageSrc = purpleMedalImageSrc;
  } else {
    switch (resultStatus) {
      case "rank":
        if (ranking === 1) {
          title = "멋져요!";
          medalImageSrc = goldMedalImageSrc;
          strokeColor = "rgb(119,94,4)";
        } else if (ranking === 2) {
          title = "멋져요!";
          medalImageSrc = silverMedalImageSrc;
          strokeColor = "rgb(101,101,102)";
        } else if (ranking === 3) {
          title = "멋져요!";
          medalImageSrc = bronzeMedalImageSrc;
          strokeColor = "rgb(117,94,82)";
        } else {
          title = "대단해요!";
          medalImageSrc = greenMedalImageSrc;
          strokeColor = "rgb(63,101,63)";
        }
        break;
      case "unrank":
        title = "좋아요!";
        medalImageSrc = purpleMedalImageSrc;
        break;
      default:
        title = "앗...";
        medalImageSrc = purpleMedalImageSrc;
        break;
    }
  }

  return (
    <Dialog
      open={isOpen && gameStatus === "FAILED"}
      onClose={handleClose}
      sx={{
        ".MuiDialog-paper": {
          height: "424px",
          width: "100%",
          maxWidth: "380px",
          borderRadius: "16px",
          margin: "12px",
        },
      }}
    >
      {isResultLoading ? (
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
      ) : (
        <>
          <CloseIcon
            sx={{
              stroke: grey[700],
              fontSize: "28px",
              position: "absolute",
              right: 12,
              top: 12,
              cursor: "pointer",
            }}
            onClick={handleClose}
          />
          <Box
            component={"main"}
            sx={{
              height: "100%",
              p: "16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", mb: "16px" }}>
              {title}
            </Typography>
            <Box
              sx={{
                width: "200px",
                height: "158px",
                position: "relative",
                m: "0 auto",
                mb: "16px",
              }}
            >
              <Image src={medalImageSrc} alt="medal" fill />
              {(score === 0 || resultStatus !== "rank") && (
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    position: "absolute",
                    bottom: "74px",
                    color: "white",
                    fontFamily: gmarketSans.style.fontFamily,
                    fontSize: "32px",
                    lineHeight: "24px",
                    fontWeight: 700,
                    WebkitTextStroke: "1.2px rgb(95,62,164)",
                  }}
                >
                  {score}
                </Typography>
              )}
              {score !== 0 && resultStatus === "rank" && (
                <>
                  <Typography
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      position: "absolute",
                      bottom: "72px",
                      color: "white",
                      fontFamily: gmarketSans.style.fontFamily,
                      fontSize: "48px",
                      lineHeight: "24px",
                      fontWeight: 700,
                      WebkitTextStroke: `1.5px ${strokeColor}`,
                    }}
                  >
                    {ranking}
                  </Typography>
                  <Typography
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      position: "absolute",
                      bottom: "10px",
                      color: "white",
                      fontFamily: gmarketSans.style.fontFamily,
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 700,
                    }}
                  >
                    {score}
                  </Typography>
                </>
              )}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                sx={{ color: grey[600], mb: "6px", textAlign: "center" }}
              >
                {nickname}님
              </Typography>
              {score === 0 ? (
                <Typography sx={{ textAlign: "center" }}>
                  한 번 더 해볼까요?
                </Typography>
              ) : resultStatus === "rank" ? (
                <Box>
                  <Typography sx={{ textAlign: "center" }}>
                    {channelTitle} 채널에서
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={[
                        {
                          fontSize: "22px",
                          lineHeight: "32px",
                          fontWeight: 900,
                        },
                        ranking! <= 3 && {
                          color: "primary.main",
                        },
                      ]}
                    >
                      {ranking}등
                    </Typography>
                    <Typography>을 했어요!</Typography>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1px",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ color: "primary.main" }}>
                      {diff! + 1}점
                    </Typography>
                    <Typography>만 더 받으면</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "2px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "22px",
                        lineHeight: "32px",
                        fontWeight: 900,
                      }}
                    >
                      TOP100
                    </Typography>
                    <Typography>진입 가능!!</Typography>
                  </Box>
                </Box>
              )}
            </Box>
            <Box sx={{ display: "flex", gap: "12px" }}>
              <Link href={`/channel/${id}`}>
                <Button
                  variant="outlined"
                  color="buttonSecondary"
                  sx={{
                    height: "48px",
                    fontSize: "18px",
                    borderRadius: "8px",
                    width: "103px",
                    flexShrink: 0,
                  }}
                >
                  {resultStatus === "rank" ? "랭킹보기" : "나가기"}
                </Button>
              </Link>
              <Button
                fullWidth
                variant="contained"
                sx={{ height: "48px", fontSize: "18px", borderRadius: "8px" }}
                onClick={handleReplayButtonClick}
              >
                다시하기
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Dialog>
  );
}
