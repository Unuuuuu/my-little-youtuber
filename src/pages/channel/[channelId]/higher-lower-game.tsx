import Interface from "@/components/higher-lower-game/Interface";
import Indicator from "@/components/higher-lower-game/Indicator";
import YouTubeModal from "@/components/higher-lower-game/YouTubeModal";
import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import { useAppDispatch } from "@/redux/hooks";
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(higherLowerGameActions.initialize(videos));

    return () => {
      dispatch(higherLowerGameActions.finalize());
    };
  }, [dispatch, videos]);

  return (
    <>
      <Header
        channelDataWithoutVideos={channelDataWithoutVideos}
        pageType="GAME"
      />
      <Main>
        <Interface />
        <Indicator />
        <YouTubeModal />
      </Main>
    </>
  );
};

export default HigherLowerGame;
