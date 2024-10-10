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
  const requestUrl = new URL(req.url ?? '');
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get('redirect_to')?.toString() ?? '/lobby';

  if (code) {
    const supabase = createClient(req, res);
    await supabase.auth.exchangeCodeForSession(code);
    return res.redirect(`${origin}${redirectTo}`);
  } else {
    return res.status(400).json({
      error: {
        code: 'bad_input',
        message: 'Authorization code required.',
      },
    });
  }
}
