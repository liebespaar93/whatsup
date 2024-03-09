"use client"
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { deleteUserById } from '@/DB/user'
import { LogNote } from '@/lib/server/Logger'
import { Button } from '../../ui/button'
import { userDelete } from '@/lib/server/userDelete'

type DeleteAccountProps = {
	userId: string
}



function DeleteAccount(props: DeleteAccountProps) {
	const deleteWithId = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		userDelete(props.userId);
	}
	return (
		<Button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
			onClick={deleteWithId}>유저 삭제</Button>
	)
}

DeleteAccount.propTypes = {}

export default DeleteAccount
