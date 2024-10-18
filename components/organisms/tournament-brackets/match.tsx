/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeType, type MatchComponentProps } from '@g-loot/react-tournament-brackets';
import styled, { css } from 'styled-components';

type WithTheme = {
  theme: ThemeType;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  font-family: ${({ theme }: WithTheme) => theme.fontFamily};
`;
export const TopText = styled.p`
  color: ${({ theme }: WithTheme) => theme.textColor.dark};
  margin-bottom: 0.2rem;
  min-height: 1.25rem;
`;
export const BottomText = styled.p`
  color: ${({ theme }: WithTheme) => theme.textColor.dark};

  flex: 0 0 none;
  text-align: center;
  min-height: 1.25rem;
`;
export const StyledMatch = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
`;

export const Team = styled.div``;

interface ScoreProps {
  won?: boolean;
}
export const Score = styled.div<ScoreProps>`
  display: flex;
  height: 100%;
  padding: 0 1rem;
  align-items: center;
  width: 20%;
  justify-content: center;
  background: ${({ theme, won }) =>
    won ? theme.score.background.wonColor : theme.score.background.lostColor};
  color: ${({ theme, won }: any) => (won ? theme.textColor.highlighted : theme.textColor.dark)};
`;
interface SideProps {
  won?: boolean;
  hovered?: boolean;
}
export const Side = styled.div<SideProps>`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 1rem;
  background: ${({ theme, won }) =>
    won ? theme.matchBackground.wonColor : theme.matchBackground.lostColor};

  :first-of-type {
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    border-top-width: 2px;
  }
  :last-of-type {
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-bottom-width: 2px;
  }
  border-right: 4px solid ${({ theme }: WithTheme) => theme.border.color};
  border-left: 4px solid ${({ theme }: WithTheme) => theme.border.color};
  border-top: 1px solid ${({ theme }: WithTheme) => theme.border.color};
  border-bottom: 1px solid ${({ theme }: WithTheme) => theme.border.color};

  transition: border-color 0.5s ${({ theme }: WithTheme) => theme.transitionTimingFunction};
  ${Team} {
    color: ${({ theme, won }: any) => (won ? theme.textColor.highlighted : theme.textColor.dark)};
  }
  ${Score} {
    color: ${({ theme, won }: any) => (won ? theme.textColor.highlighted : theme.textColor.dark)};
  }
  ${({ hovered, theme, won }: any) =>
    hovered &&
    css`
      border-color: ${theme.border.highlightedColor};
      ${Team} {
        color: ${theme.textColor.highlighted};
      }
      ${Score} {
        color: ${won
          ? theme.score.text.highlightedWonColor
          : theme.score.text.highlightedLostColor};
      }
    `}
`;
interface LineProps {
  highlighted?: boolean;
}
export const Line = styled.div<LineProps>`
  height: 1px;
  transition: border-color 0.5s ${({ theme }: WithTheme) => theme.smooth};

  border-width: 1px;
  border-style: solid;
  border-color: ${({ highlighted, theme }: any) =>
    highlighted ? theme.border.highlightedColor : theme.border.color};
`;

export const Anchor = styled.a`
  font-family: ${(props: any) => (props.font ? props.font : props.theme.fontFamily)};
  font-weight: ${(props: any) => (props.bold ? '700' : '400')};
  color: ${(props: any) => props.theme.textColor.main};
  font-size: ${(props: any) => (props.size ? props.size : '1rem')};
  line-height: 1.375rem;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Match({
  bottomHovered,
  bottomParty,
  bottomText,
  bottomWon,
  match,
  onMatchClick,
  onMouseEnter,
  onMouseLeave,
  onPartyClick,
  topHovered,
  topParty,
  topText,
  topWon,
}: MatchComponentProps) {
  return (
    <Wrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* <TopText>{topText}</TopText> */}
        {(match.href || typeof onMatchClick === 'function') && (
          <Anchor
            href={match.href}
            onClick={(event) => onMatchClick?.({ match, topWon, bottomWon, event })}
          >
            <TopText>Match Details</TopText>
          </Anchor>
        )}
      </div>
      <StyledMatch>
        <Side
          onMouseEnter={() => onMouseEnter(topParty.id)}
          onMouseLeave={onMouseLeave}
          won={topWon}
          hovered={topHovered}
          onClick={() => onPartyClick?.(topParty, topWon)}
        >
          <Team>{topParty?.name}</Team>
          <Score won={topWon}>{topParty?.resultText}</Score>
        </Side>
        <Line highlighted={topHovered || bottomHovered} />
        <Side
          onMouseEnter={() => onMouseEnter(bottomParty.id)}
          onMouseLeave={onMouseLeave}
          won={bottomWon}
          hovered={bottomHovered}
          onClick={() => onPartyClick?.(bottomParty, bottomWon)}
        >
          <Team>{bottomParty?.name}</Team>
          <Score won={bottomWon}>{bottomParty?.resultText}</Score>
        </Side>
      </StyledMatch>
      <BottomText>{bottomText ?? ' '}</BottomText>
    </Wrapper>
  );
}
