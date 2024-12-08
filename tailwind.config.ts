import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
         '0%, 100%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(-10deg)' },
          '20%': { transform: 'rotate(10deg)' },
          '30%': { transform: 'rotate(-10deg)' },
          '40%': { transform: 'rotate(10deg)' },
          '50%': { transform: 'rotate(0deg)' },
        }
      },
      animation: {
        shake: 'shake 1.5s ease-in-out infinite'
      }
    ,
      colors: {
        "text-brown-primary": "#3C2415",
        "navbar-background": "#FBF6EC",
        "navbar-line": "#D7A444",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans - serif"],
        robotoslab: ["Roboto Slab", "serif"],
        robotoflex: ["Roboto Flex", "sans - serif"],
        inter: ["Inter", "sans - serif"],
      },
      backgroundImage: {
        paper: "url('/images/productbg.png')",
      },
    },
    screens: {
      mobile: {
        min: "100px",
        max: "550px",
      },
      tablet: {
        min: "550px",
        max: "750px",
      },
      "mini-laptop": {
        min: "750px",
        max: "874px",
      },
      laptop: {
        min: "874px",
        max: "1280px",
      },
      desktop: {
        min: "1280px",
      },
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  darkMode: ["class", "class"],
  plugins: [nextui(), require("tailwindcss-animate")],
};
export default config;
