import getURL from '@lib/helpers/get-url';
import { createClient } from '@lib/supabase/api';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * The `/auth/callback` route is required for the server-side auth flow implemented
 * by the SSR package. It exchanges an auth code for the user's session.
 * https://supabase.com/docs/guides/auth/server-side/nextjs
 *
 * @param req
 * @param res
 * @returns
 */
export default async function saveAuthToken(req: NextApiRequest, res: NextApiResponse) {
  // const requestUrl = new URL(getURL(req.url));
  // const code = requestUrl.searchParams.get('code');
  // const redirectTo = requestUrl.searchParams.get('redirect_to')?.toString();
  // const origin = requestUrl.origin;

  const code = req.query['code']?.toString();
  const redirectTo = req.query['redirect_to']?.toString();

  if (code) {
    const supabase = createClient(req, res);
    await supabase.auth.exchangeCodeForSession(code);
    return res.redirect(getURL(redirectTo));
  } else {
    return res.status(400).json({
      error: {
        code: 'bad_input',
        message: 'Authorization code required.',
      },
    });
  }
}
