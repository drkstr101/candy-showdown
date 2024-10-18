import { createTheme } from '@g-loot/react-tournament-brackets';

// export type Theme = typeof theme;

export default createTheme({
  fontFamily: '"Inter", "sans-serif"',
  transitionTimingFunction: 'cubic-bezier(0, 0.92, 0.77, 0.99)',
  smooth: 'ease-in-out',

  disabledColor: '#737373',
  roundHeaders: {
    background: '#404040',
  },
  matchBackground: {
    wonColor: '#262626',
    lostColor: '#171717',
  },
  border: {
    color: '#737373',
    highlightedColor: '#a3a3a3',
  },
  textColor: {
    highlighted: '#e5e5e5',
    main: '#fafafa',
    dark: '#d4d4d4',
    disabled: '#737373',
  },
  score: {
    text: {
      highlightedWonColor: '#34d399',
      highlightedLostColor: '#fb7185',
    },
    background: {
      wonColor: '#0a0a0a',
      lostColor: '#0a0a0a',
    },
  },
});
