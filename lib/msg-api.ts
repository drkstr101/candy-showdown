import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';

import { Database } from './supabase/database.types';

export const getChannels = cache(async (supabase: SupabaseClient<Database>) => {
  const { data, error } = await supabase
    .from('channels')
    .select('*, messages(*)')
    .order('metadata->index')
    .order('unit_amount', { referencedTable: 'messages' });
  if (error) throw error;

  return data;
});
