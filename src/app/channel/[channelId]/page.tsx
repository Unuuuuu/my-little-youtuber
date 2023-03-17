import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import Initialize from "./components/Initialize";

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
      <Initialize channel={channel} />
    </>
  );
}

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

  const { id, thumbnail, title, updateTime } = docSnapshot.data()!;
  const channel: Pick<
    ChannelData,
    "id" | "thumbnail" | "title" | "updateTime"
  > = {
    id,
    thumbnail,
    title,
    updateTime,
  };
  return channel;
}
