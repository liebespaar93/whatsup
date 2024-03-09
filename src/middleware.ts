import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_NEW_VERIFICATION_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";
import { LogDone, LogNote } from "./lib/server/Logger";

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
	const { nextUrl } = req
	const isLoggedIn = req.auth

	// LogDone("요청 주소 : '", req.nextUrl.pathname, "\'")
	// LogNote("로그인 상태 [", req.auth ? "✅" : "❌", "]")

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
	const isAuthRoute = authRoutes.includes(nextUrl.pathname)
	if (isApiAuthRoute || isPublicRoute)
		return;

	if (isAuthRoute) {
		if (isLoggedIn)
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
		return;
	}
	if (!isLoggedIn) {
		let callbackUrl = nextUrl.pathname;
		if (nextUrl.search) {
			callbackUrl += nextUrl.search;
		}
		const encodedCallbackUrl = encodeURIComponent(callbackUrl);
		return Response.redirect(new URL(
			`/auth/login?callbackUrl=${encodedCallbackUrl}`,
			nextUrl
		));
	}
	return;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
	// matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
	// matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
