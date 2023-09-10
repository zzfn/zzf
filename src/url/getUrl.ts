
function createURLMap<K extends string, V>(entries: [K, V][]) {
  return new Map(entries);
}

const urlMap = createURLMap([['postList', '/v1/post/list']]);

// 类型推导的结果
type URLMapKeys = typeof urlMap extends Map<infer K, any> ? K : never;

export function getURLByName(urlName: URLMapKeys) {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${urlMap.get(urlName)}`;
}
