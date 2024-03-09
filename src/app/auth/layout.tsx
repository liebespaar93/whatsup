import React from 'react'
import PropTypes from 'prop-types'

type AuthLayoutProps = {
	children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className='h-screen flex items-center justify-center'>
			{children}
		</div>
	)
}

AuthLayout.propTypes = {}

export default AuthLayout
