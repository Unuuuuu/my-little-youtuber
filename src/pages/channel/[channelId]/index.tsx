import HigherLowerGameIcon from "@/components/higher-lower-game/HigherLowerGameIcon";
import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { higherLowerGameActions } from "@/redux/slices/higherLowerGameSlice";
import { ChannelData, ChannelDataWithoutVideos } from "@/types";
import { db } from "@/utils/firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";
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
  const { mode } = useAppSelector((state) => ({
    mode: state.higherLowerGame.mode,
  }));
  const dispatch = useAppDispatch();

  const handleCheckboxChange: SwitchBaseProps["onChange"] = (_, checked) => {
    dispatch(higherLowerGameActions.updateMode(checked));
  };

  return (
    <>
      <Header
        channelDataWithoutVideos={channelDataWithoutVideos}
        pageType="CHANNEL"
      />
      <Main>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={mode === "RANK"}
                  onChange={handleCheckboxChange}
                />
              }
              label="랭크 게임"
            />
            <Link
              href={`/channel/${channelDataWithoutVideos.id}/higher-lower-game`}
            >
              <Button variant="contained">더 많이 더 적게 플레이</Button>
            </Link>
            <Box>
              {channelDataWithoutVideos.updateTime}에 업데이트된 데이터로 오차가
              있을 수 있습니다.
            </Box>
          </Box>
        </Box>
      </Main>
    </>
  );
};

export default Channel;
