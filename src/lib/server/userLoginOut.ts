"use server"

import { signOut } from "@/auth"

export async function userLoginOut() {
	await signOut()
}
