import Header from "@/components/higher-lower-game/channel-id/Header";
import Main from "@/components/higher-lower-game/channel-id/Main";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { higherLowerGameActions } from "@/redux/slices/higherLowerGameSlice";
import {
  ChannelDocumentData,
  ChannelDocumentDataWithCollection,
  Video,
} from "@/types";
import { db } from "@/utils/firebase";
import woowakgoodVideos from "@/woowakgood-videos";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";

export interface HigherLowerGameChannelIdProps
  extends ChannelDocumentDataWithCollection {}

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
  const paths: {
    params: { channelId: string };
  }[] = [];

  const querySnapshot = await getDocs(collection(db, "channels"));
  querySnapshot.forEach((doc) => {
    paths.push({ params: { channelId: doc.id } });
  });

  /**
   * Temp
   */
  // paths.push({ params: { channelId: "UCWy5ZJoLkHZswfPCbsUGwCw" } });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  HigherLowerGameChannelIdProps,
  { channelId: string }
> = async ({ params }) => {
  if (params === undefined) {
    return {
      props: {
        id: "",
        title: "",
        thumbnail: { url: "", blurDataURL: "" },
        videos: [],
      },
    };
  }

  const channelDocumentData = await getDoc(
    doc(db, "channels", params.channelId)
  ).then((doc) => doc.data() as ChannelDocumentData);
  const videos: Video[] = [];
  await getDocs(collection(db, "channels", params.channelId, "videos")).then(
    (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        videos.push(doc.data() as Video);
      });
    }
  );

  return { props: { ...channelDocumentData, videos } };

  /**
   * Temp
   */
  // return {
  //   props: {
  //     id: params.channelId,
  //     title: "우왁굳의 게임방송",
  //     thumbnail: {
  //       url: "https://yt3.ggpht.com/TfNiEYiPS4wX6BWXerod80xL3pB8RvRLHiEDiPTPo1ZOIsgYivENAGTu2Sax_YJ-8g9SCHtvFw=s800-c-k-c0x00ffffff-no-rj",
  //       blurDataURL:
  //         "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAP0lEQVR4nAE0AMv/AMSWV4JYFEwnAEwsAACgekafcjBmRAwnAAAAyad4wJFOuJRbORsAAP/2x8SSSdefUkIoAswiExpx7IkeAAAAAElFTkSuQmCC",
  //     },
  //     videos: woowakgoodVideos,
  //   } as HigherLowerGameChannelIdProps,
  // };
};

export default HigherLowerGameChannelId;
