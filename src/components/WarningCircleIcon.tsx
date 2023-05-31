import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function WarningCircleIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 16 16"
      sx={{ color: "transparent", ...props.sx }}
    >
      <path
        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 5V8.25"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M8.00078 11.1139C8.38738 11.1139 8.70078 10.8005 8.70078 10.4139C8.70078 10.0273 8.38738 9.71387 8.00078 9.71387C7.61418 9.71387 7.30078 10.0273 7.30078 10.4139C7.30078 10.8005 7.61418 11.1139 8.00078 11.1139Z" />
    </SvgIcon>
  );
}
