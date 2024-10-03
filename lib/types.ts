export type Image = {
  url: string;
  blurDataURL?: string;
};

export type Participant = {
  name: string;
  bio: string;
  slug: string;
  title: string;
  company: string;
  image: Image;
  imageSquare: Image;
  match: Match;
};

export type Stage = {
  name: string;
  slug: string;
  // stream: string;
  // discord: string;
  schedule: Match[];
  isLive: boolean;
  channelId: string;
  stagePeers: string[];
  backstagePeers: string[];
};

export type Match = {
  title: string;
  description: string;
  start: string;
  end: string;
  participant: Participant[];
};

export type Link = {
  url: string;
};

export type Sponsor = {
  name: string;
  description: string;
  slug: string;
  website: string;
  callToAction: string;
  callToActionLink: string;
  links: SponsorLink[];
  discord: string;
  tier: string;
  cardImage: Image;
  logo: Image;
  youtubeSlug: string;
};

export type SponsorLink = {
  text: string;
  url: string;
};

export type Job = {
  id: string;
  companyName: string;
  title: string;
  description: string;
  discord: string;
  link: string;
  rank: number;
};

export type ConfUser = {
  id?: string;
  email?: string;
  ticketNumber?: number | null;
  name?: string | null;
  username?: string | null;
  createdAt?: number | null;
};

export type GitHubOAuthData =
  | {
      type: 'token';
      token: string;
    }
  | {
      type: 'user';
      name: string;
      login: string;
    };
