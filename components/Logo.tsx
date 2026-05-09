export function MaltzLogo({
  size = 44,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Maltz"
    >
      {/* Hexagon outer */}
      <path
        d="M24 2 L42 12 L42 36 L24 46 L6 36 L6 12 Z"
        stroke="#F5A623"
        strokeWidth="2"
        fill="rgba(245, 166, 35, 0.06)"
      />
      {/* Hexagon inner */}
      <path
        d="M24 7 L37.5 14.5 L37.5 33.5 L24 41 L10.5 33.5 L10.5 14.5 Z"
        stroke="#F5A623"
        strokeWidth="1"
        opacity="0.5"
        fill="none"
      />
      {/* Tower silhouette */}
      <g fill="#F5A623">
        {/* Tower spire */}
        <path d="M23 14 L24 11 L25 14 L25 16 L23 16 Z" />
        {/* Tower body */}
        <rect x="20" y="16" width="8" height="14" />
        {/* Tower base flare */}
        <path d="M18 30 L30 30 L29 33 L19 33 Z" />
        {/* Door */}
        <rect x="22" y="24" width="4" height="6" fill="#000000" />
        {/* Windows */}
        <rect x="21" y="19" width="2" height="2" fill="#000000" />
        <rect x="25" y="19" width="2" height="2" fill="#000000" />
      </g>
      {/* Bottom accent */}
      <rect x="14" y="35" width="20" height="1.2" fill="#F5A623" opacity="0.8" />
    </svg>
  );
}
