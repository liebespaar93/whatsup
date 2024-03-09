import { UserState, User } from "@prisma/client";

import { DefaultSession } from "next-auth";

export type CustomUser = ( { userState: UserState | null; } & User & DefaultSession["user"]) | null;

/**
 * @note Session에 원하는 타입 설정하기
 */
declare module "next-auth" {
	interface Session {
		user: CustomUser
	}
}
