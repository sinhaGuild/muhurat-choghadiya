import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme")
 
/** @type {import('tailwindcss').Config} */

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    // fontSize: {
    //   xs: "var(--tw-xs)",
    //   sm: ["var(--tw-sm)", "1.3"],
    //   base: "var(--tw-base)",
    //   md: "var(--tw-md)",
    //   lg: "var(--tw-lg)",
    //   xl: ["var(--tw-xl)", "1.3"],
    //   "2xl": "var(--tw-2xl)",
    //   "3xl": "var(--tw-3xl)",
    //   "4xl": "var(--tw-4xl)",
    //   "5xl": "var(--tw-5xl)",
    //   "6xl": ["var(--tw-6xl)", "1"],
    //   "7xl": ["var(--tw-7xl)", "1.1"],
    //   "8xl": ["var(--tw-8xl)", "1.2"],
    //   "9xl": "var(--tw-9xl)",
    //   "10xl": "var(--tw-10xl)",
    //   "11xl": "var(--tw-11xl)",
    //   "12xl": "var(--tw-12xl)",
    //   // xs: "1.3rem",
    //   // sm: ["1.4rem", "1.4"],
    //   // md: "1.6rem",
    //   // lg: "1.8rem", //2.2
    //   // xl: ["2.618rem", "1.3"],
    //   // "2xl": "3.427rem",
    //   // "3xl": "4.236rem",
    //   // "4xl": "5.5rem",
    //   // "5xl": "6.854rem",
    //   // "6xl": ["8.965rem", "1"],
    //   // "7xl": ["11.08rem", "1.1"],
    //   // "8xl": ["13rem", "1.2"],
    // },
    extend: {
      fontFamily: {
        // sans: ["var(--font-sans)", ...fontFamily.sans],
        sans: ["SF Pro Display", ...fontFamily.sans],
        mono: ["Space Mono", ...fontFamily.mono],
        serif: ["Merriweather", ...fontFamily.serif],
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
        
      },
      
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config