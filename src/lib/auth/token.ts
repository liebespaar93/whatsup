import { date } from "zod";
import db from "@/DB/db";

import { v4 as uuidv4 } from "uuid";

async function CreateToken(userId: string) {
	const uuid = uuidv4();
	const expires = new Date(new Date().getTime() + 12 * 3600 * 1000)
	// db.user.update({ where: { id: userId } }, date: )
}
