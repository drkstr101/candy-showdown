import { getAllRounds } from '@lib/api/content-api';
import ms from 'ms';
import { NextApiRequest, NextApiResponse } from 'next';

// Number of seconds to cache the API response for
const EXPIRES_SECONDS = 5;

export default async function getRounds(_: NextApiRequest, res: NextApiResponse) {
  try {
    const allRounds = await getAllRounds();

    // Set caching headers
    const expires = new Date(Date.now() + ms(`${EXPIRES_SECONDS}s`));
    res.setHeader('Expires', expires.toUTCString());
    res.setHeader(
      'Cache-Control',
      `s-maxage=${EXPIRES_SECONDS}, immutable, must-revalidate, stale-while-revalidate`
    );

    return res.status(200).json(allRounds);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: {
        code: 'server_error',
        message: 'Internal server error',
      },
    });
  }
}
