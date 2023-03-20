import GameModeModal from "@/app/components/GameModeModal";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { Metadata } from "next";
import BannerSection from "./components/BannerSection";
import { ChannelContextProvider } from "./components/ChannelContext";
import ChannelTabs from "./components/ChannelTabs";
import Header from "./components/Header";
import Initialize from "./components/Initialize";
import YoutubePlayerModal from "./components/YoutubePlayerModal";

export async function generateStaticParams() {
  const querySnapshot = (await getDocs(
    collection(db, "channels")
  )) as QuerySnapshot<ChannelData>;

  return querySnapshot.docs.map<Props["params"]>((docSnapshot) => ({
    channelId: docSnapshot.id,
  }));
}

async function getChannel(channelId: string) {
  const docSnapshot = (await getDoc(
    doc(db, "channels", channelId)
  )) as DocumentSnapshot<ChannelData>;

  const { id, thumbnail, title, updateTime, videos } = docSnapshot.data()!;
  const channel: {
    id: ChannelData["id"];
    thumbnail: ChannelData["thumbnail"];
    title: ChannelData["title"];
    updateTime: ChannelData["updateTime"];
    video: VideoData;
  } = {
    id,
    thumbnail,
    title,
    updateTime,
    video: videos[0],
  };
  return channel;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const {
    params: { channelId },
  } = props;
  const channel = await getChannel(channelId);

  const title = `${channel.title} | 나의 작은 유튜버 - 유튜브 영상 조회수 맞추기 게임`;
  const description = `${channel.title}의 영상으로 조회수 맞추기 게임을 해보세요! 더 많이 더 적게의 유튜브 버전입니다.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.mylittleyoutuber.com/channel/${channel.id}`,
      images: {
        url: channel.thumbnail.url,
        width: 800,
        height: 800,
      },
    },
  };
}

interface Props {
  params: { channelId: string };
}

export default async function Page(props: Props) {
  const {
    params: { channelId },
  } = props;
  const channel = await getChannel(channelId);

  return (
    <>
      <ChannelContextProvider value={channel}>
        <Initialize />
        <BannerSection />
        <Header />
        <ChannelTabs />
      </ChannelContextProvider>
      <GameModeModal />
      <YoutubePlayerModal />
    </>
  );
}
