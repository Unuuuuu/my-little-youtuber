import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function FireIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 33 32"
      sx={{ color: "transparent", ...props.sx }}
    >
      <g filter="url(#filter0_i_1865_40366)">
        <path
          d="M25.6335 14.2189C25.0544 12.9003 24.2125 11.7168 23.1606 10.7425L22.2926 9.93671C22.2631 9.91011 22.2276 9.89122 22.1892 9.88172C22.1509 9.87222 22.1108 9.8724 22.0725 9.88223C22.0342 9.89206 21.9989 9.91125 21.9697 9.93812C21.9404 9.96498 21.9181 9.99869 21.9048 10.0363L21.517 11.1619C21.2754 11.8681 20.8309 12.5893 20.2015 13.2985C20.1598 13.3438 20.112 13.3559 20.0792 13.3589C20.0464 13.3619 19.9957 13.3559 19.9509 13.3136C19.9092 13.2774 19.8883 13.2231 19.8913 13.1688C20.0017 11.3521 19.4647 9.30298 18.2894 7.07284C17.317 5.21993 15.9657 3.77442 14.2774 2.76648L13.0454 2.03316C12.8843 1.93659 12.6785 2.06334 12.6875 2.25346L12.7531 3.70199C12.7978 4.69182 12.6845 5.56697 12.416 6.29426C12.0879 7.1845 11.6166 8.01137 11.014 8.75375C10.5947 9.26967 10.1194 9.73633 9.59712 10.1449C8.33923 11.1232 7.31639 12.3767 6.60522 13.8115C5.8958 15.2589 5.52626 16.8524 5.52539 18.468C5.52539 19.8924 5.80281 21.2715 6.35167 22.5721C6.88164 23.8244 7.64644 24.9609 8.6038 25.9189C9.57027 26.8845 10.6919 27.645 11.9417 28.1731C13.2363 28.7224 14.6085 29 16.0254 29C17.4423 29 18.8144 28.7224 20.109 28.1761C21.3558 27.6511 22.4896 26.8854 23.447 25.9219C24.4134 24.9562 25.1711 23.8275 25.6991 22.5752C26.2471 21.2781 26.5283 19.8816 26.5254 18.471C26.5254 16.9983 26.2271 15.5679 25.6335 14.2189Z"
          fill="#515151"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_1865_40366"
          x="5.52539"
          y="2"
          width="21"
          height="28"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_1865_40366"
          />
        </filter>
      </defs>
    </SvgIcon>
  );
}
