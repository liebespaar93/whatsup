"use server"

import bcrypt from 'bcrypt'
import { z } from 'zod';

import { LoginSchema } from '@/schemas'
import db from '@/DB/db';
import { LogDone, LogError, LogNote } from './Logger';
import { Session } from 'next-auth';

type userRegistProps = {

} & z.infer<typeof LoginSchema>

async function userRegist(props: userRegistProps, session: Session) {
	const validatedFieds = LoginSchema.safeParse(props);
	LogNote("아이디 생성 요청 : ", props.nickname, session.user)

	if (!validatedFieds.success || !db)
		return (LogError("아이디 생성 : ", props.nickname), { error: "Invalid fields!" });
	const { nickname } = props;
	const { user } = session;
	const findNickname = await db.userState.findUnique({
		where: { nickname }
	})
	if (findNickname)
		return (LogError("중복 닉네임 : ", nickname), { error: "이미 사용된 닉네임 입니다." });
	await db.userState.create({
		data: {
			nickname: nickname,
			user: { connect: { id: user?.id } }
		}
	});
	LogDone("아이디 생성 완료 : ", nickname)
	return { success: "생성이 완료되었습니다." };
}

export default userRegist
