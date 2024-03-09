"use server"

import bcrypt from 'bcrypt'
import { z } from 'zod';

import { LoginSchema } from '@/schemas'
import db from '@/DB/db';
import { LogDone, LogError, LogNote } from './Logger';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

type userLoginProps = {

} & z.infer<typeof LoginSchema>

/**
 * @note 닉네임 로그인 요청
 * @param props
 * @returns
 * @try 로그인 시도
 * @error
 * CredentialsSignin : 로그인 정보가 일치하지 않습니다\
 * default : error.message
 */
async function userLogin(props: userLoginProps) {
	const validatedFieds = LoginSchema.safeParse(props);
	LogNote("로그인 요청 : ", props.nickname)
	if (!validatedFieds.success || !db)
		return (LogError("로그인 요청 : ", props.nickname), { error: "Invalid fields!" });
	const { nickname } = validatedFieds.data;
	const findNickname = await db.userState.findUnique({ where: { nickname } , include:{user: true}})
	if (!findNickname)
		return (LogError("닉네임 없음 : ", nickname), { error: "닉네임을 확인해 주세요." });
	if (findNickname.user.length < 1)
		return (LogError("닉네임 없음 : ", nickname), { error: "유저가 삭제되었습니다." });
	try {
		await signIn("credentials", { nickname, redirectTo: DEFAULT_LOGIN_REDIRECT })
	}
	catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: error.message }
				default:
					return { error: error.message };
			}
		}
		throw error;
	}
	LogDone("로그인 완료 : ", nickname)
	return { success: "Login success" };
}

export default userLogin
