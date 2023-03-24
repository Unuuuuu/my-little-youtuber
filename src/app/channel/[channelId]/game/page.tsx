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
import YoutubePlayerModal from "../components/YoutubePlayerModal";
import { ChannelContextProvider } from "./components/ChannelContext";
import Control from "./components/Control";
import Guide from "./components/Guide";
import Initialize from "./components/Initialize";
import SoundEffect from "./components/SoundEffect";
import Videos from "./components/Videos";

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

  const { id, thumbnail, title, videos } = docSnapshot.data()!;
  const channel: Pick<ChannelData, "id" | "thumbnail" | "title" | "videos"> = {
    id,
    thumbnail,
    title,
    videos,
  };
  return channel;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const {
    params: { channelId },
  } = props;
  const channel = await getChannel(channelId);

  const title = `${channel.title} | 나의 작은 유튜버 - 조회수 높은 영상 맞추기 게임`;
  const description = `${channel.title}의 영상으로 조회수가 더 높은 영상을 맞추는 게임을 해보세요! 더 많이 더 적게의 유튜브 버전입니다.`;

  return {
    title,
    description,
    keywords: [
      "나작유",
      "나의 작은 유튜버",
      `나의 작은 유튜버 ${channel.title}`,
      "조회수 높은 영상 맞추기 게임",
      `${channel.title} 조회수 높은 영상 맞추기 게임`,
      "더 많이 더 적게",
      "더 많이 더 적게 유튜브 버전",
    ],
    openGraph: {
      title,
      description,
      url: `https://www.mylittleyoutuber.com/channel/${channel.id}/game`,
      images: {
        url: channel.thumbnail.url,
        width: 800,
        height: 800,
      },
    },
    robots: {
      index: false,
      follow: false,
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
        <Videos />
        <Control />
        <SoundEffect />
        <Guide />
      </ChannelContextProvider>
      <YoutubePlayerModal />
    </>
  );
}
