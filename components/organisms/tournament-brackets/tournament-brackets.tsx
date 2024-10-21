import { SingleEliminationBracket } from '@g-loot/react-tournament-brackets';

import Match from './match';
import matches from './match-model';
import theme from './theme';
import useMatchData from './use-match-data';

export default function TournamentBrackets() {
  const list = useMatchData();
  // console.log('list = ', list);
  // const [width, height] = useWindowSize();
  // const finalWidth = Math.max(width - 50, 500);
  // const finalHeight = Math.max(height - 50, 500);
  return (
    !list.isLoading && (
      <SingleEliminationBracket
        matches={matches}
        matchComponent={Match}
        theme={theme}
        options={{
          style: {
            roundHeader: {
              backgroundColor: theme.roundHeaders.background,
              fontColor: theme.textColor.main,
            },
            connectorColor: theme.border.color,
            connectorColorHighlight: theme.border.highlightedColor,
          },
        }}
        // svgWrapper={({ children, ...props }: { children: ReactNode }) => (
        //   <SVGViewer
        //     width={finalWidth}
        //     height={finalHeight}
        //     background={defaultTheme.canvasBackground}
        //     SVGBackground={defaultTheme.canvasBackground}
        //     bracketWidth={100}
        //     bracketHeight={100}
        //     {...props}
        //   >
        //     {children}
        //   </SVGViewer>
        // )}
      />
    )
  );
}

// export default function TournamentBrackets() {
//   return (
//     <div className="h-full w-full overflow-x-auto">
//       <Bracket matches={matches} />
//     </div>
//   );
// }
