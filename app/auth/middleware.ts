import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);

  // PROTECT ADMIN ROUTES
  // If the path starts with /admin and there's no user, redirect to login
  if (request.nextUrl.pathname.startsWith('/admin') && !user) {
    return Response.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files and images
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};