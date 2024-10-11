import { Match, SingleEliminationBracket, SVGViewer } from '@g-loot/react-tournament-brackets';

import Header from '@components/header';
import Layout from '@components/layout';
import Page from '@components/page';
import { META_DESCRIPTION } from '@lib/constants';
import useWindowSize from '@lib/hooks/use-window-size';
import { simpleBracket, theme } from '@lib/tournament';
import { ReactNode } from 'react';

export const Bracket = ({ matches = simpleBracket }) => {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 50, 500);
  return (
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
      svgWrapper={({ children, ...props }: { children: ReactNode }) => (
        <SVGViewer
          width={finalWidth}
          height={finalHeight}
          background={theme.canvasBackground}
          SVGBackground={theme.canvasBackground}
          bracketWidth={100}
          bracketHeight={100}
          {...props}
        >
          {children}
        </SVGViewer>
      )}
    />
  );
};

export default function Tournament() {
  const meta = {
    title: 'Candy Showdown',
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta} fullViewport>
      <Layout>
        <Header hero="Tournament" description={meta.description} />
        <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          <Bracket />
        </div>
      </Layout>
    </Page>
  );
}
