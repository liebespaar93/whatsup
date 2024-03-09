import { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'

import { LoginSchema } from "./schemas";
import { getUserStateByNickname } from "./DB/user";
import { LogNote } from "./lib/server/Logger";

/**
 * @note 닉네임을 이용한 로그인 입니다.
 * @param
 * ( nickname: string, password: string )
 *
 * @returns (User | null)
 */
export const authConfig: NextAuthConfig = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					// access_type: "offline",
					response_type: "code"
				}
			},
			account: (token) =>{
			// LogNote(token)
			// 	access_token: 'ya29.a0Ad52N39HwO_gMj5T41bSCk82pZLO3-VY-89dMpFMr7aPXDBkqNKw6yE66ZJdevw8Kcg-d8Mxl0hwTF2z5WftcJCKjJteRlFmirI9_0uC0Wg1BK_OR74ru_KanIuUe1YF4gv8eoWS98DP408_2kvlEVGQJ0hy86F7aHAaCgYKARkSARMSFQHGX2MijF70MPG3MjbQ8-6wRUvRcg0170',
			// 	expires_in: 3599, 생성일
			// 	scope: 'https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email',
			// 	token_type: 'bearer',
			// 	id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjA5YmNmODAyOGUwNjUzN2Q0ZDNhZTRkODRmNWM1YmFiY2YyYzBmMGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDIyMjk5NzEwMDY1LXZkY2VraHRoYXRrOTJlb2lzY2JrNHY2ZHZ0NzkzNG4yLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTAyMjI5OTcxMDA2NS12ZGNla2h0aGF0azkyZW9pc2NiazR2NmR2dDc5MzRuMi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNzcwNzU5NjM3NjcxNDk1MzA0NiIsImVtYWlsIjoibmFuZ21hdW5jb2RlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoicExwWDBSV0pVNkxjSjZNclFxN2IzQSIsIm5hbWUiOiLsnbTqsr3qt7wiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSVdWOEVtYkJVR3VENTFvWHowd09sUWIxSUtEaEQ0aXN4Tzhvenl5UnNOPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Iuqyveq3vCIsImZhbWlseV9uYW1lIjoi7J20IiwibG9jYWxlIjoia28iLCJpYXQiOjE3MTA1NDg4MzEsImV4cCI6MTcxMDU1MjQzMX0.dZUDHAHC0QtVBG_Hx68bMGlK_85aS3uQkz6nTV6pYYav8wnWc9O2YwdatD55GkzXb_t84uXV1WyNavsHq0yUzTlKpQRiHCQZwdBsF7_u_ATFoYgutrcqq8WNiWRpHQQ872yeSQ9Fh6iOjqzGipCeVMiJwr9qdt1PsPWXadnHxPhx1cdJ-HF9wxn9KgkekYsTeNiFERA1fG3s2Y3WBqSdfZhQdN5LdOJDD-7CzR0pxG6h4UYQhtdlGdArNCwf9fO-B_4sIkeymlvwuAnna3ZQ5hkPwuIAIJn2lzvgHJkCovKNacIyZm3SpCu5ZYpvFux2s5q5lTjEG_hMfI39LChftg',
			// 	expires_at: 1710552430 만료일
			},

		}),
		Credentials({
			name: "nickname sign in",
			credentials: {
				nickname: { label: "nickname", type: "text" }
			},
			authorize: async (credentials, req) => {
				const velidateFields = LoginSchema.safeParse(credentials);
				LogNote(credentials.nickname)
				if (!velidateFields.success)
					return null;
				const { nickname } = velidateFields.data;
				const userState = await getUserStateByNickname(nickname)
				if (!userState || userState.user.length < 1)
					return null;
				return userState.user[0];
			}
		}),
	], // Add providers with an empty array for now
} satisfies NextAuthConfig;
