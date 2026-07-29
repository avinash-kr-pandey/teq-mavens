import { cn } from "@/lib/utils";

const laps = [
  ["LAP 01", "Speed Zone"],
  ["LAP 02", "Acceleration Zone"],
  ["LAP 03", "Technical Section"],
  ["LAP 04", "High Speed Zone"],
  ["LAP 05", "Final Corner"],
];

export function LapTrack({ active = 3 }: { active?: number }) {
  return (
    <footer className="lap-track">
      <svg
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="track-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7f0005" stopOpacity="0.34" />
            <stop offset="48%" stopColor="#390003" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#0b0506" stopOpacity="0.92" />
          </linearGradient>
          <linearGradient id="track-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a90005" />
            <stop offset="50%" stopColor="#ef0a10" />
            <stop offset="100%" stopColor="#a90005" />
          </linearGradient>
        </defs>
        <path
          d="M0 72 C88 53 176 78 286 49 C386 23 470 57 580 31 C686 6 772 40 878 18 C982 -4 1068 27 1174 8 C1272 -9 1354 12 1440 0 L1440 130 L0 130 Z"
          fill="url(#track-fill)"
        />
        <path
          d="M0 72 C88 53 176 78 286 49 C386 23 470 57 580 31 C686 6 772 40 878 18 C982 -4 1068 27 1174 8 C1272 -9 1354 12 1440 0"
          fill="none"
          stroke="url(#track-line)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="7 7"
          opacity="0.95"
        />
      </svg>
      <div className="lap-items">
        {laps.map(([label, detail], index) => (
          <div className={cn("lap", index === active && "active")} key={label}>
            <span className="lap-dot" />
            <b>{label}</b>
            <small>{detail}</small>
          </div>
        ))}
      </div>
    </footer>
  );
}
