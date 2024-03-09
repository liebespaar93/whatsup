import React, { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LostHeaderForm from './LostHeaderForm'
import { useAppSelector } from '@/lib/store/hook'

type LostNicknameprops = {

} & React.PropsWithChildren

function LostNickname(props: LostNicknameprops) {
	return (
		<LostHeaderForm alert='닉네임이 없습니다'>
			<Button className='m-2'>
				<Link href="/auth/register">작성하러 가기</Link>
			</Button>
		</LostHeaderForm>
	)
}

LostNickname.propTypes = {}

export default LostNickname
