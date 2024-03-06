"use client";

import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/navigation';

type LoginModalButtonProps = {
	children: React.ReactNode,
	mode?: "modal" | "redirect",
	asChild?: boolean;
}
function LoginModalButton({children, mode = "redirect", asChild}: LoginModalButtonProps) {
	const router = useRouter()

	function onClick (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
		router.push('/auth/login')
	}
	if (mode == 'modal')
	{
		return (
			<span>
				modal 상태
			</span>
		)
	}
	return (
		<span onClick={onClick}>
			{children}
		</span>
	)
}

LoginModalButton.propTypes = {}

export default LoginModalButton
