export const SITE_URL = 'https://3000-drkstr101-apscandyshowd-h0jfyjx8y8b.ws-us116.gitpod.io';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'apsphysics';
export const BRAND_NAME = 'APS';
export const SITE_NAME_MULTILINE = ['Candy', 'Showdown'];
export const SITE_NAME = 'Candy Showdown';
export const META_DESCRIPTION =
  '2024 Oktoberfest Candy Showdown brought to you by the American Physical Society Events Committee';
export const SITE_DESCRIPTION = 'An interactive online experience for Oktoberfest 2024';
export const DATE = '24 October 2024';
export const SHORT_DATE = 'Oct 24 - 1:00pm ET';
export const FULL_DATE = 'Oct 24th 1:00pm Eastern Time (GMT-5)';
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
    name: 'Live Chat',
    route: '/stage/a',
  },
  {
    name: 'Schedule',
    route: '/schedule',
  },
  {
    name: 'Contestants',
    route: '/speakers',
  },
  {
    name: 'Tournament',
    route: '/expo',
  },
];

export type TicketGenerationState = 'default' | 'loading';
