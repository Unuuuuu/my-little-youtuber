import Header from "@/components/higher-lower/lobby/Header";
import { Channel, ChannelWithoutVideos } from "@/types";
import { db } from "@/utils/firebase";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

interface HigherLowerGameProps {
  channels: ChannelWithoutVideos[];
}

const HigherLowerGame: React.FC<HigherLowerGameProps> = (props) => {
  const { channels } = props;

  return (
    <>
      <Header />
      <Box
        component={"main"}
        sx={{ width: "100%", height: "calc(100% - 64px)" }}
      >
        <Box
          component={"ul"}
          sx={{
            height: "100%",
            m: 0,
            p: 0,
            listStyle: "none",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {channels.map((channel) => (
            <Box
              key={channel.id}
              component={"li"}
              sx={{
                "&:not(:last-child)": {
                  borderBottom: "1px solid",
                  borderColor: "divider",
                },
              }}
            >
              <Box
                component={Link}
                href={`/games/higher-lower/channels/${channel.id}`}
                sx={{
                  p: 2,
                  display: "flex",
                  textDecoration: "none",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Image
                  placeholder="blur"
                  blurDataURL={channel.thumbnail.blurDataURL}
                  src={channel.thumbnail.url}
                  alt="thumbnail"
                  width={64}
                  height={64}
                  style={{ borderRadius: "50%" }}
                />
                <Typography component={"h2"} variant="h6">
                  {channel.title}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps<
  HigherLowerGameProps
> = async () => {
  const querySnapshot = (await getDocs(
    collection(db, "channels")
  )) as QuerySnapshot<Channel>;

  const channels = querySnapshot.docs.map<ChannelWithoutVideos>((doc) => {
    const { videos, ...rest } = doc.data();
    return rest;
  });

  return { props: { channels } };
};

export default HigherLowerGame;
