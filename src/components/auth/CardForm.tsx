import React, { ReactElement, ReactNode } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type LoginFormPorps =
	{
		title?: string,
		description?: string,
		children?: ReactElement
	}
function CardForm(porps: LoginFormPorps) {
	return (
		<Card  className='min-w-96'>
			<CardHeader>
				<CardTitle> {porps.title || "Title" } </CardTitle>
				<CardDescription> {porps.description} </CardDescription>
			</CardHeader>
			<CardContent >
				{porps.children}
			</CardContent>
		</Card>
	)
}

export default CardForm
