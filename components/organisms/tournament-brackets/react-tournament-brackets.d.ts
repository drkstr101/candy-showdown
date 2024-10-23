// The @g-loot/react-tournament-brackets does not correctly define types
// so we must do it for them here.
declare module '@g-loot/react-tournament-brackets' {
  import type { ThemeType as OriginalTheme } from '@g-loot/react-tournament-brackets/dist/cjs';
  export interface ThemeType extends OriginalTheme {
    smooth?: string;
  }
  export {
    Match,
    SVGViewer,
    SingleEliminationBracket,
    Theme,
    createTheme,
  } from '@g-loot/react-tournament-brackets/dist/cjs';
  export type {
    MatchComponentProps,
    MatchType,
    ParticipantType,
  } from '@g-loot/react-tournament-brackets/dist/cjs';
}
