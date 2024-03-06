"use server"

import bcrypt from 'bcrypt'
import { z } from 'zod';

import { LoginSchema } from '@/schemas'
import db from '@/utils/db';
import { LogDone, LogError, LogNote } from './Logger';

type userRegistProps = {

} & z.infer<typeof LoginSchema>

async function userRegist(props: userRegistProps) {
	const validatedFieds = LoginSchema.safeParse(props);
	LogNote("아이디 생성 요청 : ", props.nickname)
	if (!validatedFieds.success || !db)
		return (LogError("아이디 생성 : ", props.nickname), { error: "Invalid fields!" });
	const { nickname, password } = props;
	const hashedPassword = await bcrypt.hash(password, 10)
	const findNickname = await db.userState.findUnique({
		where: { nickname }
	})
	if (findNickname)
		return (LogError("중복 닉네임 : ", nickname), { error: "이미 사용된 닉네임 입니다." });
	await db.userState.create({
		data: {
			nickname: nickname,
			password: hashedPassword
		}
	});
	LogDone("아이디 생성 완료 : ", nickname)
	return { success: "생성이 완료되었습니다." };
}

export default userRegist
