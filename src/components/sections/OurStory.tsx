import type { InvitationConfig, StoryItem } from "../../types";
import { HeartsIcon, InfinityIcon, RingsIcon } from "../ui/Icons";
import { FloralSide, SectionTitle } from "../ui/Decor";
import Reveal from "../ui/Reveal";
import { SectionCard } from "../ui/Effects";

const icons: Record<StoryItem["icon"], JSX.Element> = {
  hearts: <HeartsIcon className="h-12 w-12" />,
  rings: <RingsIcon className="h-12 w-12" />,
  infinity: <InfinityIcon className="h-12 w-12" />,
};

/** Three short statements with gold line icons, separated by fine vertical rules. */
export default function OurStory({ story }: { story: InvitationConfig["story"] }) {
  return (
    <SectionCard id="our-story" className="bg-gradient-to-b from-[#FFFBF1] to-ivory-warm px-4 pb-12 pt-10">
      <FloralSide className="top-4 w-[13%]" />
      <FloralSide flip className="top-4 w-[13%]" />
      <SectionTitle>{story.heading}</SectionTitle>

      <ul className="relative mx-auto mt-7 grid max-w-[360px] grid-cols-3">
        {story.items.map((item, i) => (
          <li key={item.icon} className={`px-2 text-center ${i > 0 ? "border-l border-gold-soft" : ""}`}>
            <Reveal delay={0.15 * i}>
              <span className="relative mx-auto grid h-14 w-14 place-items-center text-gold">
                <span aria-hidden className="absolute inset-0 animate-ripple rounded-full border border-gold/60" style={{ animationDelay: `${i * 0.8}s` }} />
                <span className="animate-float" style={{ animationDelay: `${i * -1.4}s` }}>
                  {icons[item.icon]}
                </span>
              </span>
              <p className="mt-2 font-body text-[17px] font-semibold leading-snug text-teal-deep">
                {item.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
