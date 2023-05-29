import Provider from "./components/Provider";
import "@/lib/firebase";
import {
  TagsContextProvider,
  TagsContextValue,
} from "./components/TagsContext";
import { ChannelsContextProvider } from "./components/ChannelsContext";
import SearchFullScreenDialog from "./components/SearchFullScreenDialog";
import { ChannelsContextValue } from "@/app/components/ChannelsContext";
import { QuerySnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
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

interface Props {
  children: React.ReactNode;
}

export default async function Layout(props: Props) {
  const tagsContextValue = await getTagsContextValue();
  const channelsContextValue = await getChannelsContextValue();

  const { children } = props;

  return (
    <html lang="ko">
      <body>
        <Provider>
          <TagsContextProvider value={tagsContextValue}>
            <ChannelsContextProvider value={channelsContextValue}>
              {children}
              <SearchFullScreenDialog />
            </ChannelsContextProvider>
          </TagsContextProvider>
        </Provider>
      </body>
    </html>
  );
}
