import Header from "@/components/higher-lower/playing/Header";
import Main from "@/components/higher-lower/playing/Main";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { higherLowerGameActions } from "@/redux/slices/higherLowerGameSlice";
import { Channel } from "@/types";
import { db } from "@/utils/firebase";
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";

export interface HigherLowerGameChannelIdProps extends Channel {}

const HigherLowerGameChannelId: React.FC<HigherLowerGameChannelIdProps> = (
  props
) => {
  const isInitialized = useAppSelector(
    (state) => state.higherLowerGame.isInitialized
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(higherLowerGameActions.initialize(props));

    return () => {
      dispatch(higherLowerGameActions.finalize());
    };
  }, [dispatch, props]);

  if (!isInitialized) {
    // TODO
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const querySnapshot = (await getDocs(
    collection(db, "channels")
  )) as QuerySnapshot<Channel>;

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
  HigherLowerGameChannelIdProps,
  { channelId: string }
> = async ({ params }) => {
  if (params === undefined) {
    throw new Error("Params is undefined.");
  }

  const docSnapshot = (await getDoc(
    doc(db, "channels", params.channelId)
  )) as DocumentSnapshot<Channel>;
  const docData = docSnapshot.data();

  if (docData === undefined) {
    throw new Error("Data is undefined.");
  }

  return {
    props: docData,
  };
};

export default HigherLowerGameChannelId;
