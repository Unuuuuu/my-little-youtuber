import ChannelTabs from "@/components/home/ChannelTabs";
import { GetStaticProps } from "next/types";
import { ChannelData, ChannelDataWithoutVideos } from "@/types";
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";

interface HomeProps {
  channelDatasWithoutVideos: ChannelDataWithoutVideos[];
}

const Home: React.FC<HomeProps> = (props) => {
  const { channelDatasWithoutVideos } = props;

  return (
    <>
      <Header isHomePage />
      <Main>
        <ChannelTabs channelDatasWithoutVideos={channelDatasWithoutVideos} />
      </Main>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const querySnapshot = (await getDocs(
    collection(db, "channels")
  )) as QuerySnapshot<ChannelData>;

  const channelDatasWithoutVideos = querySnapshot.docs
    .map<ChannelDataWithoutVideos>((doc) => {
      const { videos, ...rest } = doc.data();
      return rest;
    })
    .sort((a, b) => b.subscriberCount - a.subscriberCount);

  return { props: { channelDatasWithoutVideos } };
};

export default Home;
