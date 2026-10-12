import { motion } from "motion/react";
import { CalendarDays, Clock, Heart } from "lucide-react";
import { useCountdown } from "../../hooks/useCountdown";
import type { EventParts } from "../../lib/dates";

/**
 * The date and time, made impossible to miss: a frosted ivory card with the weekday, a large date,
 * and a bold time with a clock icon, plus a live "days to go" badge. Used by both hero layouts.
 * `large` scales the type up for the wide desktop hero.
 */
export default function EventCard({ parts, start, large = false, className = "" }: { parts: EventParts; start: string; large?: boolean; className?: string }) {
  const c = useCountdown(start);
  const togo = c.done ? "The celebration has begun" : c.days === 0 ? "It is today" : `${c.days} ${c.days === 1 ? "day" : "days"} to go`;

  return (
    <div className={`relative rounded-[26px] border border-gold-soft bg-white/90 shadow-card backdrop-blur ${large ? "px-7 py-5" : "px-3 py-4"} ${className}`}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center text-center text-teal-deep">
        {/* Weekday */}
        <div className="px-1">
          <CalendarDays className={`mx-auto text-gold ${large ? "h-7 w-7" : "h-6 w-6"}`} strokeWidth={1.6} aria-hidden />
          <p className={`mt-1 font-body font-bold uppercase tracking-[0.12em] ${large ? "text-[17px]" : "text-[14px]"}`}>{parts.weekday}</p>
        </div>

        {/* Date */}
        <div className="border-x border-gold px-4 leading-none">
          <span className={`block font-body font-bold uppercase tracking-[0.2em] text-gold-deep ${large ? "text-[17px]" : "text-[14px]"}`}>{parts.monthLong}</span>
          <span className={`block font-heading font-medium ${large ? "text-[68px] leading-[1.02]" : "text-[56px] leading-[1.05]"}`}>{parts.day}</span>
          <span className={`block font-body font-bold ${large ? "text-[17px]" : "text-[14px]"}`}>{parts.year}</span>
        </div>

        {/* Time */}
        <div className="px-1">
          <Clock className={`mx-auto text-gold ${large ? "h-7 w-7" : "h-6 w-6"}`} strokeWidth={1.6} aria-hidden />
          <p className={`mt-1 font-heading font-semibold leading-none ${large ? "text-[30px]" : "text-[23px]"}`}>{parts.startTimeShort}</p>
          <p className={`mt-1 font-body font-bold uppercase tracking-[0.14em] text-ink-soft ${large ? "text-[14px]" : "text-[12px]"}`}>Onwards</p>
        </div>
      </div>

      <motion.p
        className={`mx-auto mt-3.5 flex w-fit items-center gap-2 rounded-full bg-teal px-4 py-1.5 font-body font-bold tracking-wide text-white ${large ? "text-[16px]" : "text-[14.5px]"}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 1.8 }}
      >
        <Heart className="h-4 w-4 animate-pulse fill-gold-light text-gold-light" aria-hidden /> {togo}
      </motion.p>
    </div>
  );
}
