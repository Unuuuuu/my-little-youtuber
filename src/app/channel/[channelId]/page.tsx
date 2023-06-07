import {
  DocumentSnapshot,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  ChannelContextProvider,
  ChannelContextValue,
} from "./components/ChannelContext";
import Header from "./components/Header";
import formatter from "@/lib/formatter";
import GameModeInterface from "./components/GameModeInterface";
import Footer from "@/app/components/Footer";
import Main from "./components/Main";
import { Metadata } from "next";

export async function generateStaticParams() {
  const querySnapshot = (await getDocs(
    collection(db, "channels-v2")
  )) as QuerySnapshot<ChannelData>;

  return querySnapshot.docs.map<Props["params"]>((docSnapshot) => ({
    channelId: docSnapshot.id,
  }));
}

async function getChannelContextValue(
  channelId: string
): Promise<ChannelContextValue> {
  const docSnapshot = (await getDoc(
    doc(db, "channels-v2", channelId)
  )) as DocumentSnapshot<ChannelData>;

  const { id, playCount, tags, thumbnail, title, updateDate } =
    docSnapshot.data()!;
  const { general, timeAttack } = playCount;
  const totalPlayCount = general + timeAttack;

  return {
    channel: {
      id,
      playCount,
      thumbnail,
      title,
      tags,
      updateDate,
      totalPlayCount,
      formattedTotalPlayCount: formatter.format(totalPlayCount),
    },
  };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const {
    params: { channelId },
  } = props;
  const { channel } = await getChannelContextValue(channelId);

  const title = `${channel.title} | 나의 작은 유튜버 - 조회수 높은 영상 맞추기 게임`;
  const description = `${channel.title}의 영상으로 조회수가 더 높은 영상을 맞추는 게임을 해보세요. (${channel.title} 유튜브 월드컵, ${channel.title} 조회수 월드컵, 더 많이 더 적게 ${channel.title} 유튜브 버전)`;

  return {
    title,
    description,
    keywords: [
      "나작유",
      "나의 작은 유튜버",
      `나의 작은 유튜버 ${channel.title}`,
      "조회수 높은 영상 맞추기 게임",
      `${channel.title} 조회수 높은 영상 맞추기 게임`,
      "유튜브 월드컵",
      "조회수 월드컵",
      `${channel.title} 유튜브 월드컵`,
      `${channel.title} 조회수 월드컵`,
      "더 많이 더 적게",
      "더 많이 더 적게 유튜브 버전",
      `더 많이 더 적게 ${channel.title} 유튜브 버전`,
    ],
    openGraph: {
      title,
      description,
      url: `https://www.mylittleyoutuber.com/channel/${channel.id}`,
      images: {
        url: channel.thumbnail.url,
        width: 240,
        height: 240,
      },
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: channel.thumbnail.url,
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
  const channelContextValue = await getChannelContextValue(channelId);

  return (
    <ChannelContextProvider value={channelContextValue}>
      <Header />
      <Main />
      <Footer />
      <GameModeInterface />
    </ChannelContextProvider>
  );
}
