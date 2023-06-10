import { db } from "@/lib/firebase";
import {
  DocumentSnapshot,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import {
  ChannelContextProvider,
  ChannelContextValue,
} from "./components/ChannelContext";
import Header from "./components/Header";
import Container from "./components/Container";
import MainContainer from "./components/MainContainer";
import Initialize from "./components/Initialize";
import YoutubePlayerModal from "./components/YoutubePlayerModal";
import ResultDialog from "./components/ResultDialog";
import SoundEffect from "./components/SoundEffect";
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

  const { id, title, videos, thumbnail } = docSnapshot.data()!;

  return {
    channel: {
      id,
      title,
      videos,
      thumbnail,
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
      type: "website",
      locale: "ko_KR",
      url: `https://www.mylittleyoutuber.com/channel/${channel.id}/game`,
      siteName: "나의 작은 유튜버",
      images: {
        url: "https://www.mylittleyoutuber.com/logo-1200x630.png",
        width: 1200,
        height: 630,
      },
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: "https://www.mylittleyoutuber.com/logo-1200x630.png",
    },
    robots: {
      index: false,
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
    <>
      <ChannelContextProvider value={channelContextValue}>
        <Initialize />
        <Container>
          <Header />
          <MainContainer />
        </Container>
      </ChannelContextProvider>
      <YoutubePlayerModal />
      <ResultDialog />
      <SoundEffect />
    </>
  );
}
