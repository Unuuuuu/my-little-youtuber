import Box from "@mui/material/Box";
import { grey } from "@/lib/colors";

export interface Props {
  children?: React.ReactNode;
  selectedValue: string;
  value: string;
}

export default function RankingTabPanel(props: Props) {
  const { selectedValue, value, children } = props;

  if (value !== selectedValue) {
    return null;
  }

  return (
    <Box
      role="tabpanel"
      sx={{
        p: "24px 0",
      }}
    >
      {children}
    </Box>
  );
}
