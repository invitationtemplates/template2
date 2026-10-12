import { AnimatePresence, motion } from "motion/react";
import { useCountdown } from "../../hooks/useCountdown";
import oceanUrl from "../../assets/ocean.jpg";
import { FloralCorner } from "../ui/Decor";
import Reveal from "../ui/Reveal";
import { SectionCard, Sparkles, Waves } from "../ui/Effects";

/** Scalloped-corner tile (gold outer rim + ivory inner) holding one number, which slides when it changes. */
function Tile({ value, label, delay }: { value: number; label: string; delay: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="scallop animate-float bg-gradient-to-b from-gold-light to-gold p-[2px]" style={{ animationDelay: delay }}>
      <div className="scallop scallop-inner bg-gradient-to-b from-[#FFFDF6] to-ivory-warm px-1 pb-2.5 pt-3 text-center">
        <div className="relative h-[46px] overflow-hidden font-heading text-[38px] leading-[46px] text-teal-deep" aria-hidden>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={text}
              className="block"
              initial={{ y: "70%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-70%", opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {text}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="mt-0.5 font-body text-[15px] font-semibold text-ink-soft">{label}</div>
      </div>
    </div>
  );
}

/** Countdown over an ocean backdrop (parallax-free for performance), with flowers on both edges. */
export default function Countdown({ heading, start }: { heading: string; start: string }) {
  const c = useCountdown(start);
  const summary = c.done ? "The wedding day has arrived" : `${c.days} days, ${c.hours} hours, ${c.minutes} minutes and ${c.seconds} seconds to go`;

  return (
    <SectionCard id="countdown" className="px-4 pb-16 pt-12 text-center" style={{ backgroundImage: `url(${oceanUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-teal-night/45 via-teal-night/10 to-teal-night/25" />
      <Sparkles tone="white" count={14} />
      <Waves fill="#FBF6EA" />
      <FloralCorner corner="bl" className="w-[22%]" />
      <FloralCorner corner="br" className="w-[22%]" />

      <h2 className="relative font-heading text-[26px] font-medium text-white drop-shadow-[0_2px_4px_rgba(8,55,63,0.7)]">{heading}</h2>

      <p className="sr-only" role="timer">
        {summary}
      </p>
      <Reveal className="relative mx-auto mt-6 max-w-[370px]">
        {c.done ? (
          <p className="rounded-3xl bg-white/85 py-6 font-heading text-[24px] italic text-teal-deep shadow-card">The celebration has begun!</p>
        ) : (
          <div className="grid grid-cols-4 gap-2.5">
            <Tile value={c.days} label="Days" delay="0s" />
            <Tile value={c.hours} label="Hours" delay="-1.1s" />
            <Tile value={c.minutes} label="Minutes" delay="-2.2s" />
            <Tile value={c.seconds} label="Seconds" delay="-3.3s" />
          </div>
        )}
      </Reveal>
    </SectionCard>
  );
}
