import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { fetchData } from '../../../models/api';

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
  url.searchParams.append('client_id', process.env.GITHUB_CLIENT_ID as string);
  url.searchParams.append('client_secret', process.env.GITHUB_CLIENT_SECRET as string);
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
  (await cookies()).set('username', json.login);
  (await cookies()).set('avatar_url', json.avatar_url);
  const res = await fetchData<any>({
    endpoint: '/v1/app-users/github/login',
    fetchParams: {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: json.login,
        avatar_url: json.avatar_url,
        nickname: json.name,
      }),
    },
  });
  return redirect('/');
}
