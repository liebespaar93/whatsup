"use client"

import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegistSchema } from '@/schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FormError from '@/components/FormError';
import FormSuccess from '@/components//FormSuccess';
import userRegist from '@/lib/server/userRegist';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

type UserCreateProps = {
}

function UserCreate(props: UserCreateProps) {
	const [isPending, startTransition] = useTransition();
	const [errorMsg, setErrorMsg] = useState<string | undefined>("");
	const [successMsg, setSuccessMsg] = useState<string | undefined>("");
	const { status, data } = useSession();
	const loginForm = useForm<z.infer<typeof RegistSchema>>({
		resolver: zodResolver(RegistSchema),
		defaultValues: { nickname: "" }
	})
	function createWithSession(values: z.infer<typeof RegistSchema>) {
		setErrorMsg(""); setSuccessMsg("");
		if (status !== "authenticated")
			return setErrorMsg("state is Not authenticated");
		startTransition(() => {
			userRegist(values, data).then((value) => {
				setErrorMsg(value.error);
				setSuccessMsg(value.success);
				if (value.success)
					redirect('/settings')
			})
		})

	}
	return (
		<Form {...loginForm}>
			<form onSubmit={loginForm.handleSubmit(createWithSession)} className='flex flex-col gap-y-1'>
				<FormField control={loginForm.control} name="nickname" render={({ field, fieldState, formState }) =>
					<FormItem>
						<FormLabel>Nickname</FormLabel>
						<FormControl>
							<Input {...field} autoComplete='username' type='text' placeholder='nickname' required></Input>
						</FormControl>
						<FormMessage />
					</FormItem>
				} />
				<FormError message={errorMsg} />
				<FormSuccess message={successMsg} />
				<hr className='m-2' />
				<Button type='submit'>Create User</Button>
			</form>
		</Form >
	)
}

export default UserCreate
