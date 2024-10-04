import type { Database, Tables } from '@lib/types';
import { createClient } from '@supabase/supabase-js';

type User = Tables<'users'>;
type Channel = Tables<'channels'>;
type Message = Tables<'messages'> & { channel: Channel; user: User };

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export const upsertChannelRecord = async (channel: Channel) => {
  const channelData: Channel = {
    ...channel,
  };

  const { error: upsertError } = await supabaseAdmin.from('channels').upsert([channelData]);
  if (upsertError) throw new Error(`Channel insert/update failed: ${upsertError.message}`);
  console.log(`Channel inserted/updated: ${channel.id}`);
};

export const upsertMessageRecord = async (message: Message, retryCount = 0, maxRetries = 3) => {
  const messageData: Tables<'messages'> = {
    id: message.id,
    channel_id: message.channel.id,
    user_id: message.user.id,
    inserted_at: message.inserted_at,
    message: message.message,
  };

  const { error: upsertError } = await supabaseAdmin.from('messages').upsert([messageData]);

  if (upsertError?.message.includes('foreign key constraint')) {
    if (retryCount < maxRetries) {
      console.log(`Retry attempt ${retryCount + 1} for message ID: ${message.id}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await upsertMessageRecord(message, retryCount + 1, maxRetries);
    } else {
      throw new Error(
        `Message insert/update failed after ${maxRetries} retries: ${upsertError.message}`
      );
    }
  } else if (upsertError) {
    throw new Error(`Message insert/update failed: ${upsertError.message}`);
  } else {
    console.log(`Message inserted/updated: ${message.id}`);
  }
};

export const deleteChannelRecord = async (channel: Channel) => {
  const { error: deletionError } = await supabaseAdmin
    .from('channels')
    .delete()
    .eq('id', channel.id);
  if (deletionError) throw new Error(`Channel deletion failed: ${deletionError.message}`);
  console.log(`Channel deleted: ${channel.id}`);
};

export const deleteMessageRecord = async (message: Message) => {
  const { error: deletionError } = await supabaseAdmin
    .from('messages')
    .delete()
    .eq('id', message.id);
  if (deletionError) throw new Error(`Message deletion failed: ${deletionError.message}`);
  console.log(`Message deleted: ${message.id}`);
};

export const upsertUserRecord = async (uuid: string, email: string) => {
  const { error: upsertError } = await supabaseAdmin.from('users').upsert([{ id: uuid, email }]);

  if (upsertError)
    throw new Error(`Supabase user record creation failed: ${upsertError.message}`);

  return uuid;
};

export const createOrRetrieveUser = async ({ email, uuid }: { email: string; uuid: string }) => {
  // Check if the user already exists in Supabase
  const { data: existingSupabaseUser, error: queryError } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', uuid)
    .maybeSingle();

  if (queryError) {
    throw new Error(`Supabase user lookup failed: ${queryError.message}`);
  }
  if (existingSupabaseUser) {
    // If Supabase has a record return user ID
    return existingSupabaseUser.id;
  } else {
    console.warn(`Supabase user record was missing. A new record was created.`);

    // If Supabase has no record, create a new record and return Stripe user ID
    const upsertedUser = await upsertUserRecord(uuid, email);
    if (!upsertedUser) throw new Error('Supabase user record creation failed.');

    return upsertedUser;
  }
};
