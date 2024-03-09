import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MenuList from '../header/MenuList'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { auth } from '@/auth'

type DefaultHeaderProps = {

} & React.PropsWithChildren

async function DefaultHeader(props: DefaultHeaderProps) {
	console.log("DefaultHeader")
	const session = await auth();
	return (
		<div className='w-full flex flex-row p-2 border-2'>
			<div className='my-auto left-0 w-44'>
				<Link className='ml-2' href={"/"}> 홈 버튼</Link>
			</div>
			<div className='m-auto'> 헤더 타이틀</div>
			<div className='right-0'>
				<MenuList session={session}></MenuList>
			</div>
		</div>
	)
}

DefaultHeader.propTypes = {}

export default DefaultHeader
