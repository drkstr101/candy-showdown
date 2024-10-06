import { getTicketNumberByUserId, updateUserWithAuthUser } from '@lib/db-api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function saveAuthToken(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to POST',
      },
    });
  }

  const body = req.body;

  if (!body.token || !body.id) {
    return res.status(400).json({
      error: {
        code: 'bad_input',
        message: 'Invalid parameters',
      },
    });
  }

  const ticketNumber = await getTicketNumberByUserId(body.id);
  if (!ticketNumber) {
    return res
      .status(404)
      .json({ code: 'invalid_id', message: 'The registration does not exist' });
  }

  const { username, name } = await updateUserWithAuthUser(body.id, body.token);

  res.json({ username, name });
}
