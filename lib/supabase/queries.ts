import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';
import { Database } from './database.types';

export const getUser = cache(async (supabase: SupabaseClient<Database>) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export const getChannels = cache(async (supabase: SupabaseClient<Database>) => {
  const { data: channels, error } = await supabase
    .from('channels')
    .select('*, messages(*)')
    .order('metadata->index')
    .order('unit_amount', { referencedTable: 'messages' });

  return channels;
});

export const getUserDetails = cache(async (supabase: SupabaseClient<Database>) => {
  const { data: userDetails } = await supabase.from('users').select('*').single();
  return userDetails;
});