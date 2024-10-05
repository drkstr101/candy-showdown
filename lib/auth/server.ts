'use server';

import { getAuthTypes } from '@lib/auth/settings';
import getURL from '@lib/helpers/get-url';
import { createClient } from '@lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getErrorRedirect, getStatusRedirect, isValidEmail } from './helpers';

export async function redirectToPath(path: string) {
  return redirect(path);
}

export async function signOut(formData?: FormData) {
  const pathName = String(formData?.get('pathName') ?? '/').trim();
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return getErrorRedirect(
      pathName,
      'Hmm... Something went wrong.',
      'You could not be signed out.'
    );
  }

  return '/';
}

export async function signInWithEmail(formData: FormData) {
  const cookieStore = cookies();
  const callbackURL = getURL('/auth/callback');

  const email = String(formData.get('email')).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect('/', 'Invalid email address.', 'Please try again.');
  }

  const supabase = createClient();
  const options = {
    emailRedirectTo: callbackURL,
    shouldCreateUser: true,
  };

  // If allowPassword is false, do not create a new user
  const { allowPassword } = getAuthTypes();
  if (allowPassword) options.shouldCreateUser = false;
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: options,
  });

  if (error) {
    redirectPath = getErrorRedirect('/', 'You could not be signed in.', error.message);
  } else if (data) {
    cookieStore.set('preferredSignInView', 'email_signin', { path: '/' });
    redirectPath = getStatusRedirect(
      '/lobby',
      'Success!',
      'Please check your email for a magic link. You may now close this tab.',
      true
    );
  } else {
    redirectPath = getErrorRedirect(
      '/',
      'Hmm... Something went wrong.',
      'You could not be signed in.'
    );
  }

  return redirectPath;
}

export async function signUp(formData: FormData) {
  const callbackURL = getURL('/auth/callback');

  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect('/', 'Invalid email address.', 'Please try again.');
  }

  const supabase = createClient();
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: callbackURL,
    },
  });

  if (error) {
    redirectPath = getErrorRedirect('/', 'Sign up failed.', error.message);
  } else if (data.session) {
    redirectPath = getStatusRedirect('/', 'Success!', 'You are now signed in.');
  } else if (data.user && data.user.identities && data.user.identities.length == 0) {
    redirectPath = getErrorRedirect(
      '/',
      'Sign up failed.',
      'There is already an account associated with this email address. Try resetting your password.'
    );
  } else if (data.user) {
    redirectPath = getStatusRedirect(
      '/',
      'Success!',
      'Please check your email for a confirmation link. You may now close this tab.'
    );
  } else {
    redirectPath = getErrorRedirect(
      '/',
      'Hmm... Something went wrong.',
      'You could not be signed up.'
    );
  }

  return redirectPath;
}

export async function updateEmail(formData: FormData) {
  // Get form data
  const newEmail = String(formData.get('newEmail')).trim();

  // Check that the email is valid
  if (!isValidEmail(newEmail)) {
    return getErrorRedirect(
      '/lobby',
      'Your email could not be updated.',
      'Invalid email address.'
    );
  }

  const supabase = createClient();

  const callbackUrl = getURL(getStatusRedirect('/', 'Success!', `Your email has been updated.`));

  const { error } = await supabase.auth.updateUser(
    { email: newEmail },
    { emailRedirectTo: callbackUrl }
  );

  if (error) {
    return getErrorRedirect('/lobby', 'Your email could not be updated.', error.message);
  } else {
    return getStatusRedirect(
      '/lobby',
      'Confirmation emails sent.',
      `You will need to confirm the update by clicking the links sent to both the old and new email addresses.`
    );
  }
}

export async function updateName(formData: FormData) {
  // Get form data
  const fullName = String(formData.get('fullName')).trim();

  const supabase = createClient();
  const { error, data } = await supabase.auth.updateUser({
    data: { full_name: fullName },
  });

  if (error) {
    return getErrorRedirect('/lobby', 'Your name could not be updated.', error.message);
  } else if (data.user) {
    return getStatusRedirect('/lobby', 'Success!', 'Your name has been updated.');
  } else {
    return getErrorRedirect(
      '/lobby',
      'Hmm... Something went wrong.',
      'Your name could not be updated.'
    );
  }
}
