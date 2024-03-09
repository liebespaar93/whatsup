import db from "@/DB/db";
import { LogError, LogNote } from "@/lib/server/Logger";
import { User } from "@prisma/client";
import { NewLifecycle } from "react";

/**
 * email을 사용한 유저 가져오기
 * @DB 임시 db
 * @table user
 * @param email
 * @returns
 */
export const getUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUnique({ where: { email } });

		return user;
	} catch {
		return null;
	}
};

/**
 * id을 사용한 유저 가져오기
 * @DB 임시 db
 * @table user
 * @param id
 * @returns
 */
export const getUserById = async (id: string) => {
	try {
		const user = await db.user.findUnique({ where: { id }, include: { userState: true } });

		return user;
	} catch {
		return null;
	}
};
/**
 * id을 사용한 유저 가져오기
 * @DB 임시 db
 * @table user
 * @param id
 * @returns
 */
export const getUserIncUserState = async (where: any, how:string) => {
	try {
		const user = await db.user.findUnique<{
			where: { id: string };
			include: { userState: true; };
		}>({ where: where, include: { userState: true } }).then((value) => {
			LogNote("getUserIncUserState", how,value?.id)
			return (value)
		}).catch((reason) => {
			LogError("getUser()", reason)
			return (null)
		});

		return user;
	} catch {
		return null;
	}
};

/**
 * nickname을 사용한 유저 가져오기
 * @DB 임시 db
 * @table user
 * @param nickname
 * @returns
 */
export const getUserStateByNickname = async (nickname: string) => {
	try {
		const userState = await db.userState.findUnique({ where: { nickname }, include: { user: true, } });

		return userState;
	} catch {
		return null;
	}
};

/**
 * nickname을 사용한 유저 리스트 가져오기
 * @DB 임시 db
 * @table user
 * @param nickname
 * @returns
 */
export const getUserListByNickname = async (nickname: string) => {
	try {
		const userState = await db.userState.findUnique({ where: { nickname }, include: { user: true, } });
		return userState?.user;
	} catch {
		return null;
	}
};

/**
 * id를 사용한 유저 삭제
 * @DB 임시 db
 * @table user
 * @param userId
 * @returns
 */
export const deleteUserById = async (userId: string) => {
	try {
		const user = await db.user.delete({ where: { id: userId } })
		LogNote("deleteUserById", user.id)
		return true;
	} catch (error) {
		LogError("deleteUserById", error)
		return false;
	}
}
