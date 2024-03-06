import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from '@/components/auth/LoginForm'
import UserRegist from '@/components/auth/UserRegist'
import GoogleSignIn from '@/components/auth/GoogleSignIn'
import Link from 'next/link'

type RegistPageProps = {

}

function RegistPage(props: RegistPageProps) {
	return (
		<LoginForm>
			<div className='flex flex-col'>
				<UserRegist></UserRegist>
				<GoogleSignIn />
				{/* <ForgetEmail /> */}
				<div className='w-full text-center items-center mt-4'>
					<p>Go to <Link className='underline' href={"/auth/login"}>Sign in</Link> </p>
				</div>
			</div>
		</LoginForm>
	)
}

RegistPage.propTypes = {}

export default RegistPage
