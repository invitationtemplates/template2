import { motion } from "motion/react";
import { Quote } from "lucide-react";
import type { InvitationConfig } from "../../types";
import { photoUrl } from "../../lib/image";
import { FloralCorner, SectionTitle } from "../ui/Decor";
import { Sparkles, SectionCard } from "../ui/Effects";
import { RingsIcon } from "../ui/Icons";
import Reveal from "../ui/Reveal";

/**
 * About Us: a round photograph inside a slowly turning gold ring, a large script lead line taken from
 * the first sentence of the text, the paragraphs, and the quote on a teal card.
 */
export default function About({ about }: { about: InvitationConfig["about"] }) {
  // First sentence of the first paragraph becomes the script lead line; the rest stays as body text.
  const [first = "", ...others] = about.paragraphs;
  const match = first.match(/^(.+?[.!?])\s+([\s\S]*)$/);
  const lead = match ? match[1] : "";
  const body = [match ? match[2] : first, ...others];

  return (
    <SectionCard id="about" className="bg-gradient-to-b from-[#FFFCF2] via-[#FBF4E4] to-[#F6EAD2] px-5 pb-12 pt-12">
      <FloralCorner className="w-[24%]" />
      <FloralCorner corner="tr" className="w-[20%]" />
      <Sparkles count={12} />

      <SectionTitle>{about.heading}</SectionTitle>

      {/* Photo in a turning ring */}
      <Reveal className="relative mx-auto mt-9 h-[236px] w-[236px]">
        <span aria-hidden className="absolute -inset-5 animate-[spin_46s_linear_infinite] rounded-full border-2 border-dashed border-gold/70 motion-reduce:animate-none" />
        <span aria-hidden className="absolute -inset-2 rounded-full border border-gold-soft" />
        <span aria-hidden className="absolute -inset-10 animate-glow rounded-full bg-[radial-gradient(circle,rgba(217,178,107,0.35),rgba(217,178,107,0)_68%)]" />

        <div className="relative h-full w-full overflow-hidden rounded-full border-[6px] border-white shadow-card">
          <motion.img
            src={photoUrl(about.photo, 700)}
            alt={about.photo.alt}
            width={426}
            height={300}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[45%_50%]"
            initial={{ scale: 1.25 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          />
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>

        <motion.span
          className="absolute -bottom-1 -right-3 grid h-[68px] w-[68px] place-items-center rounded-full border-[3px] border-white bg-gradient-to-br from-teal to-teal-deep text-gold-light shadow-card"
          initial={{ scale: 0, rotate: -60 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.9 }}
        >
          <RingsIcon className="h-9 w-9 animate-float" />
        </motion.span>
      </Reveal>

      {/* Lead line + text */}
      <div className="relative mx-auto mt-9 max-w-[340px] text-center">
        {lead && (
          <Reveal>
            <p className="teal-text animate-shimmer px-1 font-script text-[clamp(36px,10.4vw,44px)] leading-[1.15]">{lead}</p>
          </Reveal>
        )}
        {body.map((p, i) => (
          <Reveal key={p} delay={0.1 + i * 0.1}>
            <p className={`mt-3 font-body text-[19px] font-medium leading-[1.6] text-ink ${i > 0 ? "text-[18px] text-ink-soft" : ""}`}>{p}</p>
          </Reveal>
        ))}
      </div>

      {/* Quote card */}
      <Reveal delay={0.15} className="relative mx-auto mt-9 max-w-[340px]">
        <figure className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal via-teal-deep to-teal-night px-7 py-7 text-center text-ivory shadow-card">
          <Quote className="absolute -left-1 -top-1 h-16 w-16 rotate-180 text-gold-light/25" aria-hidden />
          <Quote className="absolute -bottom-2 -right-1 h-16 w-16 text-gold-light/25" aria-hidden />
          <span aria-hidden className="absolute inset-x-6 top-3 h-px bg-gradient-to-r from-transparent via-gold-soft/70 to-transparent" />
          <blockquote className="relative font-heading text-[21px] font-medium italic leading-snug">{about.quote.replace(/[“”"]/g, "")}</blockquote>
          <span aria-hidden className="absolute inset-x-6 bottom-3 h-px bg-gradient-to-r from-transparent via-gold-soft/70 to-transparent" />
        </figure>
      </Reveal>
    </SectionCard>
  );
}
