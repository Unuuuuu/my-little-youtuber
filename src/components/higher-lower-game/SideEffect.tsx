import { useAppSelector } from "@/redux/hooks";
import { useEffect, useRef } from "react";

const SideEffect = () => {
  const { status } = useAppSelector((state) => ({
    status: state.higherLowerGame.status,
  }));
  const failAudioRef = useRef<HTMLAudioElement>(null);
  const successAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (failAudioRef.current === null || successAudioRef.current === null) {
      return;
    }

    switch (status) {
      case "PENDING":
        failAudioRef.current.load();
        successAudioRef.current.load();
        break;
      case "FAILED":
        failAudioRef.current.volume = 0.25;
        failAudioRef.current.play();
        break;
      case "SUCCEEDED":
        successAudioRef.current.play();
        break;
    }
  }, [status]);

  return (
    <>
      <audio ref={failAudioRef} src="/sounds/fail.mp3" />
      <audio ref={successAudioRef} src="/sounds/success.mp3" />
    </>
  );
};

export default SideEffect;
