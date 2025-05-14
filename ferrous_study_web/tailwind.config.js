import tailwindcss from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        'custom': 'transform, background-color, opacity, filter, backdrop-filter, color',
      },
      transitionDuration: {
        '7ms': '700ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      screens: {
        '-md': { 'max': '768px' },
      },
      colors: {
        "translucent": "#494949a6",
        "theme-00": "var(--theme-00)",
        "theme-0": "var(--theme-0)",
        "theme-1": "var(--theme-1)",
        "theme-1-l": "var(--theme-1-l)",
        "theme-1-d": "var(--theme-1-d)",
        "theme-2": "var(--theme-2)",
        "theme-2-l": "var(--theme-2-l)",
        "theme-2-d": "var(--theme-2-d)",
        "theme-3": "var(--theme-3)",
        "theme-3-l": "var(--theme-3-l)",
        "theme-3-d": "var(--theme-3-d)",
        "theme-4": "var(--theme-4)",
        "theme-4-l": "var(--theme-4-l)",
        "theme-4-d": "var(--theme-4-d)",
        "theme-d-1": "var(--theme-d-1)",
        "theme-d-1-l": "var(--theme-d-1-l)",
        "theme-d-1-d": "var(--theme-d-1-d)",
        "theme-d-2": "var(--theme-d-2)",
        "theme-d-2-l": "var(--theme-d-2-l)",
        "theme-d-2-d": "var(--theme-d-2-d)",
        "theme-d-3": "var(--theme-d-3)",
        "theme-d-3-l": "var(--theme-d-3-l)",
        "theme-d-3-d": "var(--theme-d-3-d)",
        "theme-d-4": "var(--theme-d-4)",
        "theme-d-4-l": "var(--theme-d-4-l)",
        "theme-d-4-d": "var(--theme-d-4-d)",
        "theme-o-1": "var(--theme-o--1)",
        "theme-o-1-l": "var(--theme-o-1-l)",
        "theme-o-1-d": "var(--theme-o-1-d)",
        "theme-o-2": "var(--theme-o-2)",
        "theme-o-2-l": "var(--theme-o-2-l)",
        "theme-o-2-d": "var(--theme-o-2-d)",
        "theme-o-3": "var(--theme-o-3)",
        "theme-o-3-l": "var(--theme-o-3-l)",
        "theme-o-3-d": "var(--theme-o-3-d)",
        "theme-o-4": "var(--theme-o-4)",
        "theme-o-4-l": "var(--theme-o-4-l)",
        "theme-o-4-d": "var(--theme-o-4-d)"

      }
    },
  },
  plugins: [
    tailwindcss,
  ],
};