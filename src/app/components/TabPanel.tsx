import Box from "@mui/material/Box";

export interface Props {
  children?: React.ReactNode;
  selectedValue: string;
  value: string;
}

export default function TabPanel(props: Props) {
  const { selectedValue, value, children } = props;

  if (value !== selectedValue) {
    return null;
  }

  return (
    <Box
      role="tabpanel"
      sx={{
        maxWidth: "1144px",
        margin: "0 auto",
        minHeight: {
          sm: "calc(100vh - (56px + 48px + 166px))",
          md: "calc(100vh - (96px + 60px + 166px))",
        },
      }}
    >
      {children}
    </Box>
  );
}
