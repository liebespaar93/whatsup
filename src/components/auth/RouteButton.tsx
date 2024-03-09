"use client";

import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type RouteButtonProps = {
	route?: string
} & React.PropsWithChildren

function RouteButton({ children, route = "/" }: RouteButtonProps) {
	const router = useRouter()

	function onClick(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
		router.push(route)
	}
	return (
		<span onClick={onClick}>
			{children}
		</span>
	)
}

RouteButton.propTypes = {}

export default RouteButton
