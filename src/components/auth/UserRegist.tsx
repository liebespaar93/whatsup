"use client";

import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginSchema } from '@/schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FormError from '@/components/FormError';
import FormSuccess from '@/components//FormSuccess';
import userRegister from '@/server/userRegist';

type UserRegistProps = {
}

function UserRegist(props: UserRegistProps) {
	const [isPending, startTransition] = useTransition();
	const [errorMsg, setErrorMsg] = useState<string | undefined>("");
	const [successMsg, setSuccessMsg] = useState<string | undefined>("");

	const loginForm = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			nickname: "",
			password: "",
		}
	})

	const loginWithUser = (values: z.infer<typeof LoginSchema>) => {
		setErrorMsg("")
		setSuccessMsg("")
		startTransition(() => {
			userRegister(values).then((value) => {
				setErrorMsg(value.error)
				setSuccessMsg(value.success)
			})
		})
	}
	return (
		<Form {...loginForm}>
			<form onSubmit={loginForm.handleSubmit(loginWithUser)} className='flex flex-col gap-y-1'>
				<FormField control={loginForm.control} name="nickname" render={({ field, fieldState, formState }) =>
					<FormItem>
						<FormLabel>Regist</FormLabel>
						<FormControl>
							<Input {...field} type='text' placeholder='nickname' required></Input>
						</FormControl>
						<FormMessage />
					</FormItem>
				} />
				<FormField control={loginForm.control} name="password" render={({ field, fieldState, formState }) =>
					<FormItem>
						<FormControl>
							<Input {...field} type='password' placeholder='password' required></Input>
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

export default UserRegist
