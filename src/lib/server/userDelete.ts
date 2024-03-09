"use server"

import { deleteUserById } from "@/DB/user"
import { signOut } from "@/auth"
import { LogError } from "./Logger";

export async function userDelete(id: string) {
	const resert = await deleteUserById(id);
	if (resert)
		await signOut();
}
