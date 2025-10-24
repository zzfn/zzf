export type FetchConfig = {
  endpoint: string;
  queryParams?: Record<string, string | number | boolean>;
  fetchParams?: RequestInit & {
    next?: {
      revalidate?: false | 0 | number;
      tags?: Array<string>;
    };
  };
};

export async function fetchData<TResponse>({
  endpoint,
  queryParams = {},
  fetchParams = {},
}: FetchConfig): Promise<TResponse> {
  const url = new URL(endpoint, process.env.NEXT_PUBLIC_BASE_URL);

  for (const [key, value] of Object.entries(queryParams)) {
    url.searchParams.set(key, String(value));
  }

  const res = await fetch(url.toString(), fetchParams);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  const { data } = (await res.json()) as Res<TResponse>;
  return data;
}
