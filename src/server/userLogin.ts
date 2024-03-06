"use server"

import bcrypt from 'bcrypt'
import { z } from 'zod';

import { LoginSchema } from '@/schemas'
import db from '@/utils/db';
import { LogDone, LogError, LogNote } from './Logger';

type userLoginProps = {

} & z.infer<typeof LoginSchema>

async function userLogin(props: userLoginProps) {
	const validatedFieds = LoginSchema.safeParse(props);
	LogNote("아이디 로그인 요청 : ", props.nickname)
	if (!validatedFieds.success || !db)
		return (LogError("로그인 요청 : ", props.nickname), { error: "Invalid fields!" });
	const { nickname, password } = props;
	const findNickname = await db.userState.findUnique({
		where: { nickname }
	})
	if (!findNickname)
		return (LogError("닉네임 없음 : ", nickname), { error: "닉네임을 확인해 주세요." });
	if (!bcrypt.compareSync(password, findNickname.password))
		return (LogError("비밀번호 불일치 : ", nickname), { error: "비밀번호가 일치하지 않습니다." });
	LogDone("로그인 완료 : ", nickname)
	return { success: "Login success" };
}

export default userLogin
