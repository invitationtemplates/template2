import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Share2, X } from "lucide-react";
import type { InvitationConfig } from "../../types";

/**
 * Hamburger menu pinned to the top-right of the page column (as in the reference).
 * Opens a small panel of anchor links plus a share action; Escape closes it.
 */
export default function MenuButton({ nav, title }: { nav: InvitationConfig["nav"]; title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const share = async () => {
    const data = { title, text: title, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* the guest cancelled the share sheet */
    }
  };

  return (
    <div className="sticky top-0 z-50 h-0 md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-white/85 text-teal shadow-card backdrop-blur"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Main"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className="absolute right-3 top-[60px] w-56 overflow-hidden rounded-2xl border border-gold-soft bg-ivory shadow-card"
          >
            <ul className="py-1.5 font-body text-[18px] font-semibold text-teal-deep">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => setOpen(false)} className="block px-5 py-2.5 hover:bg-ice">
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="border-t border-gold-soft/60">
                <button type="button" onClick={share} className="flex w-full items-center gap-2 px-5 py-2.5 text-left text-gold-deep hover:bg-ice">
                  <Share2 className="h-4 w-4" /> {copied ? "Link copied" : "Share invitation"}
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
