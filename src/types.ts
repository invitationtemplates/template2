/** A photograph. `src` is a local asset; `cloudinaryId` (optional) is used instead when Cloudinary is configured. */
export interface Photo {
  src: string;
  alt: string;
  cloudinaryId?: string;
}

export interface StoryItem {
  icon: "hearts" | "rings" | "infinity";
  /** Lines are shown on separate lines, exactly as in the reference. */
  lines: string[];
}

export interface InvitationConfig {
  couple: { first: string; second: string; monogram: string; hashtag: string };
  /** ISO date-time with timezone offset. Weekday, day, month, year, time and the countdown are derived from it. */
  event: { start: string; end: string; timezone: string };
  hero: {
    together: string;
    invite: string;
    reception: string;
    /** Portrait crop used on phones. */
    photo: Photo;
    /** Wide scene (sofa, flowers, ocean) used on tablets and desktops; fades into the page on its left. */
    photoWide: Photo;
  };
  about: { heading: string; paragraphs: string[]; photo: Photo; quote: string };
  venue: { name: string; address: string[]; mapsQuery: string; photo: Photo; mapPhoto: Photo };
  countdownHeading: string;
  story: { heading: string; items: StoryItem[] };
  gallery: { heading: string; subtitle: string; photos: Photo[] };
  rsvp: { heading: string; intro: string; closing: string[]; whatsappNumber: string };
  footer: { instagram: string; facebook: string; youtube: string; made: string };
  cover: { invited: string; tap: string; dear: string };
  musicSrc: string;
  musicOnOpen: boolean;
  nav: { label: string; href: string }[];
}
