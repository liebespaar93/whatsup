"use client"

import React, { useState } from 'react'
import { DEFAULT_API_BASE_URL, DEFAULT_USER_IMAGE_DIR } from '@/routes'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import axios, { AxiosError } from "axios";
import { useSession } from 'next-auth/react'
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/store/hook'
import { UpdateAvatarAuth, selectAvatarAuth } from '@/lib/store/auth/authSlice'

type UserInfoAvatarProps = {
	nickname: string | null
}

async function onUploadAvatar(nickname: string | null, file: File | undefined) {
	if (!file || !nickname)
		return null;
	const formData = new FormData();
	formData.append("file", file);
	formData.append('nickname', nickname);
	const res = await axios.post(DEFAULT_API_BASE_URL + `/api/avatar/upload`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	}).catch((reason: AxiosError) => {
		return reason.response
	})
	return (res);
}

function UserInfoAvatar(props: UserInfoAvatarProps) {
	const dispatch = useAppDispatch()
	const avatar = useAppSelector(selectAvatarAuth);
	const [file, setFile] = useState<File | undefined>();

	async function uploadAvatarOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		console.log(file);
		const response = await onUploadAvatar(props.nickname, file)
		if (response?.status === 200) {
			dispatch(UpdateAvatarAuth(response.data.filename))
		}
	}

	function onChnageAvatar(e: React.ChangeEvent<HTMLInputElement>) {
		const target = e.target;
		setFile(target.files ? target.files[0] : undefined);
	}

	return (
		<div>
			<Avatar className='m-auto max-h-36 max-w-36 object-contain w-auto h-auto'>
				<AvatarImage alt='avatar' src={avatar ? DEFAULT_USER_IMAGE_DIR + avatar : DEFAULT_USER_IMAGE_DIR + "default.jpeg"} />
				<AvatarFallback><p>Avatar error</p></AvatarFallback>
			</Avatar>
			<input className='file' type="file" name="image" onChange={onChnageAvatar} ></input>
			<Button onClick={uploadAvatarOnClick} className='m-auto mt-4 w-36'>이미지 변경</Button>
		</div>
	)
}

UserInfoAvatar.propTypes = {}

export default UserInfoAvatar
