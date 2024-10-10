import postData from './helpers/post-data';

export async function register(email: string, token?: string) {
  return await postData('/api/register', { email, token });
}

// export const getUser = cache(async (supabase: SupabaseClient<Database, 'public'>) => {
//   const { data, error } = await supabase.auth.getUser();
//   if (error) throw error;

//   return data;
// });

// export const getUserDetails = cache(async (supabase: SupabaseClient<Database>) => {
//   const { data, error } = await supabase.from('users').select('*').single();
//   if (error) throw error;

//   return data;
// });

// export async function saveAuthToken({ id, token }: { id?: string; token: string }) {
//   return await postData('/api/save-auth-token', { id, token });
// }

// export function emailToId(email: string) {
//   if (process.env.EMAIL_TO_ID_SECRET) {
//     const hmac = crypto.createHmac('sha1', process.env.EMAIL_TO_ID_SECRET);
//     hmac.update(email);
//     const result = hmac.digest('hex');
//     return result;
//   } else {
//     throw new Error('EMAIL_TO_ID_SECRET is missing');
//   }
// }
