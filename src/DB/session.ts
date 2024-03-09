import db from "@/DB/db";

export const getSessionById = async (userId: string) => {
	try {
		const session = await db.session.findFirst({ where: { userId } })
		return session
	}
	catch {
		return null;
	}
}
