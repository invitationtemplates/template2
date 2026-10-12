import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { photoUrl } from "../../lib/image";
import { FloralCorner, Lantern } from "../ui/Decor";
import { Petals, Sparkles } from "../ui/Effects";
import EventCard from "../ui/EventCard";
import { Monogram } from "../ui/Icons";

const ease = [0.22, 1, 0.36, 1] as const;

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

/**
 * Phone hero: monogram and names centred on a sunrise sky, the couple's ocean scene fading in beneath
 * them, and a bold date-and-time card overlapping the scene so the time is always clearly readable.
 */
export default function Hero({ config, parts }: { config: InvitationConfig; parts: EventParts }) {
  const { couple, hero, venue, event } = config;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden rounded-b-[40px] bg-[linear-gradient(180deg,#D5E6EF_0%,#EEF0EA_26%,#FBEBD5_58%,#F6EEDB_100%)] pb-14 shadow-card md:hidden"
    >
      <motion.div
        aria-hidden
        style={{ scale: glowScale }}
        className="absolute left-1/2 top-[150px] h-80 w-80 -translate-x-1/2 animate-glow rounded-full bg-[radial-gradient(circle,rgba(255,224,170,0.9),rgba(255,224,170,0)_68%)]"
      />
      <Sparkles count={18} />
      <Petals />

      <FloralCorner className="w-[26%]" />
      <FloralCorner corner="tr" className="w-[22%]" />
      <Lantern className="left-[3%] top-[10%]" size={24} string={30} delay="0s" />
      <Lantern className="right-[4%] top-[12%]" size={22} string={22} delay="-1.6s" />

      {/* Names */}
      <div className="relative z-10 px-6 pt-5 text-center text-teal-deep">
        <motion.div {...enter(0.1)} className="mx-auto w-fit">
          <Monogram text={couple.monogram} className="h-[72px] w-[72px]" />
        </motion.div>

        <motion.p {...enter(0.3)} className="mt-2 font-body text-[14px] font-bold uppercase tracking-[0.16em]">
          {hero.together}
        </motion.p>

        <h1 className="mt-1">
          <motion.span {...enter(0.5)} className="teal-text block animate-shimmer px-4 font-script text-[clamp(66px,19vw,82px)] leading-[0.95]">
            {couple.first}
          </motion.span>
          <motion.span {...enter(0.7)} className="flex items-center justify-center gap-3 font-body text-[15px] font-bold tracking-[0.25em]">
            <span className="h-px w-10 bg-gold" /> AND <span className="h-px w-10 bg-gold" />
          </motion.span>
          <motion.span {...enter(0.9)} className="teal-text block animate-shimmer px-4 font-script text-[clamp(66px,19vw,82px)] leading-[0.95]">
            {couple.second}
          </motion.span>
        </h1>

        <motion.p {...enter(1.1)} className="mx-auto mt-2 max-w-[300px] font-body text-[14px] font-bold uppercase leading-snug tracking-[0.12em]">
          {hero.invite}
        </motion.p>
      </div>

      {/* Couple and ocean scene, fading in from the sky */}
      <motion.div
        className="relative -mt-3"
        style={{
          y: sceneY,
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 24%, #000 82%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, #000 24%, #000 82%, transparent 100%)",
        }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease, delay: 0.5 }}
      >
        <img
          src={photoUrl(hero.photoWide, 900)}
          alt={hero.photoWide.alt}
          width={924}
          height={999}
          decoding="async"
          {...({ fetchpriority: "high" } as Record<string, string>)}
          className="aspect-[924/800] w-full object-cover object-[50%_62%]"
        />
      </motion.div>

      {/* Date and time card, overlapping the scene */}
      <motion.div {...enter(1.4)} className="relative z-10 -mt-16 px-4">
        <EventCard parts={parts} start={event.start} className="mx-auto max-w-[360px]" />

        <div className="mt-5 text-center text-teal-deep">
          <p className="font-heading text-[19px] font-semibold uppercase tracking-wide">{venue.name}</p>
          <p className="mx-auto mt-1 max-w-[300px] font-body text-[14px] font-bold uppercase leading-snug tracking-wider text-ink-soft">
            {venue.address.join(", ")}
          </p>
          <p className="mt-2 font-script text-[34px] leading-none text-teal">{hero.reception}</p>
        </div>
      </motion.div>

      <a
        href="#about"
        aria-label="Scroll to the next section"
        className="absolute bottom-3 left-1/2 z-20 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-gold-soft bg-white/90 text-teal shadow-card"
      >
        <ChevronDown className="h-5 w-5 animate-bob" aria-hidden />
      </a>
    </section>
  );
}
