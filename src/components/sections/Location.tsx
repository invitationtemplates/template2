import { useState } from "react";
import { motion } from "motion/react";
import { Check, Compass, Copy, Map as MapIcon, MapPin, Navigation, Share2 } from "lucide-react";
import type { InvitationConfig } from "../../types";
import { photoUrl } from "../../lib/image";
import { FloralCorner, SectionTitle } from "../ui/Decor";
import { SectionCard, Sparkles, Waves } from "../ui/Effects";
import Reveal from "../ui/Reveal";

/**
 * Location: the venue photograph with a slow zoom, an address card floating over its lower edge with
 * Get Directions / Copy / Share actions, and a map card with a pulsing pin and an "Open in Google Maps" chip.
 */
export default function Location({ venue }: { venue: InvitationConfig["venue"] }) {
  const [copied, setCopied] = useState(false);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapsQuery)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue.mapsQuery)}`;
  const fullAddress = `${venue.name}, ${venue.address.join(", ")}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable: the address is still shown on the card */
    }
  };

  const share = async () => {
    const data = { title: venue.name, text: fullAddress, url: mapsUrl };
    try {
      if (navigator.share) await navigator.share(data);
      else await copy();
    } catch {
      /* the guest cancelled the share sheet */
    }
  };

  const action =
    "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-3 font-body text-[17px] font-bold transition-transform active:scale-95";

  return (
    <SectionCard id="location" className="bg-gradient-to-b from-[#FFFCF2] via-[#FBF4E4] to-[#E3F0F0] px-4 pb-20 pt-12">
      <FloralCorner className="w-[20%]" />
      <FloralCorner corner="tr" className="w-[18%]" />
      <Sparkles count={12} />

      <SectionTitle>Location</SectionTitle>
      <p className="relative mt-1 text-center font-body text-[18px] font-semibold text-teal-deep">Where the celebration happens</p>

      {/* Venue photo */}
      <Reveal className="relative mx-auto mt-8 max-w-[370px]">
        <div className="relative overflow-hidden rounded-[28px] border-4 border-white shadow-card">
          <motion.img
            src={photoUrl(venue.photo, 1000)}
            alt={venue.photo.alt}
            width={1125}
            height={246}
            loading="lazy"
            decoding="async"
            className="aspect-[21/10] w-full object-cover"
            initial={{ scale: 1.02 }}
            animate={{ scale: 1.14 }}
            transition={{ duration: 16, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          />
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-night/55 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 font-body text-[14px] font-bold uppercase tracking-[0.14em] text-teal-deep">
            <MapPin className="h-4 w-4 text-gold" aria-hidden /> Venue
          </span>
        </div>
      </Reveal>

      {/* Address card floating over the photo */}
      <Reveal delay={0.1} className="relative z-10 mx-auto -mt-8 max-w-[330px]">
        <div className="rounded-3xl border border-gold-soft bg-white/95 px-5 pb-4 pt-5 text-center shadow-card backdrop-blur">
          <motion.span
            className="mx-auto -mt-12 grid h-14 w-14 place-items-center rounded-full border-4 border-white bg-gradient-to-br from-teal to-teal-deep text-white shadow-card"
            initial={{ y: -40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 11, delay: 0.3 }}
          >
            <MapPin className="h-7 w-7" aria-hidden />
          </motion.span>

          <h3 className="mt-2 font-heading text-[26px] font-semibold leading-tight text-teal-deep">{venue.name}</h3>
          <address className="mt-1 font-body text-[18px] font-medium not-italic leading-snug text-ink-soft">
            {venue.address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>

          <div className="mt-4 flex gap-2.5">
            <motion.a whileTap={{ scale: 0.96 }} href={directionsUrl} target="_blank" rel="noopener noreferrer" className={`${action} bg-gradient-to-b from-teal to-teal-deep text-white shadow-soft`}>
              <Navigation className="h-5 w-5" aria-hidden /> Get Directions
            </motion.a>
          </div>
          <div className="mt-2.5 flex gap-2.5">
            <button type="button" onClick={copy} className={`${action} border border-teal/40 bg-white text-teal`} aria-live="polite">
              {copied ? <Check className="h-5 w-5" aria-hidden /> : <Copy className="h-5 w-5" aria-hidden />} {copied ? "Copied" : "Copy"}
            </button>
            <button type="button" onClick={share} className={`${action} border border-teal/40 bg-white text-teal`}>
              <Share2 className="h-5 w-5" aria-hidden /> Share
            </button>
          </div>
        </div>
      </Reveal>

      {/* Map card */}
      <Reveal delay={0.1} className="relative mx-auto mt-7 max-w-[370px]">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the venue map in Google Maps"
          className="group relative block overflow-hidden rounded-[28px] border-4 border-white shadow-card"
        >
          <img src={photoUrl(venue.mapPhoto, 800)} alt={venue.mapPhoto.alt} width={480} height={312} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />

          {/* Radar ripple over the pin shown in the map picture */}
          <span aria-hidden className="pointer-events-none absolute left-[43%] top-[36%] -ml-5 -mt-5 h-10 w-10 animate-ripple rounded-full border-2 border-red-500/70" />
          <span aria-hidden className="pointer-events-none absolute left-[43%] top-[36%] -ml-5 -mt-5 h-10 w-10 animate-ripple rounded-full border-2 border-red-500/70 [animation-delay:1.2s]" />

          <Compass className="absolute right-3 top-3 h-8 w-8 animate-[spin_30s_linear_infinite] rounded-full bg-white/85 p-1.5 text-teal motion-reduce:animate-none" aria-hidden />
          <span className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-2xl bg-white/92 py-2.5 font-body text-[17px] font-bold text-teal-deep shadow-soft backdrop-blur">
            <MapIcon className="h-5 w-5 text-gold" aria-hidden /> Open in Google Maps
          </span>
        </a>
      </Reveal>

      <Waves fill="#E3F0F0" />
    </SectionCard>
  );
}
