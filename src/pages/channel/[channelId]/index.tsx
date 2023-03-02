import HigherLowerGameIcon from "@/components/higher-lower-game/HigherLowerGameIcon";
import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import { ChannelData, ChannelDataWithoutVideos } from "@/types";
import { db } from "@/utils/firebase";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next/types";

export const getStaticPaths: GetStaticPaths = async () => {
  const querySnapshot = (await getDocs(
    collection(db, "channels")
  )) as QuerySnapshot<ChannelData>;

  const paths = querySnapshot.docs.map<{
    params: { channelId: string };
  }>((doc) => ({
    params: {
      channelId: doc.id,
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  ChannelProps,
  { channelId: string }
> = async ({ params }) => {
  if (params === undefined) {
    throw new Error("Params is undefined.");
  }

  const docSnapshot = (await getDoc(
    doc(db, "channels", params.channelId)
  )) as DocumentSnapshot<ChannelData>;
  const docData = docSnapshot.data();

  if (docData === undefined) {
    throw new Error("Data is undefined.");
  }

  const { videos, ...channelDataWithoutVideos } = docData;

  return {
    props: channelDataWithoutVideos,
  };
};

interface ChannelProps extends ChannelDataWithoutVideos {}

const Channel: React.FC<ChannelProps> = (props) => {
  const channelDataWithoutVideos = props;

  return (
    <>
      <Header
        channelDataWithoutVideos={channelDataWithoutVideos}
        isChannelPage
      />
      <Main>
        <Box sx={{ p: 2 }}>
          <Box
            component={Link}
            href={`/channel/${channelDataWithoutVideos.id}/higher-lower-game`}
          >
            To be developed
            <ButtonBase sx={{ p: 2, display: "flex", gap: 1 }}>
              <HigherLowerGameIcon />
              <Typography component={"h2"} fontSize={16} fontWeight={500}>
                더 많이 더 적게
              </Typography>
            </ButtonBase>
          </Box>
        </Box>
      </Main>
    </>
  );
};

export default Channel;
