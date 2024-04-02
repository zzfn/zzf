import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

type GithubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company?: any;
  blog: string;
  location: string;
  email?: any;
  hireable?: any;
  bio?: any;
  twitter_username?: any;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = new URL('https://github.com/login/oauth/access_token');
  url.searchParams.append('client_id', '966d19ff92ce135eeea3');
  url.searchParams.append('client_secret', '92d89431aefc000637c63d1b6bf0d801bca11d0f');
  url.searchParams.append('code', request.nextUrl.searchParams.get('code') as string);
  const response = await fetch(url.href, {
    method: 'post',
    headers: {
      Accept: 'application/json',
    },
  });
  const { access_token, token_type } = await response.json();
  const response1 = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
  });
  const json: GithubUser = await response1.json();
  cookies().set('username', json.login);
  cookies().set('avatar_url', json.avatar_url);
  return redirect('/');
}
