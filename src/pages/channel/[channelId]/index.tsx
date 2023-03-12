import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import { ChannelData, ChannelDataWithoutVideos } from "@/types";
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
import ChannelTabs from "@/components/channel/ChannelTabs";
import { ChannelDataWithoutVideosContext } from "@/context/ChannelDataWithoutVideosContext";
import { NextSeo } from "next-seo";

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
  ChannelProps,
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

  const { videos, ...channelDataWithoutVideos } = docData;

  return {
    props: channelDataWithoutVideos,
  };
};

interface ChannelProps extends ChannelDataWithoutVideos {}

const Channel: React.FC<ChannelProps> = (props) => {
  const channelDataWithoutVideos = props;

  return (
    <ChannelDataWithoutVideosContext.Provider value={channelDataWithoutVideos}>
      <NextSeo
        title={`나의 작은 유튜버 - ${channelDataWithoutVideos.title} - 더 많이 더 적게 유튜브 버전`}
        description={`${channelDataWithoutVideos.title} 유튜브 영상 조회수 비교 게임`}
        openGraph={{
          url: `https://www.mylittleyoutuber.com/channel/${channelDataWithoutVideos.id}`,
          images: [
            {
              url: channelDataWithoutVideos.thumbnail.url,
              width: 800,
              height: 800,
            },
          ],
        }}
      />
      <Header pageType="CHANNEL" />
      <Main>
        <ChannelTabs />
      </Main>
    </ChannelDataWithoutVideosContext.Provider>
  );
};

export default Channel;
