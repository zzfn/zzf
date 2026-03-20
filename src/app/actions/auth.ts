'use server';

import { redirect } from 'next/navigation';

export async function signInAction() {
  redirect(new URL('/v1/app-users/discourse/login', process.env.NEXT_PUBLIC_BASE_URL).toString());
}
