import type { InvitationConfig } from "../types";
import hero from "../assets/photos/hero.webp";
import heroWide from "../assets/photos/hero-wide.webp";
import rings from "../assets/photos/rings.webp";
import g1 from "../assets/photos/gallery-1.webp";
import g2 from "../assets/photos/gallery-2.webp";
import g3 from "../assets/photos/gallery-3.webp";
import g4 from "../assets/photos/gallery-4.webp";
import g5 from "../assets/photos/gallery-5.webp";
import g6 from "../assets/photos/gallery-6.webp";
import map from "../assets/photos/map.webp";
import venue from "../assets/photos/venue.webp";

/**
 * ============================================================================
 *  EDIT THIS FILE to reuse the design for another couple.
 *  Everything below is SAMPLE CONTENT taken from the reference mock-up: the
 *  names, venue and times are placeholders, not real wedding details.
 *  Photos are low-resolution samples: replace them in src/assets/photos
 *  (or give them a `cloudinaryId` and set VITE_CLOUDINARY_CLOUD in .env).
 * ============================================================================
 */
export const invitation: InvitationConfig = {
  couple: { first: "Pooja", second: "Rahul", monogram: "PR", hashtag: "#PoojaWedsRahul" },

  // SAMPLE DATE. The weekday is calculated from the date, so it can never disagree with it.
  event: {
    start: "2027-05-23T18:00:00+05:30",
    end: "2027-05-23T23:00:00+05:30",
    timezone: "Asia/Kolkata",
  },

  hero: {
    together: "Together with their families",
    invite: "Joyfully invite you to celebrate their wedding",
    reception: "Reception to Follow",
    photo: { src: hero, alt: "Pooja and Rahul seated together on a cream sofa by the ocean at sunset" },
    photoWide: { src: heroWide, alt: "Pooja and Rahul seated together on a cream sofa, framed by white flowers and lanterns, with the ocean at sunset behind them" },
  },

  about: {
    heading: "About Us",
    paragraphs: [
      "Two hearts, one journey. We are delighted to begin this beautiful chapter of our lives together and would be honoured to have you with us on our special day.",
      "Your presence will make our celebration even more meaningful.",
    ],
    photo: { src: rings, alt: "Two gold wedding rings resting on a decorative plate among white flowers" },
    quote: "“Together is a beautiful place to be.”",
  },

  venue: {
    name: "The Ocean Palace",
    address: ["Sea Breeze Avenue, Coastal Road", "Mumbai, India"],
    mapsQuery: "The Ocean Palace, Sea Breeze Avenue, Coastal Road, Mumbai, India",
    photo: { src: venue, alt: "The Ocean Palace lit up at dusk beside the sea, surrounded by palm trees" },
    mapPhoto: { src: map, alt: "Map showing the venue on the Mumbai coast" },
  },

  countdownHeading: "Countdown to Our Big Day",

  story: {
    heading: "Our Story",
    items: [
      { icon: "hearts", lines: ["Two souls", "found each other"] },
      { icon: "rings", lines: ["Two families", "became one"] },
      { icon: "infinity", lines: ["And now, we begin", "a lifetime together"] },
    ],
  },

  gallery: {
    heading: "Gallery",
    subtitle: "Moments of love, joy and togetherness",
    photos: [
      { src: g1, alt: "The couple sitting close together on a sofa" },
      { src: g2, alt: "Hands decorated with bridal mehndi" },
      { src: g3, alt: "A bouquet of white and blue flowers" },
      { src: g4, alt: "A floral archway framed by palm trees" },
      { src: g5, alt: "A candle-lit dinner table with white roses" },
      { src: g6, alt: "A garden aisle with an arch and palms at sunset" },
    ],
  },

  rsvp: {
    heading: "RSVP",
    intro: "We would be honored to have you with us on our special day.",
    closing: ["Your presence means", "the world to us"],
    // Digits only, with country code. Used to send RSVP replies through WhatsApp when no endpoint is set.
    // SAMPLE: replace with the family's real number.
    whatsappNumber: "919000000000",
  },

  footer: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
    made: "for our special day",
  },

  cover: { invited: "You are invited", tap: "Tap to open", dear: "Dear" },

  // Leave empty to hide the music button. Example: "/audio/wedding.mp3" (file placed in /public/audio).
  musicSrc: "",
  musicOnOpen: true,

  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Location", href: "#location" },
    { label: "RSVP", href: "#rsvp" },
  ],
};
