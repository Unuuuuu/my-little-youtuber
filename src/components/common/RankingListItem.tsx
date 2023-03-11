import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import LocalFireDepartmentTwoToneIcon from "@mui/icons-material/LocalFireDepartmentTwoTone";
import { grey } from "@mui/material/colors";

interface RankingListItemProps {
  nickname: string;
  rank: number;
  score: number;
  active?: boolean;
}

const RankingListItem: React.FC<RankingListItemProps> = (props) => {
  const { nickname, rank, score, active } = props;

  let rankElement: JSX.Element;
  switch (rank) {
    case 1:
      rankElement = (
        <EmojiEventsTwoToneIcon
          sx={{ color: "goldTrophy", fontSize: 32, flexBasis: 40 }}
        />
      );
      break;
    case 2:
      rankElement = (
        <EmojiEventsTwoToneIcon
          sx={{ color: "silverTrophy", fontSize: 32, flexBasis: 40 }}
        />
      );
      break;
    case 3:
      rankElement = (
        <EmojiEventsTwoToneIcon
          sx={{ color: "bronzeTrophy", fontSize: 32, flexBasis: 40 }}
        />
      );
      break;
    default:
      rankElement = (
        <Typography
          fontWeight={500}
          sx={{ flexBasis: 40, flexShrink: 0, textAlign: "center" }}
        >
          {rank}
        </Typography>
      );
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
          gap: 2,
          p: 2,
          ":not(:last-child)": {
            borderBottom: 1,
            borderColor: "divider",
          },
        },
        !!active && { bgcolor: grey["A100"] },
      ]}
    >
      {rankElement}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography fontWeight={500}>{nickname}</Typography>
        </Box>
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
};

export default RankingListItem;
