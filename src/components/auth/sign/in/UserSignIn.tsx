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
import userLogin from '@/lib/server/userLogin';

type UserSignInProps = {
}

function UserSignIn(props: UserSignInProps) {
	const [isPending, startTransition] = useTransition();
	const [errorMsg, setErrorMsg] = useState<string | undefined>("");
	const [successMsg, setSuccessMsg] = useState<string | undefined>("");

	const loginForm = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			nickname: ""
		}
	})

	function loginWithUser(values: z.infer<typeof LoginSchema>) {
		setErrorMsg("")
		setSuccessMsg("")
		startTransition(() => {
			userLogin(values)
				.then((value) => {
					setErrorMsg(value.error)
					setSuccessMsg(value.success)
				})
				.catch((reason) => {
					console.log("error", reason)
				})
		})
	}
	return (
		<Form {...loginForm}>
			<form onSubmit={loginForm.handleSubmit(loginWithUser)} className='flex flex-col gap-y-1'>
				<FormField control={loginForm.control} name="nickname" render={({ field, fieldState, formState }) =>
					<FormItem>
						<FormLabel>Login</FormLabel>
						<FormControl>
							<Input {...field} type='text' placeholder='nickname' required></Input>
						</FormControl>
						<FormMessage />
					</FormItem>
				} />
				<FormError message={errorMsg} />
				<FormSuccess message={successMsg} />
				<hr className='m-2' />
				<Button type='submit' >Login With Nickname</Button>
			</form>
		</Form >
	)
}

export default UserSignIn
