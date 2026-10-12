import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import type { InvitationConfig } from "../../types";
import { Monogram } from "../ui/Icons";

/**
 * Top navigation bar for tablets and desktops (md and up): monogram, anchor links with an underline
 * on the active one, and a "Save the Date" pill. Transparent over the hero, frosted once scrolled.
 */
export default function DesktopNav({ nav, monogram }: { nav: InvitationConfig["nav"]; monogram: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(nav[0]?.href ?? "#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Active link = last section whose top has passed the middle of the header band.
      let current = nav[0]?.href ?? "#home";
      for (const item of nav) {
        if (item.href === "#home") continue;
        const el = document.querySelector(item.href);
        if (el && el.getBoundingClientRect().top < 140) current = item.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [nav]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 hidden transition-all duration-500 md:block ${
        scrolled ? "bg-ivory/85 shadow-soft backdrop-blur-md" : "bg-gradient-to-b from-white/50 to-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-8">
        <a href="#home" aria-label="Back to top" className="shrink-0">
          <Monogram text={monogram} className="h-11 w-11" />
        </a>

        <ul className="flex items-center gap-1 font-body text-[17px] font-semibold text-teal-deep">
          {nav.map((item, i) => (
            <li key={item.href} className="flex items-center">
              {i > 0 && <span aria-hidden className="mx-3 h-3.5 w-px bg-gold-soft" />}
              <a href={item.href} className="relative px-1 py-1.5 transition-colors hover:text-gold-deep" aria-current={active === item.href ? "page" : undefined}>
                {item.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded bg-gold transition-transform duration-500 ${active === item.href ? "scale-x-100" : "scale-x-0"}`}
                />
              </a>
            </li>
          ))}
        </ul>

        <a href="#countdown" className="flex shrink-0 items-center gap-2 rounded-full border border-gold-soft bg-white/70 px-4 py-2 font-body text-[16px] font-semibold text-teal-deep transition-colors hover:bg-white">
          <Heart className="h-4 w-4 fill-gold text-gold" aria-hidden /> Save the Date
        </a>
      </nav>
    </header>
  );
}
