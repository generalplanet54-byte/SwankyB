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
        // Brand tokens derived from MANSCAPED logo sampling
        brand: '#86603D',        // Primary brand brown
        'brand-dark': '#483529', // Dark brown for hover/accent
        'brand-light': '#9A6F48', // Light brown for softer accents
        'brand-tan': '#B7A48F',   // Lightest tan for backgrounds
        'brand-contrast': '#1E1711', // Very dark brown for text
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
