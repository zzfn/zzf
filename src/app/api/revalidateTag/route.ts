import { NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  const { tag, secret } = await request.json();
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 });
  }
  if (Array.isArray(tag)) {
    tag.forEach(revalidateTag);
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  });
}
