import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { authConfig } from "@/auth.config";
import { LogError, LogNote } from "@/lib/server/Logger";
import db from "@/DB/db";
import { getUserIncUserState } from "./DB/user";

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
	adapter: PrismaAdapter(db),
	session: {
		strategy: "jwt",
		// day * hour * minute * second 세션 만료 시간
		maxAge: 1 * 1 * 60 * 60,
	},
	jwt: {
		// day * hour * minute * second
		maxAge: 1 * 24 * 60 * 60,
	},
	pages: {
		signIn: '/auth/login',
		error: '/auth/error'
	},
	cookies: {

	},
	events: {
		linkAccount: async (param) => {
			LogNote("linkAccount", param)
			await db.user.update({
				where: { id: param.user.id },
				data: { emailVerified: new Date() }
			})
		},
	},
	callbacks: {
		signIn: async ({ account, user, credentials, email, profile }) => {
			LogNote("signIn", user.id, "'")
			return true
		},
		jwt: async ({ token, account, profile }) => {
			LogNote(token.picture, token.iat, token.exp, token.jti, account, profile, "jwt")
			if (!token.sub) return token;
			await db.user.findUnique({
				where: { id: token.sub }
			}).then(((value) => {
				if (!value)
					return;
				token.nickname = value.nickname
			})).catch((error) => {
				LogError(error);
				return;
			})
			if (account) {
				token.accessToken = account.access_token
				token.id = profile?.id
			}
			return token
		},
		session: async ({ session, token }) => {
			LogNote(session.expires, session.sessionToken, token.jti, "session")
			if (session?.user) {
				session.user.id = token.sub!;
				session.user.nickname = token.nickname as string;
			}
			if (!session.user.userState) {
				await getUserIncUserState({ id: session.user.id }, "auth")
					.then((value) => {
						if (value?.nickname)
							session.user.userState = value!.userState
					}).catch((error) => {
						LogError("getUserIncUserState",error)
					})
			}
			session.sessionToken = token.accessToken as string;

			return session;
		},
	},
	...authConfig
})
