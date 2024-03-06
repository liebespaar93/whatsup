import React from 'react'
import PropTypes from 'prop-types'

import LoginForm from '@/components/auth/LoginForm'
import GoogleSignIn from '@/components/auth/GoogleSignIn'
import IDSignIn from '@/components/auth/UserSignIn'
import UserRegist from '@/components/auth/UserRegist'
import Link from 'next/link'

type LoginPageProps =
	{

	}

function LoginPage(props: LoginPageProps) {
	return (
		<LoginForm>
			<div className='flex flex-col'>
				<IDSignIn />
				<GoogleSignIn />
				{/* <ForgetEmail /> */}
				<div className='w-full text-center items-center mt-4'>
					<p>Let's <Link className='underline' href={"/auth/regist"}>Join us</Link></p>
				</div>
			</div>
		</LoginForm>
	)
}

LoginPage.propTypes = {}

export default LoginPage
