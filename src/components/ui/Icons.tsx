/** Inline SVG icons for things lucide lacks (monogram medallion, rings, brand marks). stroke/fill = currentColor. */
type P = { className?: string };

export const RingsIcon = ({ className = "h-9 w-9" }: P) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="30" r="9" />
    <circle cx="30" cy="30" r="9" />
    <path d="M12 12l4-5h6l4 5-7 7Z" />
    <path d="M16 12h8" />
  </svg>
);

export const HeartsIcon = ({ className = "h-9 w-9" }: P) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 40C10 30 6 22 6 16.5 6 11.5 10 8 14.500 8c3.700 0 7 2.200 9.500 6 2.500-3.800 5.800-6 9.500-6C38 8 42 11.500 42 16.500 42 22 38 30 24 40Z" />
    <path d="M34 30l1.600 3.400 3.400 1.600-3.400 1.600L34 40l-1.600-3.400L29 35l3.400-1.600Z" fill="currentColor" stroke="none" />
  </svg>
);

export const InfinityIcon = ({ className = "h-9 w-9" }: P) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M24 24c-3-5-6-8-10-8a8 8 0 0 0 0 16c4 0 7-3 10-8Zm0 0c3 5 6 8 10 8a8 8 0 0 0 0-16c-4 0-7 3-10 8Z" />
  </svg>
);

export const InstagramIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.300" cy="6.700" r="0.600" fill="currentColor" />
  </svg>
);

export const FacebookIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
    <path d="M13.500 21v-7.600h2.600l.4-3h-3V8.500c0-.9.3-1.500 1.600-1.500h1.600V4.300c-.3 0-1.200-.1-2.300-.1-2.300 0-3.900 1.400-3.900 4v2.200H8V13.400h2.600V21h2.900Z" />
  </svg>
);

export const YouTubeIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
    <path d="M21.600 7.200a2.500 2.500 0 0 0-1.700-1.800C18.400 5 12 5 12 5s-6.400 0-7.900.4A2.500 2.500 0 0 0 2.400 7.200C2 8.700 2 12 2 12s0 3.300.4 4.800a2.500 2.500 0 0 0 1.700 1.800C5.600 19 12 19 12 19s6.400 0 7.900-.4a2.500 2.500 0 0 0 1.700-1.800c.4-1.500.4-4.800.4-4.800s0-3.300-.4-4.800ZM10 15V9l5.200 3Z" />
  </svg>
);

export const WhatsAppIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2Zm0 18.200a8.200 8.200 0 0 1-4.200-1.200l-.3-.2-3 .8.8-2.900-.2-.3A8.200 8.200 0 1 1 12 20.200Zm4.500-6.100c-.2-.1-1.500-.7-1.700-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.700 6.700 0 0 1-3.300-2.900c-.3-.4.3-.4.7-1.400.1-.2 0-.3 0-.4l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.200 5.200 5.200 0 0 0 1.100 2.700 11.800 11.800 0 0 0 4.500 4c1.700.7 2.300.8 3.200.6a2.700 2.700 0 0 0 1.800-1.300 2.200 2.200 0 0 0 .2-1.300c-.1-.1-.3-.2-.5-.3Z" />
  </svg>
);

/** Circular "PR"-style monogram in a gold laurel ring, built from the couple's initials. */
export function Monogram({ text, className = "h-16 w-16", dark = false }: { text: string; className?: string; dark?: boolean }) {
  const gold = dark ? "#E8D0A2" : "#B8893E";
  const ink = dark ? "#FBF6EA" : "#0C4952";
  const leaves = Array.from({ length: 22 }, (_, i) => i * (360 / 22));
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={`Monogram ${text}`}>
      <circle cx="50" cy="50" r="46" fill={dark ? "rgba(255,255,255,0.06)" : "rgba(255,252,244,0.9)"} stroke={gold} strokeWidth="1.6" />
      <circle cx="50" cy="50" r="38" fill="none" stroke={gold} strokeWidth="0.8" />
      {leaves.map((a) => (
        <ellipse key={a} cx="50" cy="9" rx="2.200" ry="4.600" fill={gold} opacity="0.85" transform={`rotate(${a} 50 50)`} />
      ))}
      <text x="50" y="58" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontStyle="italic" fontSize="27" fontWeight="500" fill={ink}>
        {text}
      </text>
    </svg>
  );
}
