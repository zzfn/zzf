import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  const { tag, secret } = await request.json();
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }
  if (Array.isArray(tag)) {
    tag.forEach(revalidateTag);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  });
}
