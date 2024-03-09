import db from "@/DB/db";

export const getTokenBytoken = async (identifier: string, token: string) => {
	try {
		const verificationToken = await db.verificationToken.findUnique({ where: { identifier, token } })
		return verificationToken
	}
	catch {
		return null;
	}
}

export const getTokenByEmail = async (email: string) => {
	try {
		const verificationToken = await db.verificationToken.findFirst({ where: { email } })
		return verificationToken
	}
	catch {
		return null;
	}
}


export const deleteTokenByToken = async (token: string) => {
	try {
		const verificationToken = await db.verificationToken.delete({ where: { token } })
		return verificationToken
	}
	catch {
		return null;
	}
}
