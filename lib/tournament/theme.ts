import { createTheme, type ThemeType } from '@g-loot/react-tournament-brackets';

export const theme: ThemeType = createTheme({
  textColor: { main: '#e5e5e5', highlighted: '#f5f5f5', dark: '#d4d4d4' },
  matchBackground: { wonColor: '#404040', lostColor: '#262626' },
  score: {
    background: { wonColor: '#404040', lostColor: '#262626' },
    text: { highlightedWonColor: '#6ee7b7', highlightedLostColor: '#FB7E94' },
  },
  border: {
    color: '#e5e5e5',
    highlightedColor: '#404040',
  },
  roundHeader: { backgroundColor: '#404040', fontColor: '#e5e5e5' },
  connectorColor: '#e5e5e5',
  connectorColorHighlight: '#404040',
  canvasBackground: '#0a0a0a',
});
