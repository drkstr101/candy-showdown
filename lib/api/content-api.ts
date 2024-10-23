import { Participant, Round } from '@lib/types';

const API_URL = 'https://graphql.datocms.com/';
const API_TOKEN = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN;

async function fetchContent(
  query: string,
  { variables }: { variables?: Record<string, unknown> } = {}
) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch content');
  }

  return json.data;
}

const roundsFragment = `
  allRounds(first: 100, orderBy: order_ASC) {
    id
    name
    slug
    order
    start
    end
    schedule {
      id
      title
      participants {
        id
        name
        title
        slug
        image {
          url(imgixParams: {fm: jpg, fit: crop, w: 300, h: 400})
        }
        imageSquare: image {
          url(imgixParams: {fm: jpg, fit: crop, w: 192, h: 192})
        }
      }
      nextMatch {
        id
      }
    }
  }
`;

const participantsFragment = `
  allParticipants(first: 100) {
    id
    name
    title
    slug
    image {
      url(imgixParams: {fm: jpg, fit: crop, w: 300, h: 400})
      blurDataURL: blurUpThumb
    }
    imageSquare: image {
      url(imgixParams: {fm: jpg, fit: crop, w: 192, h: 192})
      blurDataURL: blurUpThumb
    }
  }
`;

export async function getAllParticipants(): Promise<Participant[]> {
  const { allParticipants } = await fetchContent(`{ ${participantsFragment} }`);

  return allParticipants;
}

export async function getAllRounds(): Promise<Round[]> {
  const { allRounds } = await fetchContent(`{ ${roundsFragment} }`);

  return allRounds;
}

export async function getStaticContent(): Promise<{
  participants: Participant[];
  rounds: Round[];
}> {
  const { allRounds, allParticipants } = await fetchContent(`{
    ${participantsFragment}
    ${roundsFragment}
  }`);

  return { rounds: allRounds, participants: allParticipants };
}
