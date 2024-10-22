import { Enums } from '@lib/supabase/database.types';
import type { User } from '@supabase/supabase-js';

export type AuthUser = User;

export type AppRole = Enums<'app_role'>;
export type UserStatus = Enums<'user_status'>;

export type AsyncStatus = 'error' | 'loading' | 'ready';

export interface AppUser {
  id: string;
  username: string;
  status: UserStatus;
  selection: string;
}

export type Image = {
  url: string;
  blurDataURL?: string;
};

export type Participant = {
  id: string;
  name: string;
  bio: string;
  slug: string;
  title: string;
  company: string;
  image: Image;
  imageSquare: Image;
  // match: Match;
};

export type Round = {
  id: string;
  name: string;
  slug: string;
  schedule: Match[];
  start: string;
  end: string;

  // isLive: boolean;
  // channelId: string;
  // roundPeers: string[];
  // backroundPeers: string[];
};

export type Match = {
  id: string;
  title: string;
  description: string;
  participants: Participant[];
  nextMatch: Match | null;
};

// export type Link = {
//   url: string;
// };

// export type Sponsor = {
//   name: string;
//   description: string;
//   slug: string;
//   website: string;
//   callToAction: string;
//   callToActionLink: string;
//   links: SponsorLink[];
//   discord: string;
//   tier: string;
//   cardImage: Image;
//   logo: Image;
//   youtubeSlug: string;
// };

// export type SponsorLink = {
//   text: string;
//   url: string;
// };

// export type Job = {
//   id: string;
//   companyName: string;
//   title: string;
//   description: string;
//   discord: string;
//   link: string;
//   rank: number;
// };
