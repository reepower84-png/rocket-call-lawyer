import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c2d6ff',
          300: '#94b8ff',
          400: '#5c91ff',
          500: '#1a56db',
          600: '#0f3d91',
          700: '#0c2d6b',
          800: '#081f4a',
          900: '#051231',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#c9a227',
          600: '#a67c00',
          700: '#854d0e',
          800: '#713f12',
          900: '#5c3410',
        },
      },
    },
  },
  plugins: [],
};

export default config;
