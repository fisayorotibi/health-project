/**
 * File: middleware.ts
 * Created: [Current Date]
 * Changes: Initial creation - Middleware for API route authentication
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Only apply to /api routes (except auth routes)
  if (
    !request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.startsWith('/api/auth/')
  ) {
    return NextResponse.next();
  }

  // Check for token in Authorization header
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse(
      JSON.stringify({ error: 'Authentication required' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
  }

  // Extract and verify token
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid or expired token' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
  }

  // Add user ID to request headers for use in API routes
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', decoded.userId);

  // Return modified request
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Configure which paths the middleware applies to
export const config = {
  matcher: '/api/:path*',
}; 