import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-family-main)']
      },
      colors: {
        primary: "#007EA7",
        secondary: "#003249",
        tertiary: "80CED7",
        background: "#EFEFEF",
        "primary-hover": "#E7F5FF",
        "light-gray": "#ADB0B2",
        "medium-gray": "#424950",
      },
      textColor: {
        "text-primary": "#272727",
      }
    },
  },
  plugins: [],
} satisfies Config;
