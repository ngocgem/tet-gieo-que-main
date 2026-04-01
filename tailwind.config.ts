import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        tet: {
          crimson: "hsl(var(--tet-crimson))",
          "crimson-dark": "hsl(var(--tet-crimson-dark))",
          "crimson-deep": "hsl(var(--tet-crimson-deep))",
          gold: "hsl(var(--tet-gold))",
          "gold-dark": "hsl(var(--tet-gold-dark))",
          "gold-light": "hsl(var(--tet-gold-light))",
          parchment: "hsl(var(--tet-parchment))",
          "parchment-dark": "hsl(var(--tet-parchment-dark))",
          "cream-text": "hsl(var(--tet-cream-text))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "sway": {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        "sparkle": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(0.8)" },
        },
        "fall": {
          "0%": { transform: "translateY(-10%) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(51 100% 50% / 0.3), 0 0 40px hsl(51 100% 50% / 0.1)" },
          "50%": { boxShadow: "0 0 30px hsl(51 100% 50% / 0.6), 0 0 60px hsl(51 100% 50% / 0.2)" },
        },
        "drift": {
          "0%": { transform: "translateX(-20px) translateY(0)", opacity: "0" },
          "20%": { opacity: "0.08" },
          "80%": { opacity: "0.08" },
          "100%": { transform: "translateX(20px) translateY(-30px)", opacity: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { filter: "brightness(1) drop-shadow(0 0 5px hsl(51 100% 50% / 0.3))" },
          "50%": { filter: "brightness(1.3) drop-shadow(0 0 15px hsl(51 100% 50% / 0.6))" },
        },
        "wobble": {
          "0%": { transform: "rotate(0deg)" },
          "15%": { transform: "rotate(-18deg)" },
          "30%": { transform: "rotate(15deg)" },
          "45%": { transform: "rotate(-12deg)" },
          "60%": { transform: "rotate(9deg)" },
          "75%": { transform: "rotate(-5deg)" },
          "90%": { transform: "rotate(2deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "sway": "sway 4s ease-in-out infinite",
        "sparkle": "sparkle 2s ease-in-out infinite",
        "fall": "fall 8s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "drift": "drift 12s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "wobble": "wobble 1.2s ease-in-out",
        "shimmer": "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
