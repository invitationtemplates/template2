import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

const base = "pointer-events-none select-none";

/** Thin gold-to-teal line at the very top of the page that fills as the guest scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  return (
    <div className={`${base} fixed left-1/2 top-0 z-[60] h-[3px] w-full max-w-[430px] -translate-x-1/2`} aria-hidden>
      <motion.div className="h-full origin-left bg-gradient-to-r from-teal via-gold-light to-teal" style={{ scaleX }} />
    </div>
  );
}

// Twinkling dust: [left %, top %, size px, delay s, duration s]. Deterministic, so renders are stable.
const DUST: [number, number, number, number, number][] = Array.from({ length: 22 }, (_, i) => [
  (i * 41.3 + 7) % 100,
  (i * 27.7 + 11) % 100,
  2 + ((i * 3) % 4),
  (i * 0.43) % 3,
  2.2 + ((i * 0.37) % 2.4),
]);

/** Small four-point stars that fade in and out, scattered over a section. */
export function Sparkles({ className = "", tone = "gold", count = 16 }: { className?: string; tone?: "gold" | "white"; count?: number }) {
  const color = tone === "gold" ? "#E8C46E" : "#FFFFFF";
  return (
    <div className={`${base} absolute inset-0 overflow-hidden motion-reduce:hidden ${className}`} aria-hidden>
      {DUST.slice(0, count).map(([x, y, size, delay, dur], i) => (
        <svg
          key={i}
          viewBox="-10 -10 20 20"
          className="absolute animate-twinkle"
          style={{ left: `${x}%`, top: `${y}%`, width: size * 3, height: size * 3, animationDelay: `${delay}s`, animationDuration: `${dur}s` }}
        >
          <path d="M0 -9 C1 -3 3 -1 9 0 C3 1 1 3 0 9 C-1 3 -3 1 -9 0 C-3 -1 -1 -3 0 -9Z" fill={color} />
        </svg>
      ))}
    </div>
  );
}

// Falling petals: [left %, delay s, size px, duration s]
const PETALS: [number, number, number, number][] = [
  [6, 0, 12, 13],
  [22, 3.5, 15, 16],
  [41, 1.2, 11, 12],
  [58, 6, 14, 15],
  [76, 2.4, 12, 14],
  [91, 7.5, 16, 17],
];

/** Cream petals drifting down a section. Pure CSS transforms; hidden for reduced-motion guests. */
export function Petals({ className = "" }: { className?: string }) {
  return (
    <div className={`${base} absolute inset-0 overflow-hidden motion-reduce:hidden ${className}`} aria-hidden>
      {PETALS.map(([left, delay, size, dur], i) => (
        <span
          key={i}
          className="absolute -top-6 animate-fall rounded-[60%_40%_60%_40%] bg-gradient-to-br from-white to-[#DCEBEE] opacity-0 shadow-[0_0_6px_rgba(255,255,255,0.8)]"
          style={{ left: `${left}%`, width: size, height: size * 1.3, animationDelay: `${delay}s`, animationDuration: `${dur}s` }}
        />
      ))}
    </div>
  );
}

/** Two layers of slowly sliding waves, to sit on the bottom edge of a seaside section. */
export function Waves({ className = "", fill = "#FBF6EA" }: { className?: string; fill?: string }) {
  const path = "M0 40 C 90 10 180 10 270 40 S 450 70 540 40 S 720 10 810 40 S 990 70 1080 40 S 1260 10 1350 40 S 1530 70 1620 40 S 1800 10 1890 40 S 2070 70 2160 40 V80 H0Z";
  return (
    <div className={`${base} absolute inset-x-0 bottom-0 h-14 overflow-hidden motion-reduce:hidden ${className}`} aria-hidden>
      <svg viewBox="0 0 1080 80" preserveAspectRatio="none" className="absolute bottom-0 h-full w-[200%] animate-wave opacity-40" style={{ animationDuration: "26s" }}>
        <path d={path} fill={fill} />
      </svg>
      <svg viewBox="0 0 1080 80" preserveAspectRatio="none" className="absolute -bottom-1 h-[80%] w-[200%] animate-wave" style={{ animationDuration: "16s", animationDirection: "reverse" }}>
        <path d={path} fill={fill} />
      </svg>
    </div>
  );
}

/** Hearts that float up the footer. */
const HEARTS: [number, number, number, number][] = [
  [12, 0, 14, 9],
  [30, 3, 10, 11],
  [52, 1.5, 16, 10],
  [71, 4.5, 11, 12],
  [88, 2, 13, 9.5],
];
export function FloatingHearts({ className = "" }: { className?: string }) {
  return (
    <div className={`${base} absolute inset-0 overflow-hidden motion-reduce:hidden ${className}`} aria-hidden>
      {HEARTS.map(([left, delay, size, dur], i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute -bottom-6 animate-rise opacity-0"
          style={{ left: `${left}%`, width: size, height: size, animationDelay: `${delay}s`, animationDuration: `${dur}s` }}
        >
          <path d="M12 21C5 15.500 2 11.500 2 8a5 5 0 0 1 10-1.500A5 5 0 0 1 22 8c0 3.500-3 7.500-10 13Z" fill="#E8D0A2" />
        </svg>
      ))}
    </div>
  );
}

/** A brief burst of tiny gold and teal sparks wherever the guest taps or clicks. */
export function TapSparkles() {
  const reduce = useReducedMotion();
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const next = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const onDown = (e: PointerEvent) => {
      const id = next.current++;
      setBursts((b) => [...b.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 800);
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, [reduce]);

  if (reduce) return null;
  return (
    <div className={`${base} fixed inset-0 z-[70]`} aria-hidden>
      {bursts.map((b) =>
        Array.from({ length: 7 }, (_, i) => {
          const a = (i / 7) * Math.PI * 2;
          return (
            <motion.span
              key={`${b.id}-${i}`}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{ left: b.x, top: b.y, background: i % 2 ? "#D9B26B" : "#2A8A96" }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: Math.cos(a) * 26, y: Math.sin(a) * 26, opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          );
        }),
      )}
    </div>
  );
}

/** Card wrapper used by every content section: rounded, spaced, and sliding up as it enters the view. */
export function SectionCard({
  id,
  className = "",
  style,
  children,
}: {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      style={style}
      className={`card-section ${className}`}
      initial={{ opacity: 0, y: 56, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
