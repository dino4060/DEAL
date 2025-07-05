import { NextRequest, NextResponse } from 'next/server';
import { getIsAuthenticated } from './functions/getIsAuthenticated';

// 1. Specify public routes
const publicAuthRoutes = ['/auth', '/auth/google']
const publicStaticRoutes = ['/', '/search', ...publicAuthRoutes]
const publicDynamicPrefixes = ['/product/']
const explicitlyPrivateRoutes = ['/product/test'];

// isPublicStatic: oke, ko cần check dynamic route
// !isPublicStatic: !isPublicDynamic: oke, ko cần check isExplicitlyPrivate
// !isPublicStatic: isPublicDynamic: rủi ro, cần check isExplicitlyPrivate
function isPublicRoute(path: string): boolean {
  const isPublicStatic = publicStaticRoutes.includes(path);
  if (isPublicStatic) return true;

  const isPublicDynamic = publicDynamicPrefixes.some(prefix => path.startsWith(prefix));
  if (!isPublicDynamic) return false;

  const isExplicitlyPrivate = explicitlyPrivateRoutes.includes(path);
  return !isExplicitlyPrivate;
}

function isAfterAuth(path: string, isAuthenticated: boolean): boolean {
  const isPublicAuth = publicAuthRoutes.includes(path);
  return isPublicAuth && isAuthenticated;
}

export default async function middleware(request: NextRequest) {
  // 2. If after auth, go auth, will redirect to the home page
  const path = request.nextUrl.pathname
  const isAuthenticated = await getIsAuthenticated()

  if (isAfterAuth(path, isAuthenticated)) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // 3. If no auth, go private, will redirect to the auth page
  const isPublic = isPublicRoute(path);
  if (!isPublic && !isAuthenticated) {
    console.warn(`>>> Middleware: path ${path}: isPublic ${isPublic} `);
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // 4. Pass
  // Case 1: isPublic => pass
  // Case 2: !isPublic + isAuthenticated => pass
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - files.svg (public files)
     * - public/ file svg and jpg
     * - public/ images/
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.svg$|.*\\.jpg$|images).*)',
  ],
}
