import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { photoUrl } from "../../lib/image";
import { FloralCorner, FloralSide, Lantern } from "../ui/Decor";
import { Petals, Sparkles } from "../ui/Effects";
import EventCard from "../ui/EventCard";
import { Monogram } from "../ui/Icons";

const ease = [0.22, 1, 0.36, 1] as const;

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease, delay },
});

/**
 * Wide hero for tablets and desktops (md and up): text centred in the left half, the couple on a sofa
 * by the ocean on the right, lanterns and flowers framing both edges. The scene drifts slowly on scroll.
 */
export default function HeroWide({ config, parts }: { config: InvitationConfig; parts: EventParts }) {
  const { couple, hero, venue } = config;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);

  return (
    <section
      ref={ref}
      aria-label="Invitation"
      className="relative hidden h-[min(100svh,880px)] min-h-[660px] w-full overflow-hidden bg-[linear-gradient(100deg,#FFFCF3_0%,#FDF3E1_38%,#F7E9D3_62%,#F2E1C4_100%)] md:block"
    >
      {/* Couple and ocean scene, fading into the paper on its left edge */}
      <motion.div
        className="absolute inset-y-0 right-0 w-[64%]"
        style={{
          y: sceneY,
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 30%)",
          maskImage: "linear-gradient(to right, transparent 0%, #000 30%)",
        }}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease, delay: 0.3 }}
      >
        <motion.img
          src={photoUrl(hero.photoWide, 1600)}
          alt={hero.photoWide.alt}
          width={924}
          height={999}
          decoding="async"
          {...({ fetchpriority: "high" } as Record<string, string>)}
          className="h-[112%] w-full object-cover object-[50%_60%]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease }}
        />
      </motion.div>

      {/* Sun glow, sparkles and petals */}
      <motion.div
        aria-hidden
        style={{ scale: glowScale }}
        className="absolute right-[18%] top-[6%] h-[380px] w-[380px] animate-glow rounded-full bg-[radial-gradient(circle,rgba(255,226,170,0.8),rgba(255,226,170,0)_68%)]"
      />
      <Sparkles count={22} />
      <Petals />

      {/* Florals and lanterns framing the edges */}
      <FloralSide className="top-[18%] w-[5.5%]" />
      <FloralCorner className="w-[15%]" />
      <FloralCorner corner="bl" className="w-[9%]" />
      <FloralCorner corner="tr" className="w-[13%]" />
      <Lantern className="left-[4.5%] top-[8%]" size={38} string={70} delay="0s" />
      <Lantern className="left-[10.5%] top-[2%]" size={30} string={40} delay="-1.8s" />
      <Lantern className="right-[7%] top-[5%]" size={36} string={90} delay="-1s" />
      <Lantern className="right-[3%] top-[18%]" size={30} string={50} delay="-2.6s" />

      {/* Text, centred in the left half */}
      <motion.div style={{ y: textY }} className="absolute inset-y-0 left-0 z-10 flex w-[48%] flex-col items-center justify-center px-8 pb-10 pt-[76px] text-center text-teal-deep">
        <motion.div {...enter(0.2)}>
          <Monogram text={couple.monogram} className="h-[72px] w-[72px]" />
        </motion.div>

        <motion.p {...enter(0.4)} className="mt-3 font-body text-[clamp(14px,1.25vw,18px)] font-bold uppercase tracking-[0.2em]">
          {hero.together}
        </motion.p>

        <h1 className="mt-1">
          <motion.span {...enter(0.6)} className="teal-text block animate-shimmer px-6 font-script text-[clamp(70px,6.8vw,108px)] leading-[0.95]">
            {couple.first}
          </motion.span>
          <motion.span {...enter(0.85)} className="flex items-center justify-center gap-3 font-body text-[clamp(15px,1.3vw,19px)] font-bold tracking-[0.25em]">
            <span className="h-px w-12 bg-gold" /> AND <span className="h-px w-12 bg-gold" />
          </motion.span>
          <motion.span {...enter(1.05)} className="teal-text block animate-shimmer px-6 font-script text-[clamp(70px,6.8vw,108px)] leading-[0.95]">
            {couple.second}
          </motion.span>
        </h1>

        <motion.p {...enter(1.25)} className="mt-3 max-w-[360px] font-body text-[clamp(14px,1.2vw,18px)] font-bold uppercase leading-snug tracking-[0.14em]">
          {hero.invite}
        </motion.p>

        <motion.div {...enter(1.45)} className="mt-6 w-full max-w-[460px]">
          <EventCard parts={parts} start={config.event.start} large />
        </motion.div>

        <motion.div {...enter(1.65)} className="mt-4">
          <p className="font-heading text-[clamp(18px,1.6vw,24px)] font-semibold uppercase tracking-wide">{venue.name}</p>
          <p className="mt-1 max-w-[380px] font-body text-[clamp(13px,1.1vw,16px)] font-bold uppercase leading-snug tracking-wider text-ink-soft">
            {venue.address.join(", ")}
          </p>
          <p className="mt-3 font-script text-[clamp(32px,2.8vw,42px)] leading-none text-teal">{hero.reception}</p>
        </motion.div>
      </motion.div>

      <a
        href="#about"
        aria-label="Scroll to the next section"
        className="absolute bottom-6 left-1/2 z-20 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border border-gold-soft bg-white/90 text-teal shadow-card"
      >
        <ChevronDown className="h-6 w-6 animate-bob" aria-hidden />
      </a>
    </section>
  );
}
