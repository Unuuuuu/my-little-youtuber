import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function CirclePlusIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="#616161"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.25 12H15.75"
        stroke="#616161"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 8.25V15.75"
        stroke="#616161"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
