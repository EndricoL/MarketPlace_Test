import { NextResponse } from 'next/server'

export function middleware(req) {
  const { pathname, origin } = req.nextUrl
  const token = req.cookies.get('auth_token')?.value
  const role = req.cookies.get('role')?.value

  // Kalau belum login dan mau akses halaman protected → redirect login
  if (!token && (pathname.startsWith('/admin') || pathname.startsWith('/seller') || pathname.startsWith('/buyer'))) {
    return NextResponse.redirect(`${origin}/login`)
  }

  // Cek role-based access
  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(`${origin}/${role || ''}`)
  }
  if (pathname.startsWith('/seller') && role !== 'seller') {
    return NextResponse.redirect(`${origin}/${role || ''}`)
  }
  if (pathname.startsWith('/buyer') && role !== 'buyer') {
    return NextResponse.redirect(`${origin}/${role || ''}`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/seller/:path*',
    '/buyer/:path*'
  ]
}
