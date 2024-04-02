import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log(3333333);
  console.log(request.geo, request.ip);
}
