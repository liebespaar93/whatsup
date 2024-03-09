"use client"

import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegistSchema } from '@/schemas';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FormError from '@/components/FormError';
import FormSuccess from '@/components//FormSuccess';
import userRegist from '@/lib/server/userRegist';
import { useSession } from 'next-auth/react';

type CreateNicknameProps = {
}

function CreateNickname(props: CreateNicknameProps) {
	const [isPending, startTransition] = useTransition();
	const [errorMsg, setErrorMsg] = useState<string | undefined>("");
	const [successMsg, setSuccessMsg] = useState<string | undefined>("");
	const [waitCreate, setwaitCreate] = useState<boolean>(false);
	const { status, data, update } = useSession();
	const loginForm = useForm<z.infer<typeof RegistSchema>>({
		resolver: zodResolver(RegistSchema),
		defaultValues: { nickname: "" }
	})
	function createWithSession(values: z.infer<typeof RegistSchema>) {
		setErrorMsg("");
		setSuccessMsg("");
		setwaitCreate(true);
		if (status !== "authenticated")
			return setErrorMsg("state is Not authenticated");
		startTransition(() => {
			userRegist(values, data).then((value) => {
				setErrorMsg(value.error);
				setSuccessMsg(value.success);
				update(data)
			}).finally(() => {
				setwaitCreate(false);
			})
		})
	}
	return (
		<Form {...loginForm}>
			<form onSubmit={loginForm.handleSubmit(createWithSession)} className='w-full'>
				<div className='flex'>
					<FormField control={loginForm.control} name="nickname" render={({ field, fieldState, formState }) =>
						<FormItem >
							<FormControl >
								<Input {...field} disabled={!!successMsg} className='w-full' autoComplete='username' type='text' placeholder='닉네임을 입력해 주세요' required></Input>
							</FormControl>
							<FormMessage className='w-auto p-0 m-0' />
						</FormItem>
					} />
					{!!successMsg ||
						<Button disabled={waitCreate} type='submit'>닉네임 생성</Button>}
				</div>
				<FormError message={errorMsg} />
				<FormSuccess message={successMsg} />
			</form>
		</Form >
	)
}

export default CreateNickname
