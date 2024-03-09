"use client"

import React, { ReactNode, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, AvatarImage } from '../ui/avatar';
import { DEFAULT_USER_IMAGE_DIR } from '@/routes';
import { useAppSelector } from '@/lib/store/hook';
import { selectAuth, selectAvatarAuth } from '@/lib/store/auth/authSlice';

type MenuListToggleProps = {
	children: ReactNode;
}
function MenuListToggle(props: MenuListToggleProps) {
	const [menuView, setMenuView] = useState(false)
	const modalRef = useRef<HTMLDivElement>(null);
	const avatar = useAppSelector(selectAvatarAuth);

	const auth = useAppSelector(selectAuth)

	function menu_toggle() {
		setMenuView(!menuView)
	}

	function menu_toggle_off(e: MouseEvent) {
		if (modalRef.current && !modalRef.current.contains(e.target as Node))
			setMenuView(false)
	}

	useEffect(() => {
		window.document.addEventListener('mousedown', menu_toggle_off)
		return (() => {
			window.document.removeEventListener('mousedown', menu_toggle_off)
		})
	})
	return (
		<div className='w-44 m-1'>
			<div ref={modalRef} >
				<Avatar className='ml-auto ' onClick={menu_toggle}>
					<AvatarImage alt='avatar' src={avatar ? DEFAULT_USER_IMAGE_DIR + avatar : DEFAULT_USER_IMAGE_DIR + "default.jpeg"} />
				</Avatar>
				{menuView ?
					props.children
					: <div className='space-x-reverse'></div>
				}
			</div>
		</div >
	)
}

MenuListToggle.propTypes = {}

export default MenuListToggle
