/* ============================================================
   FIXZ24 — Animated SVG Service Illustrations
   6 variants: admin, tax, payroll, report, advice, starter
   Uses stroke-dasharray draw-in on intersection
   ============================================================ */

import { useEffect, useRef } from "react";

type Variant = "admin" | "tax" | "payroll" | "report" | "advice" | "starter";

const BLUE = "#464888";
const BLUE_LIGHT = "#5a5ca8";
const GOLD = "#ac9773";
const NAVY = "#1a1a2e";

function useDrawOnView() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("svg-drawn");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function AdminIllustration({ ref }: { ref: React.RefObject<SVGSVGElement | null> }) {
  return (
    <svg ref={ref} viewBox="0 0 400 300" className="service-illustration w-full h-full">
      <defs>
        <linearGradient id="admin-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={BLUE} stopOpacity="0.05" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="300" fill="url(#admin-bg)" rx="16" />
      {/* Background doc (back, rotated) */}
      <g transform="translate(80 50) rotate(-7)" className="svg-layer" style={{ animationDelay: "0.1s" }}>
        <rect width="180" height="220" rx="10" fill="white" stroke={BLUE} strokeOpacity="0.15" strokeWidth="1.5" />
        <line x1="20" y1="30" x2="150" y2="30" stroke={BLUE} strokeOpacity="0.2" strokeWidth="2" />
        <line x1="20" y1="55" x2="120" y2="55" stroke={BLUE} strokeOpacity="0.15" strokeWidth="2" />
        <line x1="20" y1="80" x2="140" y2="80" stroke={BLUE} strokeOpacity="0.15" strokeWidth="2" />
      </g>
      {/* Middle doc */}
      <g transform="translate(120 55)" className="svg-layer" style={{ animationDelay: "0.25s" }}>
        <rect width="190" height="220" rx="12" fill="white" stroke={BLUE} strokeOpacity="0.2" strokeWidth="1.5" />
        <line x1="20" y1="35" x2="160" y2="35" stroke={BLUE} strokeOpacity="0.3" strokeWidth="2.5" className="svg-line" />
        <line x1="20" y1="60" x2="130" y2="60" stroke={BLUE} strokeOpacity="0.2" strokeWidth="2" className="svg-line" />
        <line x1="20" y1="80" x2="150" y2="80" stroke={BLUE} strokeOpacity="0.2" strokeWidth="2" className="svg-line" />
        <line x1="20" y1="100" x2="110" y2="100" stroke={BLUE} strokeOpacity="0.2" strokeWidth="2" className="svg-line" />
        {/* Row items */}
        <rect x="20" y="130" width="150" height="18" rx="4" fill={BLUE} fillOpacity="0.08" />
        <rect x="20" y="155" width="150" height="18" rx="4" fill={BLUE} fillOpacity="0.08" />
        <rect x="20" y="180" width="150" height="18" rx="4" fill={BLUE} fillOpacity="0.08" />
      </g>
      {/* Floating check badge */}
      <g transform="translate(278 54)" className="svg-pop" style={{ animationDelay: "0.7s" }}>
        <circle r="28" fill={GOLD} />
        <path d="M -10 0 L -3 7 L 11 -7" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" className="svg-path" pathLength="1" />
      </g>
      {/* Small € floating chip */}
      <g transform="translate(90 250)" className="svg-pop" style={{ animationDelay: "0.85s" }}>
        <rect x="-36" y="-14" width="72" height="28" rx="14" fill="white" stroke={BLUE} strokeOpacity="0.15" />
        <text x="0" y="5" textAnchor="middle" fill={BLUE} fontSize="13" fontWeight="700" fontFamily="DM Sans, sans-serif">€ 1.240</text>
      </g>
    </svg>
  );
}

function TaxIllustration({ ref }: { ref: React.RefObject<SVGSVGElement | null> }) {
  return (
    <svg ref={ref} viewBox="0 0 400 300" className="service-illustration w-full h-full">
      <defs>
        <linearGradient id="tax-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={GOLD} stopOpacity="0.06" />
          <stop offset="1" stopColor={BLUE} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="300" fill="url(#tax-bg)" rx="16" />
      {/* Calculator body */}
      <g transform="translate(120 50)" className="svg-layer" style={{ animationDelay: "0.1s" }}>
        <rect width="160" height="210" rx="16" fill="white" stroke={BLUE} strokeOpacity="0.15" strokeWidth="1.5" />
        {/* Display */}
        <rect x="16" y="16" width="128" height="44" rx="8" fill={NAVY} />
        <text x="134" y="46" textAnchor="end" fill={GOLD} fontSize="18" fontWeight="700" fontFamily="Playfair Display, serif" className="svg-fadein" style={{ animationDelay: "0.6s" }}>21%</text>
        {/* Buttons grid */}
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2].map((col) => {
            const x = 22 + col * 40;
            const y = 75 + row * 30;
            const isAccent = row === 0 && col === 2;
            return (
              <rect
                key={`${row}-${col}`}
                x={x}
                y={y}
                width="28"
                height="22"
                rx="5"
                fill={isAccent ? GOLD : BLUE}
                fillOpacity={isAccent ? "1" : "0.08"}
                className="svg-pop"
                style={{ animationDelay: `${0.3 + row * 0.06 + col * 0.04}s` }}
              />
            );
          })
        )}
      </g>
      {/* Floating % badge */}
      <g transform="translate(300 90)" className="svg-pop" style={{ animationDelay: "0.9s" }}>
        <circle r="32" fill={BLUE} />
        <text x="0" y="8" textAnchor="middle" fill="white" fontSize="24" fontWeight="700" fontFamily="Playfair Display, serif">%</text>
      </g>
      {/* Euro coin */}
      <g transform="translate(85 240)" className="svg-pop" style={{ animationDelay: "0.75s" }}>
        <circle r="22" fill={GOLD} />
        <text x="0" y="6" textAnchor="middle" fill="white" fontSize="18" fontWeight="700" fontFamily="Playfair Display, serif">€</text>
      </g>
      {/* Sparkline upward */}
      <path d="M 40 100 Q 80 120 100 70 T 160 50" stroke={BLUE} strokeOpacity="0.25" strokeWidth="2" strokeDasharray="4 4" fill="none" className="svg-path" pathLength="1" style={{ animationDelay: "0.5s" }} />
    </svg>
  );
}

function PayrollIllustration({ ref }: { ref: React.RefObject<SVGSVGElement | null> }) {
  return (
    <svg ref={ref} viewBox="0 0 400 300" className="service-illustration w-full h-full">
      <defs>
        <linearGradient id="pay-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={BLUE_LIGHT} stopOpacity="0.06" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="300" fill="url(#pay-bg)" rx="16" />
      {/* Three people */}
      {[
        { x: 110, delay: 0.15 },
        { x: 200, delay: 0.3 },
        { x: 290, delay: 0.45 },
      ].map((p) => (
        <g key={p.x} transform={`translate(${p.x} 130)`} className="svg-pop" style={{ animationDelay: `${p.delay}s` }}>
          <circle cx="0" cy="-20" r="18" fill={BLUE_LIGHT} />
          <path d="M -28 30 Q 0 -8 28 30" fill={BLUE} />
        </g>
      ))}
      {/* Money arrows between them */}
      <path d="M 145 110 Q 165 85 185 110" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" fill="none" className="svg-path" pathLength="1" style={{ animationDelay: "0.7s" }} />
      <path d="M 235 110 Q 255 85 275 110" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" fill="none" className="svg-path" pathLength="1" style={{ animationDelay: "0.8s" }} />
      {/* Euro chips near people */}
      {[140, 230].map((cx, i) => (
        <g key={cx} transform={`translate(${cx} 75)`} className="svg-pop" style={{ animationDelay: `${0.9 + i * 0.1}s` }}>
          <circle r="14" fill={GOLD} />
          <text x="0" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="Playfair Display, serif">€</text>
        </g>
      ))}
      {/* Payslip at bottom */}
      <g transform="translate(80 200)" className="svg-layer" style={{ animationDelay: "0.5s" }}>
        <rect width="240" height="70" rx="10" fill="white" stroke={BLUE} strokeOpacity="0.15" strokeWidth="1.5" />
        <line x1="16" y1="18" x2="100" y2="18" stroke={BLUE} strokeOpacity="0.3" strokeWidth="2" className="svg-line" />
        <line x1="16" y1="35" x2="180" y2="35" stroke={BLUE} strokeOpacity="0.15" strokeWidth="2" className="svg-line" />
        <line x1="16" y1="52" x2="140" y2="52" stroke={BLUE} strokeOpacity="0.15" strokeWidth="2" className="svg-line" />
        <rect x="180" y="14" width="48" height="22" rx="4" fill={GOLD} fillOpacity="0.85" />
        <text x="204" y="30" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="DM Sans, sans-serif">OK</text>
      </g>
    </svg>
  );
}

function ReportIllustration({ ref }: { ref: React.RefObject<SVGSVGElement | null> }) {
  return (
    <svg ref={ref} viewBox="0 0 400 300" className="service-illustration w-full h-full">
      <defs>
        <linearGradient id="rep-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={BLUE} stopOpacity="0.05" />
          <stop offset="1" stopColor={BLUE_LIGHT} stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="300" fill="url(#rep-bg)" rx="16" />
      {/* Axis */}
      <line x1="60" y1="240" x2="340" y2="240" stroke={BLUE} strokeOpacity="0.25" strokeWidth="2" />
      <line x1="60" y1="60" x2="60" y2="240" stroke={BLUE} strokeOpacity="0.25" strokeWidth="2" />
      {/* Bars growing */}
      {[
        { x: 90, h: 60, delay: 0.2 },
        { x: 140, h: 90, delay: 0.3 },
        { x: 190, h: 75, delay: 0.4 },
        { x: 240, h: 120, delay: 0.5 },
        { x: 290, h: 155, delay: 0.6 },
      ].map((b) => (
        <rect
          key={b.x}
          x={b.x}
          y={240 - b.h}
          width="30"
          height={b.h}
          rx="4"
          fill={b.h > 130 ? GOLD : BLUE}
          fillOpacity={b.h > 130 ? "1" : "0.75"}
          className="svg-bar-grow"
          style={{
            transformOrigin: `${b.x + 15}px 240px`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
      {/* Trend arrow */}
      <path d="M 105 200 L 155 160 L 205 175 L 255 130 L 305 90" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="svg-path" pathLength="1" style={{ animationDelay: "0.85s" }} />
      <path d="M 290 95 L 305 90 L 300 105" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="svg-path" pathLength="1" style={{ animationDelay: "1.05s" }} />
      {/* Year label chip */}
      <g transform="translate(340 270)" className="svg-pop" style={{ animationDelay: "0.9s" }}>
        <rect x="-30" y="-14" width="60" height="28" rx="14" fill={NAVY} />
        <text x="0" y="5" textAnchor="middle" fill={GOLD} fontSize="12" fontWeight="600" fontFamily="DM Sans, sans-serif">+12%</text>
      </g>
    </svg>
  );
}

function AdviceIllustration({ ref }: { ref: React.RefObject<SVGSVGElement | null> }) {
  return (
    <svg ref={ref} viewBox="0 0 400 300" className="service-illustration w-full h-full">
      <defs>
        <linearGradient id="adv-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={GOLD} stopOpacity="0.05" />
          <stop offset="1" stopColor={BLUE} stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="300" fill="url(#adv-bg)" rx="16" />
      {/* Outer target rings */}
      <g transform="translate(200 150)">
        <circle r="100" fill="none" stroke={BLUE} strokeOpacity="0.12" strokeWidth="2" className="svg-ring" style={{ animationDelay: "0.1s" }} />
        <circle r="75" fill="none" stroke={BLUE} strokeOpacity="0.18" strokeWidth="2" className="svg-ring" style={{ animationDelay: "0.25s" }} />
        <circle r="50" fill="none" stroke={BLUE} strokeOpacity="0.25" strokeWidth="2" className="svg-ring" style={{ animationDelay: "0.4s" }} />
        <circle r="25" fill={GOLD} className="svg-pop" style={{ animationDelay: "0.55s" }} />
        {/* North arrow */}
        <path d="M 0 -40 L -10 -15 L 0 -20 L 10 -15 Z" fill={NAVY} className="svg-pop" style={{ animationDelay: "0.75s" }} />
      </g>
      {/* Idea lightbulb chip */}
      <g transform="translate(75 90)" className="svg-pop" style={{ animationDelay: "0.9s" }}>
        <circle r="26" fill="white" stroke={BLUE} strokeOpacity="0.2" />
        <path d="M -2 -10 a 10 10 0 1 1 4 0 v 10 h -4 z" fill={GOLD} />
        <line x1="-6" y1="4" x2="6" y2="4" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Trend sparkline chip */}
      <g transform="translate(325 240)" className="svg-pop" style={{ animationDelay: "1s" }}>
        <rect x="-40" y="-18" width="80" height="36" rx="18" fill="white" stroke={BLUE} strokeOpacity="0.15" />
        <path d="M -28 4 L -14 -4 L 0 2 L 14 -8 L 28 -4" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

function StarterIllustration({ ref }: { ref: React.RefObject<SVGSVGElement | null> }) {
  return (
    <svg ref={ref} viewBox="0 0 400 300" className="service-illustration w-full h-full">
      <defs>
        <linearGradient id="start-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={BLUE_LIGHT} stopOpacity="0.06" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.07" />
        </linearGradient>
        <linearGradient id="rocket-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={BLUE_LIGHT} />
          <stop offset="1" stopColor={BLUE} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="300" fill="url(#start-bg)" rx="16" />
      {/* Trail */}
      <path d="M 200 280 Q 180 220 200 180" stroke={GOLD} strokeOpacity="0.35" strokeWidth="10" strokeLinecap="round" fill="none" className="svg-path" pathLength="1" style={{ animationDelay: "0.15s" }} />
      <path d="M 200 280 Q 220 220 200 180" stroke={GOLD} strokeOpacity="0.2" strokeWidth="18" strokeLinecap="round" fill="none" className="svg-path" pathLength="1" style={{ animationDelay: "0.25s" }} />
      {/* Rocket body */}
      <g transform="translate(200 130)" className="svg-pop" style={{ animationDelay: "0.35s" }}>
        {/* Fuselage */}
        <path d="M 0 -60 Q 22 -20 22 30 L -22 30 Q -22 -20 0 -60 Z" fill="url(#rocket-body)" />
        {/* Window */}
        <circle cy="-15" r="10" fill={GOLD} />
        <circle cy="-15" r="5" fill="white" fillOpacity="0.7" />
        {/* Fins */}
        <path d="M -22 10 L -38 40 L -22 30 Z" fill={NAVY} />
        <path d="M 22 10 L 38 40 L 22 30 Z" fill={NAVY} />
        {/* Bottom flames */}
        <path d="M -14 30 L 0 55 L 14 30 Z" fill={GOLD} className="svg-flame" />
      </g>
      {/* Stars */}
      {[
        { x: 80, y: 70, delay: 0.6 },
        { x: 330, y: 90, delay: 0.75 },
        { x: 310, y: 180, delay: 0.9 },
        { x: 70, y: 200, delay: 1.05 },
      ].map((s) => (
        <g key={`${s.x}-${s.y}`} transform={`translate(${s.x} ${s.y})`} className="svg-pop" style={{ animationDelay: `${s.delay}s` }}>
          <path d="M 0 -6 L 2 -2 L 6 0 L 2 2 L 0 6 L -2 2 L -6 0 L -2 -2 Z" fill={GOLD} />
        </g>
      ))}
    </svg>
  );
}

export default function ServiceIllustration({ variant }: { variant: Variant }) {
  const ref = useDrawOnView();
  const props = { ref };
  switch (variant) {
    case "admin":
      return <AdminIllustration {...props} />;
    case "tax":
      return <TaxIllustration {...props} />;
    case "payroll":
      return <PayrollIllustration {...props} />;
    case "report":
      return <ReportIllustration {...props} />;
    case "advice":
      return <AdviceIllustration {...props} />;
    case "starter":
      return <StarterIllustration {...props} />;
  }
}
