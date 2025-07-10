import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  // Attach the current full path (with query) to a custom header
  const fullPath = request.nextUrl.pathname + request.nextUrl.search;
  response.headers.set('x-pathname', fullPath);
  return response;
}