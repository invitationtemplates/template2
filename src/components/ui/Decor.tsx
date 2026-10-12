import { motion } from "motion/react";
import corner from "../../assets/floral-corner.png";
import side from "../../assets/floral-side.png";
import footerFloral from "../../assets/floral-footer.png";
import lantern from "../../assets/lantern.png";

/** Decorative images are hidden from assistive tech and never take pointer events. */
const base = "pointer-events-none select-none";

type Corner = "tl" | "tr" | "bl" | "br";
const CORNER: Record<Corner, { place: string; flip: string }> = {
  tl: { place: "left-0 top-0", flip: "" },
  tr: { place: "right-0 top-0", flip: "-scale-x-100" },
  bl: { place: "left-0 bottom-0", flip: "-scale-y-100" },
  br: { place: "right-0 bottom-0", flip: "rotate-180" },
};

/**
 * Flower cluster in a corner of a section.
 * Layers: outer div = position + mirroring, motion.div = entrance, img = endless gentle sway,
 * so the three transforms never overwrite each other.
 */
export function FloralCorner({ corner: c = "tl", className = "" }: { corner?: Corner; className?: string }) {
  const k = CORNER[c];
  return (
    <div className={`${base} absolute ${k.place} ${k.flip} ${className}`} aria-hidden>
      <motion.div
        className="origin-top-left"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={corner}
          alt=""
          width={260}
          height={260}
          decoding="async"
          className="h-auto w-full origin-top-left animate-sway"
          style={{ WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)", maskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)" }}
        />
      </motion.div>
    </div>
  );
}

/** Tall garland hugging a side edge. `flip` mirrors it onto the right edge. */
export function FloralSide({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <div className={`${base} absolute ${flip ? "right-0 -scale-x-100" : "left-0"} ${className}`} aria-hidden>
      <img
        src={side}
        alt=""
        width={150}
        height={520}
        loading="lazy"
        decoding="async"
        className="h-auto w-full"
        style={{ WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%)", maskImage: "linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%)" }}
      />
    </div>
  );
}

/** Flower cluster for the bottom corners of the deep-teal footer. */
export function FloralFooter({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <div className={`${base} absolute bottom-0 ${flip ? "right-0 -scale-x-100" : "left-0"} ${className}`} aria-hidden>
      <img src={footerFloral} alt="" width={260} height={320} loading="lazy" decoding="async" className="h-auto w-full" />
    </div>
  );
}

/** A hanging lantern that swings from its top, with a warm glow. `string` draws a longer thread above it. */
export function Lantern({ className = "", delay = "0s", size = 28, string = 0 }: { className?: string; delay?: string; size?: number; string?: number }) {
  return (
    <div className={`${base} absolute origin-top animate-swing ${className}`} style={{ width: size, animationDelay: delay }} aria-hidden>
      {string > 0 && <span className="relative mx-auto block w-px bg-gold/70" style={{ height: string }} />}
      <span className="absolute left-1/2 top-[70%] h-[70%] w-[260%] -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-[radial-gradient(circle,rgba(255,214,140,0.6),rgba(255,214,140,0)_68%)]" />
      <img src={lantern} alt="" width={120} height={360} decoding="async" className="relative h-auto w-full" />
    </div>
  );
}

/** Thin gold rule with a small centre ornament; both halves draw outward from the middle. */
export function Ornament({ className = "", light = false }: { className?: string; light?: boolean }) {
  const line = light ? "via-gold-soft" : "via-gold";
  const view = { once: true } as const;
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden>
      <motion.span
        className={`h-px w-16 origin-right bg-gradient-to-l from-gold-light ${line} to-transparent`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={view}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.svg
        viewBox="0 0 40 14"
        className="h-3.5 w-10 text-gold"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={view}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <path d="M20 2l4 5-4 5-4-5z" fill="currentColor" />
        <path d="M14 7C10 3 5 3 2 6M26 7c4-4 9-4 12-1" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </motion.svg>
      <motion.span
        className={`h-px w-16 origin-left bg-gradient-to-r from-gold-light ${line} to-transparent`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={view}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}

/** Script section heading in teal, words rising in, with the gold ornament beneath. */
export function SectionTitle({ children, id, light = false }: { children: string; id?: string; light?: boolean }) {
  const words = children.split(" ");
  return (
    <header className="relative z-10 text-center">
      <h2 id={id} className={`font-heading text-[34px] font-medium italic leading-tight ${light ? "text-white" : "text-teal-deep"}`} aria-label={children}>
        {words.map((w, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block"
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
          >
            {w}
            {" "}
          </motion.span>
        ))}
      </h2>
      <Ornament className="mt-1.5" light={light} />
    </header>
  );
}
