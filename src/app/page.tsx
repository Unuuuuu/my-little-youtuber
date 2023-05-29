import { QuerySnapshot, collection, getDocs } from "firebase/firestore";
import Header from "./components/Header";
import { db } from "@/lib/firebase";
import HomeTabs from "./components/HomeTabs";
import {
  TagsContextProvider,
  TagsContextValue,
} from "./components/TagsContext";
import {
  ChannelsContextProvider,
  ChannelsContextValue,
} from "./components/ChannelsContext";
import Footer from "./components/Footer";
import formatter from "@/lib/formatter";

async function getTagsContextValue(): Promise<TagsContextValue> {
  const querySnapshot = (await getDocs(
    collection(db, "tags-v2")
  )) as QuerySnapshot<TagData>;

  const tags = querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  const generalTags = tags
    .filter(
      (tag): tag is GeneralTagData =>
        tag.type === "GENERAL" &&
        tag.priority !== -1 &&
        tag.channelIds.length !== 0
    )
    .sort((a, b) => a.priority - b.priority);
  const etcTags = tags.filter(
    (tag): tag is GeneralTagData =>
      tag.type === "GENERAL" && tag.priority === -1
  );

  return {
    tags,
    generalTags,
    etcTags,
  };
}

async function getChannelsContextValue(): Promise<ChannelsContextValue> {
  const querySnapshot = (await getDocs(
    collection(db, "channels-v2")
  )) as QuerySnapshot<ChannelData>;

  const channels = querySnapshot.docs.map<ChannelDataWithTotalPlayCount>(
    (docSnapshot) => {
      const data = docSnapshot.data();
      const {
        playCount: { general, timeAttack },
      } = data;
      const totalPlayCount = general + timeAttack;

      return {
        ...data,
        totalPlayCount,
        formattedTotalPlayCount: formatter.format(totalPlayCount),
      };
    }
  );
  return { channels };
}

export default async function Page() {
  const tagsContextValue = await getTagsContextValue();
  const channelsContextValue = await getChannelsContextValue();

  return (
    <>
      <Header />
      <TagsContextProvider value={tagsContextValue}>
        <ChannelsContextProvider value={channelsContextValue}>
          <HomeTabs />
        </ChannelsContextProvider>
      </TagsContextProvider>
      <Footer />
    </>
  );
}
