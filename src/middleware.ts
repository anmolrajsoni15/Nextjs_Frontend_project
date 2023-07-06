import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'



export function middleware(request: NextRequest) {
  
  const blocId = request.cookies.get('blocId')

    if (request.nextUrl.pathname.endsWith('/') && request.cookies.get('user')) {
      return NextResponse.redirect(new URL('/new/dashboard',request.url))
    }
    

    // if(request.cookies.get('user') && request.nextUrl.pathname.startsWith(`/bloc`) && !request.nextUrl.pathname.startsWith(`/bloc/${blocId}`)){
    //   return NextResponse.redirect(new URL('/about',request.url))
    // }

  
}

