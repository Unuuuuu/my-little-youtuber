import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function NextIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 24 20"
      sx={{ color: "transparent", ...props.sx }}
    >
      <path
        d="M22.8608 9.18627C23.4191 9.58509 23.4191 10.4149 22.8608 10.8137L11.5812 18.8705C10.9194 19.3433 10 18.8702 10 18.0568L10 1.94319C10 1.12982 10.9194 0.656692 11.5812 1.12946L22.8608 9.18627Z"
        fill="white"
      />
      <path
        d="M12.8608 9.18627C13.4191 9.58509 13.4191 10.4149 12.8608 10.8137L1.58124 18.8705C0.919371 19.3433 3.77157e-07 18.8702 4.02007e-07 18.0568L8.94306e-07 1.94319C9.19156e-07 1.12982 0.919371 0.656692 1.58124 1.12946L12.8608 9.18627Z"
        fill="white"
      />
    </SvgIcon>
  );
}
