import React from 'react'
import PropTypes from 'prop-types'
import CardForm from './CardForm'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import FormError from '../FormError'
type AuthErrorFormprops = {
	href: string,
	label: string
}
function AuthErrorForm(props: AuthErrorFormprops) {
	return (
		<div className='space-y-2'>
			<FormError message='잘못된 접근입니다' />
			<Button
				variant="outline"
				className="w-full"
				size="sm"
				asChild
			>
				<Link href={props.href}>
					{props.label}
				</Link>
			</Button>
		</div>
	)
}

AuthErrorForm.propTypes = {}

export default AuthErrorForm
