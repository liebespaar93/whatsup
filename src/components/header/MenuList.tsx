import React from 'react'
import Link from 'next/link'
import { Session } from 'next-auth'

import { Button } from '@/components/ui/button'
import MenuListToggle from '@/components/header/MenuListToggle'
import SignInModalButton from '@/components/auth/sign/in/SignInModalButton'
import SignOutForm from '@/components/auth/sign/out/SignOutForm'
import NicknameText from '@/components/header/NicknameText'

type MenuListProps = {
	session: Session | null
}

async function MenuList(porps: MenuListProps) {
	console.log("MenuList")
	const session = porps.session

	if (!session || !session.user) {
		return (
			<SignInModalButton>
				<Button type='submit'>login</Button>
			</SignInModalButton>)
	}
	const user = session.user
	if (!user) {
		return (
			<SignInModalButton>
				<Button type='submit'>login</Button>
			</SignInModalButton>)
	}
	return (
		<MenuListToggle>
			<div id="dropdownAvatar" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
				<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
					<div className="font-medium truncate"><NicknameText /></div>
					<div className="font-thin truncate">{user.email}</div>
				</div>
				<ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
					<li>
						<Link className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" href={'#'} >Dashboard</Link>
					</li>
					<li>
						<Link className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" href={'/settings'} >Settings</Link>
					</li>
				</ul>
				<div className="py-2">
					<SignOutForm className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >
						<button >
							Sign out
						</button>
					</SignOutForm>
				</div>
			</div>
		</MenuListToggle>
	)
}

MenuList.propTypes = {}

export default MenuList
