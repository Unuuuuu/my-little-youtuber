import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { higherLowerGameActions } from "@/redux/slices/higherLowerGameSlice";
import Box from "@mui/material/Box";
import { useChannelDataWithoutVideosContext } from "@/context/ChannelDataWithoutVideosContext";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { loginRequestSnackbarActions } from "@/redux/slices/loginRequestSnackbarSlice";
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

function createData(name: string, general: string, rank: string) {
  return { name, general, rank };
}

const rows = [
  createData("시간 제한", "무제한", "10초"),
  createData("게임 내 영상 재생", "O", "X"),
  createData("점수 기록", "X", "O"),
  createData("로그인", "선택", "필수"),
];

const GameTab = () => {
  const { isSignedIn, mode } = useAppSelector((state) => ({
    isInitialized: state.user.isInitialized,
    isSignedIn: state.user.isSignedIn,
    mode: state.higherLowerGame.mode,
  }));
  const dispatch = useAppDispatch();
  const channelDataWithoutVideos = useChannelDataWithoutVideosContext();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(higherLowerGameActions.updateMode("GENERAL"));
    }
  }, [dispatch, isSignedIn]);

  const handleToggleButtonGroupChange: ToggleButtonGroupProps["onChange"] = (
    _,
    newMode
  ) => {
    if (newMode === null) {
      return;
    }

    dispatch(higherLowerGameActions.updateMode(newMode));
  };

  if (channelDataWithoutVideos === null) {
    return null;
  }

  const handlePlayButtonClick = () => {
    if (mode === "RANK" && !isSignedIn) {
      dispatch(loginRequestSnackbarActions.open());
      return;
    }

    router.push(`/channel/${channelDataWithoutVideos.id}/higher-lower-game`);
  };

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography
        component={"h2"}
        fontSize={20}
        fontWeight={500}
        sx={{
          mb: 0.5,
        }}
      >
        {channelDataWithoutVideos.id === "UCV9WL7sW6_KjanYkUUaIDfQ"
          ? "좀 더 많이 좀 더 적게"
          : "더 많이 더 적게"}
      </Typography>
      <Typography sx={{ mb: 1 }}>
        조회수가{" "}
        {channelDataWithoutVideos.id === "UCV9WL7sW6_KjanYkUUaIDfQ"
          ? "좀 더"
          : "더"}{" "}
        높은 영상을 맞추는 게임입니다.
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>게임 모드</TableCell>
              <TableCell>일반 게임</TableCell>
              <TableCell>랭크 게임</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.general}</TableCell>
                  <TableCell>{row.rank}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mb: 1 }}>
        <ToggleButtonGroup
          fullWidth
          color="secondary"
          value={mode}
          exclusive
          onChange={handleToggleButtonGroupChange}
          size="small"
        >
          <ToggleButton value="GENERAL">일반 게임</ToggleButton>
          <ToggleButton value="RANK" disabled={!isSignedIn}>
            랭크 게임
          </ToggleButton>
        </ToggleButtonGroup>
        {!isSignedIn && (
          <Typography variant="caption" color={"GrayText"}>
            랭크 게임은 로그인이 필수입니다.
          </Typography>
        )}
      </Box>
      <Button
        variant="contained"
        onClick={handlePlayButtonClick}
        fullWidth
        size="large"
        startIcon={<PlayArrowRoundedIcon />}
      >
        플레이
      </Button>
      <Typography variant="caption" color={"GrayText"}>
        {new Date(channelDataWithoutVideos.updateTime).toLocaleDateString(
          "ko",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        )}
        에 마지막으로 업데이트되었습니다.
      </Typography>
    </Box>
  );
};

export default GameTab;
