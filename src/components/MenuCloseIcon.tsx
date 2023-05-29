import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function MenuCloseIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 24 24"
      sx={{ color: "transparent", ...props.sx }}
    >
      <circle cx="12" cy="12" r="9" />
      <path
        d="M15 15L9 9"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 9L9 15"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
