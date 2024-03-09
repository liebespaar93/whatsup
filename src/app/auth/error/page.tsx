import React from 'react'
import CardForm from '@/components/auth/CardForm'
import AuthErrorForm from '@/components/auth/AuthErrorForm'

type AuthErrorprops = {

}

function AuthError(props: AuthErrorprops) {

	return (
		<CardForm title='Auth' description='인증이 잘못되었습니다.'>
			<AuthErrorForm href='/auth/login' label='Back to Login'></AuthErrorForm>
		</CardForm>
	)
}

AuthError.propTypes = {}

export default AuthError
