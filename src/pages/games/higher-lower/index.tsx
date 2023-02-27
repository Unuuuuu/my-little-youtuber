import { Channel, ChannelWithoutVideos } from "@/types";
import { db } from "@/utils/firebase";
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
    <ul>
      {channels.map((channel) => (
        <li key={channel.id}>
          <Link href={`/games/higher-lower/channels/${channel.id}`}>
            <Image
              placeholder="blur"
              blurDataURL={channel.thumbnail.blurDataURL}
              src={channel.thumbnail.url}
              alt="thumbnail"
              width={80}
              height={80}
            />
            <span>{channel.title}</span>
          </Link>
        </li>
      ))}
    </ul>
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
