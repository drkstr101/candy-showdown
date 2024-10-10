import { createServerClient, serializeCookieHeader } from '@supabase/ssr';
import { GetServerSidePropsContext } from 'next';

import { Database } from './database.types';

// Define a function to create a Supabase client for server-side operations
// The function takes a cookie store created with next response cookies as an argument
export const createClient = ({ req, res }: GetServerSidePropsContext) =>
  createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    }
  );
