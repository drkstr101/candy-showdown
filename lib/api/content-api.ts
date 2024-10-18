import { Participant, Round } from '@lib/types';

const API_URL = 'https://graphql.datocms.com/';
const API_TOKEN = process.env.DATOCMS_READ_ONLY_API_TOKEN;

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

export async function getAllParticipants(): Promise<Participant[]> {
  const { allParticipants } = await fetchContent(`
     {
       allParticipants(first: 100) {
         id
         name
         bio
         title
         slug
         company
         match {
           title
         }
         image {
           url(imgixParams: {fm: jpg, fit: crop, w: 300, h: 400})
           blurDataURL: blurUpThumb
         }
         imageSquare: image {
           url(imgixParams: {fm: jpg, fit: crop, w: 192, h: 192})
           blurDataURL: blurUpThumb
         }
       }
     }
   `);

  return allParticipants;
}

export async function getAllRounds(): Promise<Round[]> {
  const { allRounds } = await fetchContent(`
     {
       allRounds(first: 100, orderBy: order_ASC) {
         name
         slug
         isLive
         schedule {
           title
           start
           end
           participant {
             name
             slug
             image {
               url(imgixParams: {fm: jpg, fit: crop, w: 120, h: 120})
               blurDataURL: blurUpThumb
             }
           }
         }
       }
     }
   `);

  return allRounds;
}

// export async function getAllSponsors(): Promise<Sponsor[]> {
//   const { allCompanies } = await fetchContent(`
//      {
//        allCompanies(first: 100, orderBy: tierRank_ASC) {
//          name
//          description
//          slug
//          website
//          callToAction
//          callToActionLink
//          discord
//          youtubeSlug
//          tier
//          links {
//            url
//            text
//          }
//          cardImage {
//            url(imgixParams: {fm: jpg, fit: crop})
//          }
//          logo {
//            url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100})
//          }
//        }
//      }
//    `);

//   return allCompanies;
// }

// export async function getAllJobs(): Promise<Job[]> {
//   const { allJobs } = await fetchContent(`
//      {
//        allJobs(first: 100, orderBy: rank_ASC) {
//          id
//          companyName
//          title
//          description
//          discord
//          link
//          rank
//        }
//      }
//    `);

//   return allJobs;
// }
