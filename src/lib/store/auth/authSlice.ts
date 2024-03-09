"use client"

import { getUserIncUserState } from "@/DB/user";
import { CustomUser } from "@/lib/types/auth";
import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/lib/store/createAppSlice";
import { Session } from "next-auth";

export interface authState { state: string, user: CustomUser }

const initialState: authState = {
	state: "",
	user: {
		id: "",
		email: null,
		emailVerified: null,
		image: null,
		name: null,
		nickname: null,
		createdAt: null,
		updatedAt: null,
		userState: {
			id: "",
			nickname: "",
			avatar: null
		}
	},
}

export const authSlice = createAppSlice({
	name: "auth",
	initialState,
	reducers: (create) => ({
		initialStateAuth: create.reducer((state, action: PayloadAction<CustomUser | undefined>) => {
			if (action.payload)
				state.user = action.payload
		}),
		UpdateAvatarAuth: create.reducer((state, action: PayloadAction<string | null>) => {
			if (action.payload && state.user && state.user.userState)
				state.user.userState.avatar = action.payload
		}),
		logIn: create.reducer((state, action: PayloadAction<Session>) => {
			state.user = action.payload.user
		})
	}),
	selectors: {
		selectAuth: (state) => {
			return state;
		},
		selectUserAuth: (state) => {
			return state.user;
		},
		selectAvatarAuth: (state) => {
			return state.user?.userState?.avatar
		}
	}
})

export const { initialStateAuth, UpdateAvatarAuth, logIn } = authSlice.actions;
export const { selectAuth, selectUserAuth, selectAvatarAuth } = authSlice.selectors;

