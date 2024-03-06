import { z } from "zod"

export const LoginSchema = z.object({
	nickname: z.string().min(1, {message: "유저를 확인해 주세요"}),
	password: z.string().min(1, {message: "패스워드를 확인해 주세요"})
})
