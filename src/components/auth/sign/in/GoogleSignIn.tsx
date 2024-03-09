"use client";

import React from 'react'
import { Button } from '../../../ui/button'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc';
import { LogNote, LogWarn } from '@/lib/server/Logger';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { auth } from '@/auth';

type GoogleSignInProps = {
	callbackUrl?: string
	redirect?: boolean
}

function GoogleSignIn(props: GoogleSignInProps) {
	const loginWithGoogle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		signIn('google', {
			callbackUrl: props.callbackUrl || DEFAULT_LOGIN_REDIRECT,
			// redirect: props.redirect
		})
	}
	return (
		<Button className='mt-2 w-full' variant="outline" onClick={loginWithGoogle}>
			<FcGoogle className='mr-2' />
			Google Login
		</Button>
	)
}

export default GoogleSignIn
