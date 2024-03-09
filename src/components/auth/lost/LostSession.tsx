import React, { ReactNode, useEffect, useState } from 'react'
import LoginOutForm from '../sign/out/SignOutForm'
import LostHeaderForm from './LostHeaderForm'
import { Button } from '../../ui/button'
import { auth } from '@/auth'
import { Session } from 'next-auth'
import { getTokenBytoken } from '@/DB/token'

type LostSessionprops = {
} & React.PropsWithChildren

async function LostSession(props: LostSessionprops) {
  // const seesion = await auth();
	console.log("LostSession")
	// if (props.session?.user) {
	// 	if (props.session.user.createdAt) {
	// 		if (props.session.user.createdAt < new Date())
	// 			return (<div>{props.children}</div>)
	// 	}
	// }
	return (
		<LostHeaderForm alert='session이 만료되었습니다.'>
			<LoginOutForm>
				<Button className='w-full' type="submit">새로운 session 발급받기</Button>
			</LoginOutForm>
		</LostHeaderForm>
	)
}

LostSession.propTypes = {}

export default LostSession
