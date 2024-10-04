export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'apsphysics';
export const BRAND_NAME = 'APS';
export const SITE_NAME_MULTILINE = ['Candy', 'Showdown'];
export const SITE_NAME = 'Candy Showdown';
export const META_DESCRIPTION =
  '2024 Oktoberfest Candy Showdown brought to you by the American Physical Society Events Committee';
export const SITE_DESCRIPTION = 'An interactive online tournament for Oktoberfest 2024.';
export const DATE = '14 October 2024';
export const SHORT_DATE = 'Oct 14 - 9:00am ET';
export const FULL_DATE = 'Oct 14th 9:00am Eastern Time (GMT-5)';
export const TWEET_TEXT = META_DESCRIPTION;
export const COOKIE = 'user-id';

// Remove process.env.NEXT_PUBLIC_... below and replace them with
// strings containing your own privacy policy URL and copyright holder name
export const LEGAL_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;
export const COPYRIGHT_HOLDER = 'American Physical Society';

export const CODE_OF_CONDUCT =
  'https://www.aps.org/about/governance/policies-procedures/code-of-conduct';
export const REPO = 'https://github.com/drkstr101/candy-showdown';
export const INFO_URL =
  'https://aps.jostle.us/jostle-prod/#~b~:0:0:-1:-1:-1:-1:0:0:~dw~:NEWS2_VIEWER:0000018ae1cdfbd3-0010033e-532301db';
export const SAMPLE_TICKET_NUMBER = 1234;
export const NAVIGATION = [
  {
    name: 'Lobby',
    route: '/lobby',
  },
  {
    name: 'Schedule',
    route: '/schedule',
  },
  {
    name: 'Participants',
    route: '/participants',
  },
  {
    name: 'Tournament',
    route: '/expo',
  },
];

export type TicketGenerationState = 'default' | 'loading';
