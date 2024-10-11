// The @g-loot/react-tournament-brackets does not correctly define types
// so we must do it for them here.
declare module '@g-loot/react-tournament-brackets' {
  export {
    Match,
    SVGViewer,
    SingleEliminationBracket,
    createTheme,
  } from '@g-loot/react-tournament-brackets/dist/cjs';
  export type {
    MatchComponentProps,
    MatchType,
    ThemeType,
  } from '@g-loot/react-tournament-brackets/dist/cjs';
}
