import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
    keyframes: {
      slidein: {
        from: {
          opacity: "0",
          transform: "translateY(-10px)",
        },
        to: {
          opacity: "1",
          transform: "translateY(0)",
        }
      },
    },
    animation: {
      slidein300: "slidein 1s ease 300ms forwards",
      slidein400: "slidein 1s ease 400ms forwards",
      slidein500: "slidein 1s ease 500ms forwards",
      slidein600: "slidein 1s ease 600ms forwards",
      slidein700: "slidein 1s ease 700ms forwards",
      slidein800: "slidein 1s ease 800ms forwards",
      slidein900: "slidein 1s ease 900ms forwards",
    }
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
