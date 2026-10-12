import { useEffect, useState, type KeyboardEvent } from "react";
import { motion, useAnimate, useReducedMotion } from "motion/react";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { photoUrl } from "../../lib/image";
import { FloralCorner, Lantern } from "../ui/Decor";
import { Petals, Sparkles } from "../ui/Effects";

const ease = [0.22, 1, 0.36, 1] as const;

// Petals bursting from the seal when tapped: [angle deg, distance px, size px]
const BURST: [number, number, number][] = Array.from({ length: 16 }, (_, i) => [i * 22.5 + (i % 2) * 8, 110 + ((i * 37) % 110), 10 + ((i * 5) % 9)]);

/**
 * Full-screen "Tap to open" cover. Tap (or Enter/Space) -> petals burst from the seal, the content
 * fades, and the cover shrinks into the seal to reveal the invitation mounted underneath.
 * `onOpenStart` fires synchronously inside the tap so music can start under the tap's permission.
 */
export default function OpeningCover({
  config,
  parts,
  guest,
  onOpenStart,
  onOpened,
}: {
  config: InvitationConfig;
  parts: EventParts;
  guest: string;
  onOpenStart: () => void;
  onOpened: () => void;
}) {
  const { couple, cover, hero } = config;
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [tapped, setTapped] = useState(false);
  const reduce = useReducedMotion();

  // Lock page scroll behind the cover and put keyboard focus on it.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    scope.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [scope]);

  const open = async () => {
    if (tapped) return;
    setTapped(true);
    onOpenStart();

    if (reduce) {
      await animate(scope.current, { opacity: 0 }, { duration: 0.35 });
      onOpened();
      return;
    }
    animate("[data-seal]", { scale: [1, 0.88, 1.12] }, { duration: 0.5 });
    animate("[data-content]", { opacity: 0, y: -12 }, { duration: 0.5, delay: 0.3 });
    await animate(scope.current, { clipPath: "circle(0% at 50% 78%)" }, { duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.45 });
    onOpened();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <div
      ref={scope}
      role="button"
      tabIndex={0}
      aria-label={`${cover.tap}: open the invitation of ${couple.first} and ${couple.second}`}
      onClick={open}
      onKeyDown={onKey}
      style={{ clipPath: "circle(150% at 50% 78%)" }}
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-[linear-gradient(170deg,#FFF8E6_0%,#FCEBD2_35%,#DCEBEE_75%,#C5E0E5_100%)] outline-none"
    >
      <div className="relative mx-auto h-full w-full max-w-[430px]">
        <Sparkles count={16} />
        <Petals />
        <FloralCorner className="w-[30%]" />
        <FloralCorner corner="tr" className="w-[24%]" />
        <Lantern className="left-[6%] top-0" size={28} string={50} delay="0s" />
        <Lantern className="right-[8%] top-0" size={25} string={34} delay="-1.6s" />

        <div data-content className="relative flex h-full flex-col items-center px-6 pt-[17svh] text-center">
          {guest && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.2 }} className="mb-1 font-heading text-[17px] italic text-ink-soft">
              {cover.dear} {guest}
            </motion.p>
          )}
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.3 }} className="font-body text-[15px] font-bold uppercase tracking-[0.3em] text-gold-deep">
            {cover.invited}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.5 }}
            className="mt-4 overflow-hidden rounded-full border-[3px] border-gold-soft bg-white shadow-card"
            style={{ width: "min(52vw, 25svh)", aspectRatio: "1" }}
          >
            <img src={photoUrl(hero.photo, 600)} alt="" width={525} height={738} className="h-full w-full object-cover object-[60%_30%]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease, delay: 0.8 }}
            className="teal-text mt-3 animate-shimmer font-script text-[clamp(52px,16vw,68px)] leading-[1.05]"
          >
            {couple.first} &amp; {couple.second}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }} className="mt-1 font-body text-[17px] font-bold uppercase tracking-[0.12em] text-teal-deep">
            {parts.weekday}, {parts.monthLong} {parts.day}, {parts.year}
          </motion.p>
        </div>

        {/* Seal + prompt */}
        <div className="absolute left-1/2 top-[78%] -translate-x-1/2 -translate-y-1/2">
          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 140, damping: 14, delay: 1.2 }}>
            <div data-seal className="relative grid h-[88px] w-[88px] place-items-center">
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full border-2 border-teal/60 [animation-duration:2.2s] motion-reduce:hidden" />
              <span aria-hidden className="absolute -inset-2 animate-glow rounded-full bg-[radial-gradient(circle,rgba(20,96,107,0.35),rgba(20,96,107,0)_70%)]" />
              <span className="relative grid h-full w-full place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#2A8A96,#14606B_55%,#08373F)] shadow-[0_8px_20px_-6px_rgba(8,55,63,0.7),inset_0_0_0_3px_rgba(232,208,162,0.55)]">
                <span className="font-heading text-[26px] italic text-ivory">{couple.monogram}</span>
              </span>
            </div>
          </motion.div>

          {tapped &&
            !reduce &&
            BURST.map(([angle, dist, size], i) => (
              <motion.span
                key={i}
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 rounded-[60%_40%_60%_40%] bg-gradient-to-br from-white to-[#CFE5E8]"
                style={{ width: size, height: size * 1.25, marginLeft: -size / 2, marginTop: -size / 2 }}
                initial={{ x: 0, y: 0, opacity: 0.95, rotate: 0, scale: 0.6 }}
                animate={{ x: Math.cos((angle * Math.PI) / 180) * dist, y: Math.sin((angle * Math.PI) / 180) * dist - 30, opacity: 0, rotate: angle + 140, scale: 1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
            ))}
        </div>

        <motion.p
          data-content
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute inset-x-0 top-[calc(78%+66px)] animate-pulse text-center font-body text-[16px] font-bold uppercase tracking-[0.3em] text-teal-deep"
        >
          {cover.tap}
        </motion.p>
      </div>
    </div>
  );
}
