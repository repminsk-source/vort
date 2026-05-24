export function VortLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="vort-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c5cfc" />
          <stop offset="100%" stopColor="#00d4ff" />
        </linearGradient>
        <linearGradient id="vort-grad-icon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {/* Background */}
      <rect width="36" height="36" rx="10" fill="url(#vort-grad)" />
      {/* Inner glow */}
      <rect width="36" height="36" rx="10" fill="white" fillOpacity="0.06" />
      {/* V shape main */}
      <path
        d="M9 10 L18 24 L27 10"
        stroke="url(#vort-grad-icon)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Center dot / spark */}
      <circle cx="18" cy="27.5" r="2" fill="white" fillOpacity="0.6" />
    </svg>
  );
}

export function VortLogoText({ iconSize = 32 }: { iconSize?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
      <VortLogo size={iconSize} />
      <span
        style={{
          fontWeight: 800,
          fontSize: iconSize * 0.65,
          letterSpacing: "-0.03em",
          background: "linear-gradient(135deg, #9d7ffe, #00d4ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Vort
      </span>
    </span>
  );
}
