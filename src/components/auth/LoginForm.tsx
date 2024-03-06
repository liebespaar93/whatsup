import React, { ReactElement } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type LoginFormPorps =
	{
		children?: ReactElement
	}
function LoginForm(porps: LoginFormPorps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Please sign in </CardTitle>
				<CardDescription> To access the private page you have to be authenticated</CardDescription>
			</CardHeader>
			<CardContent>
				{porps.children}
			</CardContent>
		</Card>
	)
}

export default LoginForm
