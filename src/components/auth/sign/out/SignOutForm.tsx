import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../../../ui/button'
import { userLoginOut } from '@/lib/server/userLoginOut'

type SignOutFormProps = {
	children?: ReactNode;
	className?: string | undefined;
}

function SignOutForm(props: SignOutFormProps) {
	return (
		<form className={props.className} action={userLoginOut}>
			{
				props.children ||
				<Button className='w-full' type="submit">Sign Out</Button>
			}
		</form>
	)
}

SignOutForm.propTypes = {}

export default SignOutForm
