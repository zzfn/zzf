// models/api.ts

type FetchOptions = {
  endpoint: string;
  queryParams?: Record<string, string | number>;
  fetchParams?: RequestInit & { tags?: Array<string> };
};

async function fetchData<T>({
  endpoint,
  queryParams = {},
  fetchParams = {},
}: FetchOptions): Promise<T> {
  const url = new URL(endpoint, process.env.NEXT_PUBLIC_V1_URL);

  // 添加查询参数到URL
  for (const [key, value] of Object.entries(queryParams)) {
    url.searchParams.set(key, value.toString());
  }

  const res = await fetch(url.toString(), fetchParams);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  const { data } = await res.json();
  return data;
}

export { fetchData };
