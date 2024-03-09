"use client"

import React from 'react'
import PropTypes from 'prop-types'
import useSWR, { Key } from 'swr'
import axios from 'axios'
import { DEFAULT_API_BASE_URL } from '@/routes'
import { useAppStore } from '@/lib/store/hook'
import { CustomUser } from '@/lib/types/auth'
import { initialStateAuth, selectUserAuth } from '@/lib/store/auth/authSlice'
import { useSelector } from 'react-redux'

type StoreAuthProps = {
	userId: string | undefined
}
function StoreAuth(props: StoreAuthProps) {
	const store = useAppStore()
	if (!props.userId)
		return <div className='hidden'>로그인 되지 않았습니다</div>

	const fetcher = (url: string) => axios.get<CustomUser>(url, {
		params: { userId: props.userId },
	}).then(res => {
		if (res.status == 200)
			store.dispatch(initialStateAuth(res.data))
		return res.data
	})

	const { data, error, isLoading } = useSWR<CustomUser, string, Key>(DEFAULT_API_BASE_URL + 'api/user', fetcher)

	if (error) return <div className='hidden'>서버와 통신이 이상합니다</div>;
	if (isLoading) return <div className='hidden'>서버에 데이터 가져오는중</div>;
	return <div className='hidden'>서버에서 데이터 가저오기 완료</div>;
}

StoreAuth.propTypes = {}

export default StoreAuth
