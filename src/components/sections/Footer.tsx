import { motion } from "motion/react";
import { Heart } from "lucide-react";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { FloralFooter } from "../ui/Decor";
import { FloatingHearts, Sparkles } from "../ui/Effects";
import { FacebookIcon, InstagramIcon, Monogram, WhatsAppIcon, YouTubeIcon } from "../ui/Icons";
import Reveal from "../ui/Reveal";

/** Deep-teal footer: monogram, quick links, social icons, names, date and venue line. */
export default function Footer({ config, parts }: { config: InvitationConfig; parts: EventParts }) {
  const { couple, footer, nav, rsvp, venue } = config;
  const social = [
    { href: footer.instagram, label: "Instagram", icon: <InstagramIcon className="h-5 w-5" /> },
    { href: footer.facebook, label: "Facebook", icon: <FacebookIcon className="h-5 w-5" /> },
    { href: footer.youtube, label: "YouTube", icon: <YouTubeIcon className="h-5 w-5" /> },
    { href: `https://wa.me/${rsvp.whatsappNumber}`, label: "WhatsApp", icon: <WhatsAppIcon className="h-5 w-5" /> },
  ];

  return (
    <footer className="relative mt-8 overflow-hidden rounded-t-[40px] bg-[radial-gradient(ellipse_at_50%_0%,#12626C_0%,#0C4952_55%,#08373F_100%)] px-5 pb-16 pt-10 text-center text-ivory">
      <Sparkles tone="white" count={12} />
      <FloatingHearts />
      <FloralFooter className="w-[21%]" />
      <FloralFooter flip className="w-[21%]" />

      <div className="relative z-10">
        <Reveal>
          <Monogram text={couple.monogram} dark className="mx-auto h-[72px] w-[72px]" />
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-5 flex flex-wrap items-center justify-center font-body text-[16px] font-semibold">
            {nav.map((item, i) => (
              <li key={item.href} className="flex items-center">
                {i > 0 && <span aria-hidden className="mx-3 h-3.5 w-px bg-gold-soft/70" />}
                <a href={item.href} className="py-1 transition-colors hover:text-gold-light">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="mt-5 flex items-center justify-center gap-3">
          {social.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              {s.icon}
            </motion.a>
          ))}
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-6 h-px w-4/5 max-w-[300px] bg-gradient-to-r from-transparent via-gold-soft to-transparent" aria-hidden />
          <p className="gold-shimmer mt-4 font-script text-[48px] leading-tight">
            {couple.first} &amp; {couple.second}
          </p>
          <p className="mx-auto mt-3 max-w-[300px] font-body text-[14px] font-semibold uppercase leading-snug tracking-[0.12em] text-ivory/90">
            {parts.weekday}, {parts.monthLong} {parts.day}, {parts.year}
            <br />
            {venue.name}, {venue.address[venue.address.length - 1].split(",")[0]}
          </p>
          <p className="mt-4 flex items-center justify-center gap-1.5 font-body text-[16px] font-medium text-ivory/90">
            Made with <Heart className="h-4 w-4 fill-[#E4575F] text-[#E4575F]" aria-hidden /> {footer.made}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
