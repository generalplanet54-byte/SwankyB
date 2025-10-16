import defaultTheme from 'tailwindcss/defaultTheme.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        charcoal: '#1A1A1A',
        'off-white': '#FAFAF8',
        champagne: '#D4AF37',
      },
      fontFamily: {
        display: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        luxury: '0 40px 80px -40px rgba(20, 20, 20, 0.65)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
