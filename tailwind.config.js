export default {
  darkMode: 'class',
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        wine: { DEFAULT: 'rgb(var(--wine) / <alpha-value>)', dark: 'rgb(var(--wine-dark) / <alpha-value>)' },
        petal: { DEFAULT: 'rgb(var(--petal) / <alpha-value>)', border: 'rgb(var(--petal-border) / <alpha-value>)' },
        blush: 'rgb(var(--blush) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        gold: { DEFAULT: 'rgb(var(--gold) / <alpha-value>)', soft: 'rgb(var(--gold-soft) / <alpha-value>)' },
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          muted: 'rgb(var(--ink-muted) / <alpha-value>)',
          faint: 'rgb(var(--ink-faint) / <alpha-value>)'
        },
        line: 'rgb(var(--line) / <alpha-value>)',
        sage: { DEFAULT: 'rgb(var(--sage) / <alpha-value>)', soft: 'rgb(var(--sage-soft) / <alpha-value>)' },
      },
      fontFamily: {
        serif: ['"Libre Baskerville"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
