import isValidEmail from '@lib/helpers/is-valid-email';
import { createClient } from '@lib/supabase/api';
import { NextApiRequest, NextApiResponse } from 'next';

type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

type SignInResponse = {
  user: null;
  session: null;
  messageId?: string | null;
};

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<SignInResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to POST',
      },
    });
  }

  const email: string = ((req.body.email as string) || '').trim().toLowerCase();
  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: {
        code: 'bad_email',
        message: 'Invalid email',
      },
    });
  }

  const supabase = createClient(req, res);

  const { data, error } = await supabase.auth.signInWithOtp({ email });
  if (error) {
    console.error(error);
    const { code, message } = error;
    return res.status(500).json({ error: { code: code ?? 'auth_error', message } });
  }

  return res.status(200).json(data);
}
