import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  
  const blocId = request.cookies.get('blocId')

    if (request.nextUrl.pathname.endsWith('/') && request.cookies.get('user') && request.cookies.get('jwt')) {
      return NextResponse.redirect(new URL('/new/dashboard',request.url))
    }
}

