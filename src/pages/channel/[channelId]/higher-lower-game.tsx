import Interface from "@/components/higher-lower-game/Interface";
import Indicator from "@/components/higher-lower-game/Indicator";
import YouTubeModal from "@/components/higher-lower-game/YouTubeModal";
import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { higherLowerGameActions } from "@/redux/slices/higherLowerGameSlice";
import { ChannelData } from "@/types";
import { db } from "@/utils/firebase";
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { GetStaticPaths, GetStaticProps } from "next/types";
import React, { useEffect } from "react";
import SideEffect from "@/components/higher-lower-game/SideEffect";
import { ChannelDataWithoutVideosContext } from "@/context/ChannelContext";
import { useRouter } from "next/router";
import { loginRequestSnackbarActions } from "@/redux/slices/loginRequestSnackbarSlice";

export const getStaticPaths: GetStaticPaths = async () => {
  const querySnapshot = (await getDocs(
    collection(db, "channels")
  )) as QuerySnapshot<ChannelData>;

  const paths = querySnapshot.docs.map<{
    params: { channelId: string };
  }>((doc) => ({
    params: {
      channelId: doc.id,
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  HigherLowerGameProps,
  { channelId: string }
> = async ({ params }) => {
  if (params === undefined) {
    throw new Error("Params is undefined.");
  }

  const docSnapshot = (await getDoc(
    doc(db, "channels", params.channelId)
  )) as DocumentSnapshot<ChannelData>;
  const docData = docSnapshot.data();

  if (docData === undefined) {
    throw new Error("Data is undefined.");
  }

  return {
    props: docData,
  };
};

interface HigherLowerGameProps extends ChannelData {}

const HigherLowerGame: React.FC<HigherLowerGameProps> = (props) => {
  const channelData = props;
  const { videos, ...channelDataWithoutVideos } = channelData;
  const { isSignedIn, mode } = useAppSelector((state) => ({
    isSignedIn: state.user.isSignedIn,
    mode: state.higherLowerGame.mode,
  }));
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn && mode === "RANK") {
      router.push(`/channel/${channelData.id}`);
      dispatch(loginRequestSnackbarActions.open());
      return;
    }

    dispatch(
      higherLowerGameActions.initialize({ channelId: channelData.id, videos })
    );

    return () => {
      dispatch(higherLowerGameActions.finalize());
    };
  }, [channelData.id, dispatch, isSignedIn, mode, router, videos]);

  if (!isSignedIn && mode === "RANK") {
    return null;
  }

  return (
    <ChannelDataWithoutVideosContext.Provider value={channelDataWithoutVideos}>
      <Header pageType="GAME" />
      <Main>
        <Interface />
        <Indicator />
        <YouTubeModal />
        <SideEffect />
      </Main>
    </ChannelDataWithoutVideosContext.Provider>
  );
};

export default HigherLowerGame;
