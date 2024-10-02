/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ConfUser } from '@lib/types';
import { createClient } from '@supabase/supabase-js';

const supabase =
  process.env.SUPABASE_URL &&
  process.env.SUPABASE_SERVICE_ROLE_SECRET &&
  process.env.EMAIL_TO_ID_SECRET
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_SECRET)
    : undefined;

export async function getUserByUsername(username: string): Promise<ConfUser> {
  const { data } = await supabase!
    .from<ConfUser>('users')
    .select('name, ticketNumber')
    .eq('username', username)
    .single();

  return data ?? {};
}

export async function getUserById(id: string): Promise<ConfUser> {
  const { data, error } = await supabase!
    .from<ConfUser>('users')
    .select('name, username, createdAt')
    .eq('id', id)
    .single();
  if (error) throw new Error(error.message);

  return data ?? {};
}

export async function createUser(id: string, email: string): Promise<ConfUser> {
  const { data, error } = await supabase!.from<ConfUser>('users').insert({ id, email }).single();
  if (error) throw new Error(error.message);

  return data ?? {};
}

export async function getTicketNumberByUserId(id: string): Promise<string | null> {
  const { data } = await supabase!
    .from<ConfUser>('users')
    .select('ticketNumber')
    .eq('id', id)
    .single();

  return data?.ticketNumber!.toString() ?? null;
}

export async function createAuthUser(user: Record<string, unknown>): Promise<string> {
  const { data, error } = await supabase!.from('auth_users').insert({ userData: user }).single();
  if (error) throw new Error(error.message);

  return data.id;
}

export async function updateUserWithAuthUser(id: string, token: string): Promise<ConfUser> {
  const { data } = await supabase!.from('auth_users').select('userData').eq('id', token).single();
  const { login: username, name } = data?.userData ?? {};
  if (!username) {
    throw new Error('Invalid or expired token');
  }

  const { error } = await supabase!
    .from<ConfUser>('users')
    .update({ username, name })
    .eq('id', id)
    .single();
  if (error) console.log(error.message);

  return { username, name };
}
