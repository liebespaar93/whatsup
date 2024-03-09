import db from "@/DB/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * 유저의 데이터를 가져오기 위한 api입니다.
 * @param req
 * @resType user
 * @returns
 */
export async function GET(req: NextRequest) {
	const id = req.nextUrl.searchParams.get("userId");
	if (!id)
		return (NextResponse.json({ "Error": "Need user id" }, { status: 400 }))
	const user = await db.user.findUnique({ where: { id }, include: { userState: true } })
		.catch((error) => {
			return NextResponse.json({ error: "cannot find user id" }, { status: 500 });
		});
	return (NextResponse.json(user))
}
