import db from "@/DB/db";
import { LogError, LogNote } from "@/lib/server/Logger";
import { existsSync, mkdirSync, unlink, writeFile, writeFileSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(request: Request) {
	return (Response.json({ "Error": "Api Error response" }))
}


export async function POST(request: Request) {
	const formData = await request.formData();
	const file = formData.get("file");
	const nickname = formData.get("nickname")?.toString();

	if (!file || !(file instanceof File))
		return NextResponse.json({ error: "No files received." }, { status: 400 });
	if (file.size > 1048576)
		return NextResponse.json({ error: "file size over 1MB." }, { status: 400 });
	if (!nickname)
		return NextResponse.json({ error: "No nickname received." }, { status: 400 });

	const buffer = Buffer.from(await file.arrayBuffer());
	const avatarDir = path.join(process.cwd(), "public/user/avatars/")
	const filename = path.join(nickname, "/", file.name.replaceAll(" ", "_"));

	if (!existsSync(avatarDir + nickname))
		mkdirSync(avatarDir + nickname, { recursive: true });

	try {
		const userState = await db.userState.findUnique({ where: { nickname: nickname } })
		if (userState?.avatar) {
			unlink(path.join(avatarDir, userState.avatar), function (err) {
				if (err) return LogError(err);
				console.log('file deleted successfully');
			})
		}
	} catch (error) {
		return NextResponse.json({ error: "No nickname received." }, { status: 500 });
	}

	try {
		writeFileSync(path.join(avatarDir, filename), buffer);
		await db.userState.update({ where: { nickname: nickname }, data: { avatar: filename } })
	} catch (error) {
		LogError("Error occured ", error);
		return NextResponse.json({ Message: "Failed", status: 500 });
	}

	return NextResponse.json({ Message: "Success", status: 201, filename: filename })
}
