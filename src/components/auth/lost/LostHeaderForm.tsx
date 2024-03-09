
import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import { GoAlert } from 'react-icons/go'
import LoginOutForm from '../sign/out/SignOutForm'

type LostHeaderFormProps = {
	alert: string
	children: ReactNode
}

function LostHeaderForm(props: LostHeaderFormProps) {
	return (
		<div>
			<div className='w-full bg-yellow-400 flex-row flex'>
				<div className='m-auto w-full text-left p-1 text-sm flex gap-x-2'>
					<GoAlert />
					<p>{props.alert}</p>
				</div>
				<div className='m-2' >
					{/* 세션 만료 삭제 후 다시 발급할 children 상속 */}
					{props.children}
				</div>
			</div>
		</div>
	)
}

LostHeaderForm.propTypes = {}

export default LostHeaderForm
