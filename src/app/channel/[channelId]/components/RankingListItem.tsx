import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import LocalFireDepartmentTwoToneIcon from "@mui/icons-material/LocalFireDepartmentTwoTone";
import { grey } from "@mui/material/colors";

interface Props {
  nickname: string;
  rank: number;
  score: number;
  isActive?: boolean;
}

export default function RankingListItem(props: Props) {
  const { nickname, rank, score, isActive } = props;

  let rankElement: JSX.Element;
  switch (rank) {
    case 1:
      rankElement = (
        <EmojiEventsTwoToneIcon
          sx={{
            color: "goldTrophy",
            fontSize: 32,
          }}
        />
      );
      break;
    case 2:
      rankElement = (
        <EmojiEventsTwoToneIcon
          sx={{
            color: "silverTrophy",
            fontSize: 32,
          }}
        />
      );
      break;
    case 3:
      rankElement = (
        <EmojiEventsTwoToneIcon
          sx={{
            color: "bronzeTrophy",
            fontSize: 32,
          }}
        />
      );
      break;
    default:
      rankElement = <Typography fontSize={20}>{rank}</Typography>;
      break;
  }

  return (
    <Box
      component={"li"}
      sx={[
        {
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 2,
          ":not(:last-child)": {
            borderBottom: 1,
            borderColor: "divider",
          },
        },
        !!isActive && { bgcolor: grey["A100"] },
      ]}
    >
      <Box
        sx={{
          flexBasis: 48,
          flexShrink: 0,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {rankElement}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <Typography noWrap>{nickname}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
          <LocalFireDepartmentTwoToneIcon
            sx={{ color: "fire", fontSize: 16 }}
          />
          <Typography fontSize={14} color="GrayText">
            {score}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
