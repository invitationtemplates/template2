import { motion } from "motion/react";
import { CalendarDays, CalendarPlus, Clock, MapPin, Navigation, type LucideIcon } from "lucide-react";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { downloadIcs, googleCalendarUrl, type CalendarEvent } from "../../lib/calendar";
import { FloralCorner, SectionTitle } from "../ui/Decor";
import { Sparkles, SectionCard, Waves } from "../ui/Effects";
import Reveal from "../ui/Reveal";

/** One detail card: gold-rimmed, with a tilted teal icon medallion that pops in, and an optional action row. */
function DetailCard({
  icon: Icon,
  label,
  value,
  lines = [],
  index,
  children,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  lines?: string[];
  index: number;
  children?: React.ReactNode;
}) {
  return (
    <Reveal from={index % 2 ? "right" : "left"} delay={0.05}>
      <motion.article
        whileHover={{ y: -4 }}
        className="rounded-[26px] bg-gradient-to-br from-gold-light via-white to-gold p-[1.5px] shadow-card"
      >
        <div className="flex items-start gap-4 rounded-[25px] bg-gradient-to-br from-white to-[#F2F8F8] px-4 py-5">
          <motion.span
            className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-teal to-teal-deep text-white shadow-soft"
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: -4 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 190, damping: 13, delay: 0.25 }}
          >
            <Icon className="h-8 w-8" strokeWidth={1.6} aria-hidden />
          </motion.span>

          <div className="min-w-0 flex-1">
            <p className="font-body text-[14px] font-bold uppercase tracking-[0.22em] text-gold-deep">{label}</p>
            <h3 className="mt-0.5 font-heading text-[23px] font-semibold leading-tight text-teal-deep">{value}</h3>
            {lines.map((l) => (
              <p key={l} className="font-body text-[17px] font-medium leading-snug text-ink-soft">
                {l}
              </p>
            ))}
            {children && <div className="mt-3 flex flex-wrap gap-2">{children}</div>}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-teal/40 bg-white px-3.5 py-1.5 font-body text-[15px] font-bold text-teal transition-colors hover:bg-teal hover:text-white";

/** Date, time and venue as three tappable cards on an ice-blue sea-glass background. */
export default function EventDetails({
  venue,
  parts,
  event,
  calendar,
}: {
  venue: InvitationConfig["venue"];
  parts: EventParts;
  event: InvitationConfig["event"];
  calendar: { title: string; description: string };
}) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapsQuery)}`;
  const calEvent = (): CalendarEvent => ({
    title: calendar.title,
    description: calendar.description,
    location: `${venue.name}, ${venue.address.join(", ")}`,
    start: new Date(event.start),
    end: new Date(event.end),
    url: window.location.href,
  });

  return (
    <SectionCard id="event-details" className="bg-gradient-to-b from-[#EAF4F4] via-ice to-ice-deep px-4 pb-16 pt-12">
      <FloralCorner corner="tr" className="w-[20%]" />
      <Sparkles tone="white" count={14} />
      <SectionTitle>Event Details</SectionTitle>
      <p className="relative mt-1 text-center font-body text-[17px] font-semibold text-ink-soft">Everything you need to join us</p>

      <div className="relative mx-auto mt-7 max-w-[370px] space-y-4">
        <DetailCard icon={CalendarDays} label="Date" value={`${parts.weekday}, ${parts.monthLong} ${parts.day}`} lines={[parts.year]} index={0}>
          <a href={googleCalendarUrl(calEvent(), event.timezone)} target="_blank" rel="noopener noreferrer" className={pill}>
            <CalendarPlus className="h-4 w-4" aria-hidden /> Google Calendar
          </a>
          <button type="button" onClick={() => downloadIcs(calEvent())} className={pill}>
            <CalendarPlus className="h-4 w-4" aria-hidden /> Apple / Outlook
          </button>
        </DetailCard>

        <DetailCard icon={Clock} label="Time" value={`${parts.startTimeShort} Onwards`} lines={[`Celebrations until ${parts.endTime.replace(/^0/, "")}`]} index={1} />

        <DetailCard icon={MapPin} label="Venue" value={venue.name} lines={venue.address} index={2}>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={pill}>
            <Navigation className="h-4 w-4" aria-hidden /> Get Directions
          </a>
        </DetailCard>
      </div>

      <Waves fill="#EAF4F4" />
    </SectionCard>
  );
}
