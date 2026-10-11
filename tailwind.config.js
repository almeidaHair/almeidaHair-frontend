export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        wine: { DEFAULT: '#8C2D4F', dark: '#6E1F3C' },
        petal: { DEFAULT: '#F8DDE7', border: '#E8B8CA' },
        blush: '#FBF2F2',
        gold: { DEFAULT: '#C4A062', soft: '#E9D9B8' },
        ink: { DEFAULT: '#2B1B22', muted: '#6B5A61', faint: '#A3949A' },
        line: '#E6DADE',
        sage: { DEFAULT: '#2F6B45', soft: '#E4F0E7' },
      },
      fontFamily: {
        serif: ['"Libre Baskerville"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
