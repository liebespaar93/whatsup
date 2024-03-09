"use client";

import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type SignInModalButtonProps = {
	mode?: "modal" | "redirect"
} & React.PropsWithChildren

function SignInModalButton({ children, mode = "redirect" }: SignInModalButtonProps) {
	const router = useRouter()

	function onClick(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
		router.push('/auth/login')
	}
	if (mode == 'modal') {
		return (<Button type="submit">login</Button>)
	}
	return (
		<span onClick={onClick}>
			{children}
		</span>
	)
}

SignInModalButton.propTypes = {}

export default SignInModalButton
