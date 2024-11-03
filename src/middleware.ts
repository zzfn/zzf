import { NextRequest, NextResponse } from 'next/server';

import { geolocation, ipAddress } from '@vercel/functions';

export function middleware(request: NextRequest) {
  console.log(geolocation(request), ipAddress(request));
}
