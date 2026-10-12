import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { InvitationConfig, Photo } from "../../types";
import { photoUrl } from "../../lib/image";
import { FloralCorner, SectionTitle } from "../ui/Decor";
import { SectionCard, Sparkles } from "../ui/Effects";
import Reveal from "../ui/Reveal";

const AUTOPLAY_MS = 4800;

/** Full-screen photo viewer: arrows, swipe, and keys (Esc, left, right). */
function Lightbox({ photos, index, onClose, onChange }: { photos: Photo[]; index: number | null; onClose: () => void; onChange: (i: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = photos.length;
  const go = useCallback((d: number) => index !== null && onChange((index + d + n) % n), [index, n, onChange]);

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, go, onClose]);

  const arrow = "absolute top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-teal-deep";

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={photos[index].alt}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-teal-night/92 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.img
            key={index}
            src={photoUrl(photos[index], 1400)}
            alt={photos[index].alt}
            className="max-h-[82vh] max-w-full rounded-xl object-contain shadow-2xl"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close gallery" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-teal-deep">
            <X className="h-5 w-5" />
          </button>
          {n > 1 && (
            <>
              <button type="button" aria-label="Previous photo" onClick={(e) => (e.stopPropagation(), go(-1))} className={`${arrow} left-3`}>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" aria-label="Next photo" onClick={(e) => (e.stopPropagation(), go(1))} className={`${arrow} right-3`}>
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const slide = {
  enter: (dir: number) => ({ x: dir * 70, opacity: 0, scale: 1.04 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir * -70, opacity: 0, scale: 0.98 }),
};

/** Small gold corner bracket used on the featured frame. */
const Corner = ({ className = "" }: { className?: string }) => (
  <span aria-hidden className={`pointer-events-none absolute h-6 w-6 border-gold ${className}`} />
);

/**
 * Gallery: a featured photo (swipe, arrows, autoplay with a progress line, counter, tap to enlarge)
 * on a stack of tilted cards, then a thumbnail strip that doubles as the selector.
 * The section hides itself when there are no photos.
 */
export default function Gallery({ gallery }: { gallery: InvitationConfig["gallery"] }) {
  const { photos } = gallery;
  const n = photos.length;
  const reduce = useReducedMotion();
  const [[index, dir], setSlide] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const strip = useRef<HTMLDivElement>(null);

  const go = useCallback((d: number) => setSlide(([i]) => [(i + d + n) % n, d]), [n]);
  const jump = (i: number) => setSlide(([cur]) => [i, i >= cur ? 1 : -1]);

  // Autoplay: advances every few seconds, pausing on hover/touch, while the lightbox is open, or for reduced motion.
  useEffect(() => {
    if (n < 2 || paused || open !== null || reduce) return;
    const id = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, n, paused, open, reduce, go]);

  // Keep the active thumbnail in view (scrolls the strip only, never the page).
  useEffect(() => {
    const el = strip.current?.children[index] as HTMLElement | undefined;
    if (!el || !strip.current) return;
    strip.current.scrollTo({ left: el.offsetLeft - strip.current.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [index]);

  if (n === 0) return null;

  const show = (i: number) => {
    opener.current = document.activeElement as HTMLElement | null;
    setOpen(i);
  };
  const close = () => {
    setOpen(null);
    opener.current?.focus();
  };
  const current = photos[index];
  const btn = "absolute top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-teal-deep shadow-soft transition-transform active:scale-90";

  return (
    <SectionCard id="gallery" className="bg-gradient-to-b from-ivory-warm via-[#FFFBF1] to-[#F7EEDB] px-4 pb-12 pt-12">
      <FloralCorner className="w-[20%]" />
      <FloralCorner corner="tr" className="w-[20%]" />
      <Sparkles count={14} />

      <SectionTitle>{gallery.heading}</SectionTitle>
      <p className="relative mt-1 text-center font-body text-[18px] font-semibold text-teal-deep">{gallery.subtitle}</p>

      {/* Featured photo */}
      <Reveal className="relative mx-auto mt-8 max-w-[360px]">
        {/* Stack of tilted cards behind the frame */}
        <span aria-hidden className="absolute inset-x-3 -bottom-2 top-3 -rotate-[4deg] rounded-[28px] bg-white shadow-soft" />
        <span aria-hidden className="absolute inset-x-3 -bottom-1 top-2 rotate-[3deg] rounded-[28px] bg-gold-soft/70 shadow-soft" />

        <div
          className="relative rounded-[28px] bg-gradient-to-br from-gold-light via-white to-gold p-[3px] shadow-card"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative rounded-[25px] bg-ivory p-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[19px] bg-ice">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.button
                  key={index}
                  type="button"
                  custom={dir}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50) go(1);
                    else if (info.offset.x > 50) go(-1);
                  }}
                  onClick={() => show(index)}
                  aria-label={`Open photo ${index + 1} of ${n}: ${current.alt}`}
                  className="absolute inset-0 block h-full w-full cursor-zoom-in"
                >
                  <img src={photoUrl(current, 900)} alt="" draggable={false} decoding="async" className="h-full w-full object-cover" />
                </motion.button>
              </AnimatePresence>

              {/* Caption + counter */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-teal-night/75 via-teal-night/30 to-transparent px-4 pb-4 pt-12">
                <p className="font-body text-[16px] font-semibold leading-snug text-white">{current.alt}</p>
              </div>
              <span className="absolute left-3 top-3 z-10 rounded-full bg-white/85 px-3 py-1 font-body text-[14px] font-bold tracking-wider text-teal-deep">
                {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
              <span className="pointer-events-none absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-teal-deep">
                <Maximize2 className="h-4 w-4" aria-hidden />
              </span>

              {n > 1 && (
                <>
                  <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className={`${btn} left-2`}>
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button type="button" aria-label="Next photo" onClick={() => go(1)} className={`${btn} right-2`}>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Autoplay progress */}
              {n > 1 && !reduce && (
                <span aria-hidden className="absolute inset-x-0 bottom-0 z-20 h-[3px] bg-white/25">
                  <motion.span
                    key={`${index}-${paused}`}
                    className="block h-full origin-left bg-gold-light"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused ? 0 : 1 }}
                    transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
                  />
                </span>
              )}
            </div>
          </div>

          <Corner className="-left-1.5 -top-1.5 rounded-tl-xl border-l-2 border-t-2" />
          <Corner className="-right-1.5 -top-1.5 rounded-tr-xl border-r-2 border-t-2" />
          <Corner className="-bottom-1.5 -left-1.5 rounded-bl-xl border-b-2 border-l-2" />
          <Corner className="-bottom-1.5 -right-1.5 rounded-br-xl border-b-2 border-r-2" />
        </div>
      </Reveal>

      {/* Thumbnails */}
      <Reveal delay={0.1} className="relative mx-auto mt-7 max-w-[380px]">
        <div ref={strip} className="flex snap-x gap-2.5 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {photos.map((p, i) => (
            <motion.button
              key={p.src}
              type="button"
              onClick={() => jump(i)}
              aria-label={`Show photo ${i + 1}: ${p.alt}`}
              aria-current={i === index}
              whileTap={{ scale: 0.92 }}
              className={`relative h-[68px] w-[68px] shrink-0 snap-center overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                i === index ? "-translate-y-1 border-gold shadow-card ring-2 ring-gold-light/60" : "border-white opacity-70 hover:opacity-100"
              }`}
            >
              <img src={photoUrl(p, 200)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </motion.button>
          ))}
        </div>
      </Reveal>

      <p className="relative mt-3 text-center font-body text-[15px] font-semibold text-ink-soft">Swipe, or tap a photo to view it larger</p>

      <Lightbox photos={photos} index={open} onClose={close} onChange={setOpen} />
    </SectionCard>
  );
}
