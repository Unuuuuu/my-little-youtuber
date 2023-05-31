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
import About from "./components/About";
import formatter from "@/lib/formatter";
import GameMode from "./components/GameMode";

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
      <About />
      <GameMode />
    </ChannelContextProvider>
  );
}
