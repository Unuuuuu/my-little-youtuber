import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

export interface Props {
  children?: React.ReactNode;
  selectedValue: string;
  value: string;
}

export default function GameModeTabPanel(props: Props) {
  const { selectedValue, value, children } = props;

  if (value !== selectedValue) {
    return null;
  }

  return (
    <Box
      role="tabpanel"
      sx={{
        bgcolor: grey[100],
        p: "16px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        borderRadius: "0 0 8px 8px",
      }}
    >
      {children}
    </Box>
  );
}
