import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoute, apiAuthPrefix } from "@/routes";

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  // const isLoggedIn = !!req.auth
  // console.log("ROUTE: ",req.nextUrl.pathname);
  // console.log("IS LOGGED IN: ",isLoggedIn);
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoute.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return null
  }

  if(isAuthRoute) {
    if(isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl))
  }

  return null

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    // THIS MATCHER IS USED FROM CLERK DOCUMENTATION.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}