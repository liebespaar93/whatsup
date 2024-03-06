"use client";

import React from 'react'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc';

type GoogleSignInProps = {
}

function GoogleSignIn(props: GoogleSignInProps) {
	const loginWithGoogle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		signIn('google')
	}
	return (
		<Button className='mt-2' variant="outline" onClick={loginWithGoogle}>
			<FcGoogle className='mr-2'/>
			Google Login
		</Button>
	)
}

export default GoogleSignIn
