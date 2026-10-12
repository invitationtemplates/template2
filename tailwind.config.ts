import type { Config } from "tailwindcss";

// Palette sampled from the reference: ivory paper, ice-blue panels, deep ocean teal, antique gold.
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: { DEFAULT: "#FBF6EA", warm: "#F7EEDB", deep: "#EFE2C6" },
        ice: { DEFAULT: "#E6F1F1", deep: "#D3E7EA" },
        teal: { DEFAULT: "#14606B", deep: "#0C4952", night: "#08373F", soft: "#4F8A92" },
        gold: { DEFAULT: "#B8893E", light: "#D9B26B", soft: "#E8D0A2", deep: "#936A24" },
        ink: { DEFAULT: "#24464D", soft: "#4C6A70" },
      },
      fontFamily: {
        script: ["Allura", "cursive"],
        heading: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"Cormorant Garamond"', "Georgia", "serif"],
        text: ["Lora", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 12px 30px -16px rgba(8, 55, 63, 0.45)",
        soft: "0 6px 18px -10px rgba(8, 55, 63, 0.35)",
      },
      keyframes: {
        swing: { "0%, 100%": { transform: "rotate(-3deg)" }, "50%": { transform: "rotate(3deg)" } },
        sway: { "0%, 100%": { transform: "rotate(-1deg)" }, "50%": { transform: "rotate(1deg)" } },
        glow: { "0%, 100%": { opacity: "0.5" }, "50%": { opacity: "1" } },
        bob: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(5px)" } },
        shimmer: { "0%": { backgroundPosition: "200% 50%" }, "100%": { backgroundPosition: "-200% 50%" } },
        wave: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        twinkle: { "0%, 100%": { opacity: "0.15", transform: "scale(0.6)" }, "50%": { opacity: "1", transform: "scale(1)" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        fall: {
          "0%": { transform: "translate3d(0, -6%, 0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.9" },
          "100%": { transform: "translate3d(46px, 640px, 0) rotate(300deg)", opacity: "0" },
        },
        rise: {
          "0%": { transform: "translate3d(0, 0, 0) scale(0.7)", opacity: "0" },
          "15%": { opacity: "0.85" },
          "100%": { transform: "translate3d(14px, -260px, 0) scale(1.1)", opacity: "0" },
        },
        shine: { "0%, 55%": { transform: "translateX(-130%) skewX(-18deg)" }, "100%": { transform: "translateX(260%) skewX(-18deg)" } },
        ripple: { "0%": { transform: "scale(0.5)", opacity: "0.7" }, "100%": { transform: "scale(2.4)", opacity: "0" } },
      },
      animation: {
        swing: "swing 5.5s ease-in-out infinite",
        sway: "sway 8s ease-in-out infinite",
        glow: "glow 2.8s ease-in-out infinite",
        bob: "bob 1.8s ease-in-out infinite",
        shimmer: "shimmer 7s linear infinite",
        wave: "wave 22s linear infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        float: "float 4.5s ease-in-out infinite",
        fall: "fall 14s linear infinite",
        rise: "rise 10s ease-in infinite",
        shine: "shine 5s ease-in-out infinite",
        ripple: "ripple 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
