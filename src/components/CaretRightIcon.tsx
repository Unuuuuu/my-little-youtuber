import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function CaretRightIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 24 24"
      sx={{ color: "white", ...props.sx }}
    >
      <path
        d="M9 4.5L16.5 12L9 19.5"
        stroke="#222222"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
