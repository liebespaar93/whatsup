import { z } from "zod"

const isNonEmptyString = (value: string) => { return (!new RegExp(/\s/).test(value)) };
const isNicknameValid = (value: string) => !/\s|\W/.test(value);

export const LoginSchema = z.object({
	nickname: z.string().refine(isNicknameValid, { message: "공백 및 특수문자를 포함할 수 없습니다." })
})

export const RegistSchema = z.object({
	nickname: z.string().refine(isNicknameValid, { message: "영문과 숫자로 이루어진 닉네임을 만들어 주세요" })
})
