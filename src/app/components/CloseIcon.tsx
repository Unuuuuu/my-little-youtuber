import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function CloseIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M18.75 5.25L5.25 18.75"
        stroke="#616161"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.75 18.75L5.25 5.25"
        stroke="#616161"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
