import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // SHIELD locked palette
        primary: {
          DEFAULT: "#FF8F1F",
          dark: "#E67300",
          light: "#FFB766",
          foreground: "#0A0E1A",
        },
        secondary: {
          DEFAULT: "#1E3A8A",
          light: "#3B82F6",
          foreground: "#F5F7FA",
        },
        bg: {
          DEFAULT: "#0A0E1A",
          surface: "#131825",
          elevated: "#1C2333",
        },
        border: {
          DEFAULT: "#2A3142",
        },
        text: {
          primary: "#F5F7FA",
          secondary: "#9CA3AF",
          muted: "#6B7280",
        },
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        info: "#3B82F6",

        // Pillar palette (kept here so utility classes can reference them)
        pillar: {
          sense: "#FF8F1F",
          harmonise: "#3B82F6",
          interpret: "#10B981",
          endure: "#F59E0B",
          lead: "#8B5CF6",
          dominate: "#EF4444",
        },

        // shadcn-compatible aliases (mapped to SHIELD tokens for dark theme by default)
        background: "#0A0E1A",
        foreground: "#F5F7FA",
        card: {
          DEFAULT: "#131825",
          foreground: "#F5F7FA",
        },
        popover: {
          DEFAULT: "#1C2333",
          foreground: "#F5F7FA",
        },
        muted: {
          DEFAULT: "#1C2333",
          foreground: "#9CA3AF",
        },
        accent: {
          DEFAULT: "#FF8F1F",
          foreground: "#0A0E1A",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#F5F7FA",
        },
        input: "#2A3142",
        ring: "#FF8F1F",
      },

      fontFamily: {
        sans: ["var(--font-urbanist)", "system-ui", "sans-serif"],
        display: ["var(--font-urbanist)", "system-ui", "sans-serif"],
      },

      fontSize: {
        // SHIELD type scale (size / line-height)
        display: ["32px", { lineHeight: "40px", fontWeight: "800" }],
        h1: ["28px", { lineHeight: "36px", fontWeight: "700" }],
        h2: ["22px", { lineHeight: "30px", fontWeight: "700" }],
        h3: ["18px", { lineHeight: "26px", fontWeight: "600" }],
        body: ["15px", { lineHeight: "24px", fontWeight: "400" }],
        small: ["13px", { lineHeight: "20px", fontWeight: "500" }],
        caption: [
          "11px",
          { lineHeight: "16px", fontWeight: "500", letterSpacing: "0.5px" },
        ],
      },

      borderRadius: {
        "2xl": "16px",
        xl: "14px",
        lg: "10px",
        md: "8px",
        sm: "6px",
      },

      boxShadow: {
        // Subtle inner glows instead of heavy outer shadows
        "inner-glow": "inset 0 1px 0 0 rgba(255, 255, 255, 0.04)",
        "inner-glow-primary":
          "inset 0 0 0 1px rgba(255, 143, 31, 0.35), inset 0 0 24px 0 rgba(255, 143, 31, 0.12)",
        "elevated":
          "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 24px -12px rgba(0,0,0,0.6)",
        "card": "0 1px 0 0 rgba(255,255,255,0.03) inset",
      },

      backgroundImage: {
        "hex-grid":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
        "hero-gradient":
          "radial-gradient(60% 60% at 50% 0%, rgba(255,143,31,0.10) 0%, transparent 60%)",
      },

      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.9" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        "fade-in": "fade-in 250ms ease-out",
        "slide-up": "slide-up 300ms ease-out",
        "pulse-slow": "pulse-slow 1.5s ease-in-out infinite",
        flicker: "flicker 2.4s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        shimmer: "shimmer 2.4s linear infinite",
        "accordion-down": "accordion-down 200ms ease-out",
        "accordion-up": "accordion-up 200ms ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
