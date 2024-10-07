import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for an API route
  if (request.nextUrl.pathname.startsWith('/')) {
    // Clone the request headers
    const requestHeaders = new Headers(request.headers)

    // Add CORS headers
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Max-Age', '86400')

    // Handle OPTIONS method
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers: response.headers })
    }

    return response
  }

  // For non-API routes, just proceed normally
  return NextResponse.next()
}

export const config = {
  matcher: '*',
}