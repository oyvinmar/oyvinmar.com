type DefaultProps = { className: string };

export const StravaLogo = ({ className }: DefaultProps) => (
  <svg
    height="512"
    width="512"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fill="#f50"
      d="M226.172 26.001L90.149 288.345h80.141l55.882-104.309 55.433 104.309h79.511z"
    />
    <path
      fill="#ffaf8a"
      d="M361.116 288.345l-39.441 79.241-40.07-79.241h-60.734l100.804 197.654 100.176-197.654z"
    />
  </svg>
);

export const PinboardLogo = ({ className }: DefaultProps) => (
  <svg
    viewBox="0 0 2048 2048"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    className={className}
    clipRule="evenodd"
  >
    <path
      fill="#007fce"
      d="M1162.72 891.269L827.812 582.838v-134.84l-27.439-11.124-363.81 372.191 12.25 27.063 156.427-8.445 284.81 351.277-33.369 187.86 27.188 13.87 205.821-210.63 499.75 441.88 22.5-22.57-440.65-494.22 215.02-228.533-15.43-26.437z"
      id="Layer_x0020_1"
    />
  </svg>
);

export const SwarmLogo = ({ className }: DefaultProps) => (
  <svg
    viewBox="0 0 207.6 193.1"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g fill="#F8A131">
      <ellipse
        cx="179.8"
        cy="115.1"
        rx="24"
        ry="42"
        transform="rotate(-24 180 115)"
      />
      <path d="M139 130c-9-21-11-42-5-55-24 6-42 30-42 58 0 33 25 60 56 60 16 0 31-7 41-19-17 3-39-15-50-44zM70 125s-26 32-22 44 50 20 50 20-14-18-18-28c-5-11-10-36-10-36zM106 66S45-22 6 29c-21 29 17 46 54 48 28 2 46-11 46-11z" />
      <ellipse
        cx="133.8"
        cy="29.1"
        rx="32"
        ry="18"
        transform="rotate(-60 134 29)"
      />
    </g>
  </svg>
);

export const UntappdLogo = ({ className }: DefaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className={className}
    viewBox="0 0 1252 1252"
  >
    <defs>
      <linearGradient id="a">
        <stop offset="0" stopColor="#ffce0d" />
        <stop offset="1" stopColor="#eec211" />
      </linearGradient>
      <linearGradient id="b">
        <stop offset="0" stopColor="#ffce0d" />
        <stop offset="1" stopColor="#eec211" />
      </linearGradient>
      <linearGradient
        xlinkHref="#a"
        id="c"
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(35.432 -98.561 379.96)"
        x1="11.405"
        y1="156.407"
        x2="980.347"
        y2="29.127"
      />
      <linearGradient
        xlinkHref="#b"
        id="d"
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(35.432 219.274 967.13)"
        x1="-280.79"
        y1="232.862"
        x2="140.13"
        y2="1057.147"
      />
    </defs>
    <path
      d="M680.281 957.45c92.174 38.905 226.357-51.582 218.238-150.953L620.59 404.68l-95.705-52.353-214.26-230.033-3.856-16.874-14.635-4.208-2.07-16.806c-38.811 3.74-64.518 21.522-80.775 55.87l15.288 7.664.537 13.96 14.429 9.56 143.179 279.199 19.63 104.973z"
      fill="url(#c)"
      transform="translate(253.953 99.819)"
    />
    <path
      d="M-158.903 806.832c-5.214 99.913 125.537 195.291 216.214 153.838l283.245-398.089 16.657-107.809 143.384-279.756 14.555-9.368-1.025-15.193 15.099-7.668c-16.726-35.22-42.194-53.34-80.025-56.938l-2.004 16.984-12.943 5.255-4.08 16.822L216.37 354.56l-92.027 54.183z"
      fill="url(#d)"
      transform="translate(253.953 99.819)"
    />
  </svg>
);

export const TwitterLogo = ({ className }: DefaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300.00006 244.18703"
    className={className}
    version="1.1"
  >
    <g transform="translate(-539.18 -568.86)">
      <path
        d="m633.9 812.04c112.46 0 173.96-93.168 173.96-173.96 0-2.6463-0.0539-5.2806-0.1726-7.903 11.938-8.6302 22.314-19.4 30.498-31.66-10.955 4.8694-22.744 8.1474-35.111 9.6255 12.623-7.5693 22.314-19.543 26.886-33.817-11.813 7.0031-24.895 12.093-38.824 14.841-11.157-11.884-27.041-19.317-44.629-19.317-33.764 0-61.144 27.381-61.144 61.132 0 4.7978 0.5364 9.4646 1.5854 13.941-50.815-2.5569-95.874-26.886-126.03-63.88-5.2508 9.0354-8.2785 19.531-8.2785 30.73 0 21.212 10.794 39.938 27.208 50.893-10.031-0.30992-19.454-3.0635-27.69-7.6468-0.009 0.25652-0.009 0.50661-0.009 0.78077 0 29.61 21.075 54.332 49.051 59.934-5.1376 1.4006-10.543 2.1516-16.122 2.1516-3.9336 0-7.766-0.38716-11.491-1.1026 7.7838 24.293 30.355 41.971 57.115 42.465-20.926 16.402-47.287 26.171-75.937 26.171-4.929 0-9.7983-0.28036-14.584-0.84634 27.059 17.344 59.189 27.464 93.722 27.464"
        fill="#1da1f2"
      />
    </g>
  </svg>
);

export const GithubLogo = ({ className }: DefaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="0 0 16 16"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
    />
  </svg>
);
