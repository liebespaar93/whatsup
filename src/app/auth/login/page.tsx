import React from 'react'
import PropTypes from 'prop-types'

import CardForm from '@/components/auth/CardForm'
import GoogleSignIn from '@/components/auth/sign/in/GoogleSignIn'
import IDSignIn from '@/components/auth/sign/in/UserSignIn'
import Link from 'next/link'

type LoginPageProps = {

}

function LoginPage(props: LoginPageProps) {

	return (
		<CardForm title='Login' description='로그인'>
			<div className='flex flex-col'>
				<IDSignIn />
				<GoogleSignIn />
				{/* <ForgetEmail /> */}
				<div className='w-full text-center items-center mt-4'>
					<p>Let's <Link className='underline' href={"/auth/register"}>Join us</Link></p>
				</div>
			</div>
		</CardForm>
	)
}

LoginPage.propTypes = {}

export default LoginPage
