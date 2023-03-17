import HomeTabs from "@/components/home/HomeTabs";
import { GetStaticProps } from "next/types";
import { ChannelData, ChannelDataWithoutVideos } from "@/types";
import {
  collection,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import { ChannelDatasWithoutVideosContext } from "@/context/ChannelDatasWithoutVideosContext";
import Request from "@/components/home/Request";

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const querySnapshot = (await getDocs(
    query(collection(db, "channels"), orderBy("subscriberCount", "desc"))
  )) as QuerySnapshot<ChannelData>;

  const channelDatasWithoutVideos = querySnapshot.docs
    .sort((a, b) => b.data().scores.length - a.data().scores.length)
    .map<ChannelDataWithoutVideos>((doc) => {
      const { videos, ...rest } = doc.data();
      return rest;
    });

  return { props: { channelDatasWithoutVideos } };
};

interface HomeProps {
  channelDatasWithoutVideos: ChannelDataWithoutVideos[];
}

const Home: React.FC<HomeProps> = (props) => {
  const { channelDatasWithoutVideos } = props;

  return (
    <ChannelDatasWithoutVideosContext.Provider
      value={channelDatasWithoutVideos}
    >
      <Header pageType="HOME" />
      <Main>
        <HomeTabs />
        <Request />
      </Main>
    </ChannelDatasWithoutVideosContext.Provider>
  );
};

export default Home;
