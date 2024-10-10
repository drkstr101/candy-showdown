import { createServerClient, serializeCookieHeader } from '@supabase/ssr';
import { type NextApiRequest, type NextApiResponse } from 'next';

import type { Database } from './database.types';
import { auth, supabaseAnonKey, supabaseUrl } from './options';

export const createClient = (req: NextApiRequest, res: NextApiResponse) =>
  createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth,
    cookies: {
      getAll() {
        return Object.keys(req.cookies).map((name) => ({
          name,
          value: req.cookies[name] || '',
        }));
      },
      setAll(cookiesToSet) {
        res.setHeader(
          'Set-Cookie',
          cookiesToSet.map(({ name, value, options }) =>
            serializeCookieHeader(name, value, options)
          )
        );
      },
    },
  });
