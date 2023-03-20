import HomeTabs from "./components/HomeTabs";
import {
  collection,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import HeroSection from "./components/HeroSection";
import YoutuberAddRequestModal from "./components/YoutuberAddRequestModal";
import { AllChannelsContextProvider } from "./components/AllChannelsContext";
import GameModeModal from "./components/GameModeModal";

async function getAllChannels() {
  const querySnapshot = (await getDocs(
    query(collection(db, "channels"), orderBy("subscriberCount", "desc"))
  )) as QuerySnapshot<ChannelData>;

  const allChannels = querySnapshot.docs
    .sort((a, b) => b.data().scoresSize - a.data().scoresSize)
    .map<
      Pick<
        ChannelData,
        "id" | "scoresSize" | "thumbnail" | "title" | "updateTime"
      >
    >((docSnapshot) => {
      const { id, scoresSize, thumbnail, title, updateTime } =
        docSnapshot.data();

      return {
        id,
        scoresSize,
        thumbnail,
        title,
        updateTime,
      };
    });
  return allChannels;
}

export default async function Page() {
  const allChannels = await getAllChannels();

  return (
    <>
      <AllChannelsContextProvider value={allChannels}>
        <HeroSection />
        <HomeTabs />
        <YoutuberAddRequestModal />
      </AllChannelsContextProvider>
      <GameModeModal />
    </>
  );
}
