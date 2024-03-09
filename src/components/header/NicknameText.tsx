"use client"

import React from 'react'
import PropTypes from 'prop-types'
import { useSession } from 'next-auth/react'

type NicknameTextProps = {

}

function NicknameText(props: NicknameTextProps) {
	const { status, data } = useSession()
	if (status !== 'authenticated')
		return <p>No auth</p>
	return (
		<p>{data.user?.nickname || "No Nickname"}</p>
	)
}

NicknameText.propTypes = {}

export default NicknameText

