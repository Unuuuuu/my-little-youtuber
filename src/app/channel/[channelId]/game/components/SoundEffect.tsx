"use client";

import { useAppSelector } from "@/lib/hooks";
import { useEffect, useRef } from "react";

export default function SoundEffect() {
  const { gameStatus } = useAppSelector((state) => ({
    gameStatus: state.game.gameStatus,
  }));
  const failAudioRef = useRef<HTMLAudioElement>(null);
  const successAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (failAudioRef.current === null || successAudioRef.current === null) {
      return;
    }

    switch (gameStatus) {
      case "PENDING":
        failAudioRef.current.load();
        successAudioRef.current.load();
        break;
      case "FAILED":
        failAudioRef.current.play();
        break;
      case "SUCCEEDED":
        successAudioRef.current.play();
        break;
    }
  }, [gameStatus]);

  return (
    <>
      <audio ref={failAudioRef} src="/sound/fail.mp3" />
      <audio ref={successAudioRef} src="/sound/success.mp3" />
    </>
  );
}
