import { COOKIE } from '@lib/constants';
import { getTicketNumberByUserId } from '@lib/db-api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const id = req.cookies[COOKIE];
  if (!id) {
    return res.status(401).json({
      error: {
        code: 'missing_cookie',
        message: 'Missing cookie',
      },
    });
  }

  const ticketNumberString = await getTicketNumberByUserId(id);

  if (!ticketNumberString) {
    return res.status(401).json({
      error: {
        code: 'not_registered',
        message: 'This user is not registered',
      },
    });
  }

  return res.status(200).json({ loggedIn: true });
}
