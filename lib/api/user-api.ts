import { AppUser } from '@lib/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../supabase/database.types';

export class UserApi {
  constructor(private supabase: SupabaseClient<Database, 'public'>) {}

  async getPrincipal() {
    return await this.supabase.auth.getUser();
  }

  async signIn(email: string) {
    const options = { emailRedirectTo: '/', shouldCreateUser: true };
    return await this.supabase.auth.signInWithOtp({ email, options });
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

  async fetchUserById(id: string): Promise<AppUser | null> {
    return (await this.supabase.from('users').select('*').eq('id', id).single()).data;
  }
}
