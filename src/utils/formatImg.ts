export function formatImg(url: string, weight: number, height?: number): string {
  return encodeURI(
    `${url}?imageView2/5/w/${weight}/h/${height ?? weight}/format/webp/interlace/1/q/75`,
  );
}
