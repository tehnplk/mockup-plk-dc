type P = { className?: string; size?: number };

const base = (size = 18) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const I = {
  hospital: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M3 21h18M5 21V7l7-4 7 4v14" />
      <path d="M12 9v6M9 12h6" />
    </svg>
  ),
  field: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
  area: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="m9 4 6 2 6-2v14l-6 2-6-2-6 2V6l6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  ),
  chart: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M3 21h18" />
      <rect x="5" y="11" width="3.6" height="7" rx="1" />
      <rect x="10.2" y="6" width="3.6" height="12" rx="1" />
      <rect x="15.4" y="14" width="3.6" height="4" rx="1" />
    </svg>
  ),
  chat: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.5-5A8 8 0 1 1 21 12Z" />
    </svg>
  ),
  grid: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
    </svg>
  ),
  file: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  ),
  mic: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
    </svg>
  ),
  camera: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M3 8.5A2 2 0 0 1 5 6.5h2l1.4-2h7.2L17 6.5h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <circle cx="12" cy="13" r="3.4" />
    </svg>
  ),
  pin: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
  map: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="m9 4 6 2 6-2v14l-6 2-6-2-6 2V6l6-2Z" />
    </svg>
  ),
  bell: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6Z" />
      <path d="M10.3 20a2 2 0 0 0 3.4 0" />
    </svg>
  ),
  search: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  ),
  send: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z" />
    </svg>
  ),
  sparkles: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="m12 3 1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3Z" />
      <path d="M18.5 15.5 19.4 17.6 21.5 18.5 19.4 19.4 18.5 21.5 17.6 19.4 15.5 18.5 17.6 17.6Z" />
    </svg>
  ),
  shield: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M12 21s7-3.2 7-9V5.8l-7-2.6-7 2.6V12c0 5.8 7 9 7 9Z" />
      <path d="m9 12 2.2 2.2L15.2 10" />
    </svg>
  ),
  users: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0M16.5 5.2a3.4 3.4 0 0 1 0 6.6M18 20a6.2 6.2 0 0 0-2.2-4.7" />
    </svg>
  ),
  clock: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.2 1.9" />
    </svg>
  ),
  check: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  ),
  plus: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  arrowLeft: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  ),
  arrowRight: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  home: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1Z" />
    </svg>
  ),
  clipboard: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <rect x="5" y="4.5" width="14" height="16" rx="2" />
      <path d="M9 4.5V3.4A1.4 1.4 0 0 1 10.4 2h3.2A1.4 1.4 0 0 1 15 3.4v1.1Z" />
      <path d="M9 11h6M9 15h4" />
    </svg>
  ),
  image: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.4" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4.5 17 4.6-4.6 4 4 2.6-2.4 3.8 3.6" />
    </svg>
  ),
  megaphone: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M4 10v4a2 2 0 0 0 2 2h2l8 4.5V3.5L8 8H6a2 2 0 0 0-2 2Z" />
      <path d="M19 9.5a3.5 3.5 0 0 1 0 5M8 16v4.5" />
    </svg>
  ),
  heart: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />
    </svg>
  ),
  settings: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 14a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1v.3a2 2 0 1 1-4 0V20a1.6 1.6 0 0 0-2.7-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 4 13.4H3.8a2 2 0 1 1 0-4H4a1.6 1.6 0 0 0 1.1-2.7L5 6.6a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10.6 4v-.2a2 2 0 1 1 4 0V4a1.6 1.6 0 0 0 2.7 1.1l.1-.1A2 2 0 1 1 20.2 7l-.1.1a1.6 1.6 0 0 0 1.1 2.7h.3a2 2 0 1 1 0 4H21a1.6 1.6 0 0 0-1.5 1Z" />
    </svg>
  ),
  db: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </svg>
  ),
  wave: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M3 12h2l2-6 3 13 3-16 3 15 2-6h3" />
    </svg>
  ),
  link: (p: P) => (
    <svg {...base(p.size)} className={p.className}>
      <path d="M10 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7l-1.4 1.4" />
      <path d="M14 10.5a4 4 0 0 0-5.7 0L5.5 13.3a4 4 0 1 0 5.7 5.7l1.4-1.4" />
    </svg>
  ),
};

export type IconName = keyof typeof I;

export function Icon({
  name,
  size = 18,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const C = I[name];
  return <C size={size} className={className} />;
}
