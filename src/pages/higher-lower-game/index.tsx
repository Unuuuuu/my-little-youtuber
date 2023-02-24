import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

interface HigherLowerGameProps {
  channels: {
    id: string;
    title: string;
    thumbnail: {
      url: string;
      placeholder: string;
    };
  }[];
}

const HigherLowerGame: React.FC<HigherLowerGameProps> = (props) => {
  const { channels } = props;

  return (
    <ul>
      {channels.map((channel) => (
        <li key={channel.id}>
          <Image
            placeholder="blur"
            blurDataURL={channel.thumbnail.placeholder}
            src={channel.thumbnail.url}
            alt="thumbnail"
            width={200}
            height={200}
          />
          <Link href={`/higher-lower-game/${channel.id}`}>{channel.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps<
  HigherLowerGameProps
> = async () => {
  // const querySnapshot = await getDocs(collection(db, "channels"));
  const channels: HigherLowerGameProps["channels"] = [];
  // querySnapshot.forEach((doc) => {
  //   channels.push({ id: doc.id, title: doc.data().channelTitle });
  // });

  /**
   * Temp
   */
  channels.push({
    id: "UCBkyj16n2snkRg1BAzpovXQ",
    title: "우왁굳의 게임방송",
    thumbnail: {
      url: "https://yt3.ggpht.com/TfNiEYiPS4wX6BWXerod80xL3pB8RvRLHiEDiPTPo1ZOIsgYivENAGTu2Sax_YJ-8g9SCHtvFw=s800-c-k-c0x00ffffff-no-rj",
      placeholder:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAP0lEQVR4nAE0AMv/AMSWV4JYFEwnAEwsAACgekafcjBmRAwnAAAAyad4wJFOuJRbORsAAP/2x8SSSdefUkIoAswiExpx7IkeAAAAAElFTkSuQmCC",
    },
  });

  return { props: { channels } };
};

export default HigherLowerGame;
