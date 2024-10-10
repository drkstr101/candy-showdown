import { createBrowserClient } from '@supabase/ssr';

import { Database } from './database.types';
import { auth, supabaseAnonKey, supabaseUrl } from './options';

// Define a function to create a Supabase client for client-side operations
export const createClient = () =>
  createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, { auth });
