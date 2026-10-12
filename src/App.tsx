import { useEffect, useMemo, useState } from "react";
import { MotionConfig } from "motion/react";
import { invitation } from "./data/invitation";
import { eventParts } from "./lib/dates";
import { readGuest } from "./lib/guest";
import { photoUrl } from "./lib/image";
import MenuButton from "./components/sections/MenuButton";
import OpeningCover from "./components/sections/OpeningCover";
import Hero from "./components/sections/Hero";
import HeroWide from "./components/sections/HeroWide";
import DesktopNav from "./components/sections/DesktopNav";
import About from "./components/sections/About";
import EventDetails from "./components/sections/EventDetails";
import Countdown from "./components/sections/Countdown";
import OurStory from "./components/sections/OurStory";
import Gallery from "./components/sections/Gallery";
import Location from "./components/sections/Location";
import Rsvp from "./components/sections/Rsvp";
import Footer from "./components/sections/Footer";
import MusicPlayer from "./components/ui/MusicPlayer";
import { ScrollProgress, TapSparkles } from "./components/ui/Effects";

type Stage = "closed" | "opening" | "open";

/**
 * Page composition. All content comes from src/data/invitation.ts; every section is its own component.
 *
 * Flow: the "Tap to open" cover is shown first. The invitation mounts the moment it is tapped, so its
 * entrance animations play underneath while the cover shrinks away.
 */
export default function App() {
  const { event, couple } = invitation;
  const parts = useMemo(() => eventParts(event.start, event.end, event.timezone), [event.start, event.end, event.timezone]);
  const title = `${couple.first} & ${couple.second} · Wedding Invitation`;
  const guest = useMemo(readGuest, []);
  const [stage, setStage] = useState<Stage>("closed");

  // Warm the hero photo while the guest is looking at the cover.
  useEffect(() => {
    const img = new Image();
    img.src = photoUrl(invitation.hero.photo, 800);
  }, []);

  // Always begin at the top, even after a reload that restored a scroll position.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    // "user" makes Motion skip movement-based animation when the device asks for reduced motion.
    <MotionConfig reducedMotion="user">
      {/* Single target for every "#home" link, whichever hero is showing */}
      <span id="home" aria-hidden className="absolute left-0 top-0 h-0 w-0" />

      {/* Tablet / desktop: full-width nav bar and wide hero sit outside the phone-width column */}
      {stage !== "closed" && (
        <>
          <DesktopNav nav={invitation.nav} monogram={couple.monogram} />
          <HeroWide config={invitation} parts={parts} />
        </>
      )}

      <div className="page">
        {stage !== "closed" && (
          <>
            <ScrollProgress />
            <MenuButton nav={invitation.nav} title={title} />
            <main>
              <Hero config={invitation} parts={parts} />
              <About about={invitation.about} />
              <EventDetails
                venue={invitation.venue}
                parts={parts}
                event={event}
                calendar={{ title: `${couple.first} & ${couple.second} · Wedding`, description: invitation.hero.invite }}
              />
              <Countdown heading={invitation.countdownHeading} start={event.start} />
              <OurStory story={invitation.story} />
              <Gallery gallery={invitation.gallery} />
              <Location venue={invitation.venue} />
              <Rsvp rsvp={invitation.rsvp} />
            </main>
            <Footer config={invitation} parts={parts} />
          </>
        )}
        <MusicPlayer src={invitation.musicSrc} autoStart={stage !== "closed" && invitation.musicOnOpen} />
      </div>

      <TapSparkles />

      {stage !== "open" && (
        <OpeningCover
          config={invitation}
          parts={parts}
          guest={guest}
          onOpenStart={() => setStage("opening")}
          onOpened={() => {
            setStage("open");
            window.scrollTo(0, 0);
          }}
        />
      )}
    </MotionConfig>
  );
}
