import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function PlayIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 19 18"
      sx={{ color: "transparent", ...props.sx }}
    >
      <path
        d="M16.359 8.03725L6.23399 1.85678C6.06534 1.7499 5.87056 1.69141 5.67093 1.68769C5.4713 1.68397 5.27448 1.73516 5.10196 1.83568C4.92689 1.93173 4.78094 2.0732 4.67948 2.24519C4.57802 2.41718 4.52479 2.61334 4.5254 2.81303V15.188C4.52479 15.3877 4.57802 15.5839 4.67948 15.7559C4.78094 15.9279 4.92689 16.0693 5.10196 16.1654C5.27448 16.2659 5.4713 16.3171 5.67093 16.3134C5.87056 16.3096 6.06534 16.2512 6.23399 16.1443L16.359 9.96381C16.5249 9.86369 16.6622 9.7224 16.7575 9.55363C16.8528 9.38486 16.9029 9.19434 16.9029 9.00053C16.9029 8.80672 16.8528 8.61619 16.7575 8.44742C16.6622 8.27865 16.5249 8.13736 16.359 8.03725Z"
        fill="white"
      />
    </SvgIcon>
  );
}