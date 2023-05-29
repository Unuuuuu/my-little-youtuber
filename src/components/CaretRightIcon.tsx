import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function CaretRightIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 32 32"
      sx={{ color: "transparent", ...props.sx }}
    >
      <path
        d="M12 6L22 16L12 26"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
