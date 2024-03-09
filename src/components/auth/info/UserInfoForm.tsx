import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../../ui/card'
import { Input } from '../../ui/input'
import CreateNickname from '../account/CreateNickname'
import DeleteAccount from '../account/DeleteAccount'
import { auth } from '@/auth'
import UserInfoAvatar from './UserInfoAvatar'

type UserInfoFormProps = {
	classname?: string | undefined
}
async function UserInfoForm(props: UserInfoFormProps) {
  const session = await auth()
	const user = session?.user
	if (!user)
		return (<div>No User Info</div>)
	return (
		<div className={props.classname}>
			<Card className='p-4 space-y-8 w-11/12 m-auto'>
				<CardTitle>
					<p>유저 정보</p>
				</CardTitle>
				<CardContent className='w-full flex flex-row'>
					<div className="w-full grid grid-col-4">
						<div className='col-start-1 col-span-3'>
							<div className="w-full min-w-64 grid grid-col-3 space-y-2">
								<div className='col-start-1 col-span-1 mt-2'><p>닉네임</p> </div>
								{!user.userState ?
									<div className='col-start-2 col-span-2'><CreateNickname /></div> :
									<div className='col-start-2 col-span-2'><Input disabled={true} value={user.userState.nickname}></Input></div>
								}
								<div className='col-start-1 col-span-1'><p>이메일</p> </div>
								<div className='col-start-2 col-span-2'><Input disabled={true} value={user.email || "이메일이 없습니다"}></Input></div>

								<div className='col-start-1 col-span-1'><p>가입일</p> </div>
								<div className='col-start-2 col-span-2'><Input disabled={true} type='date' value={user.updatedAt?.toString()}></Input></div>
							</div>
						</div>
						<div className='col-start-4 col-span-1  text-center'>
							<UserInfoAvatar nickname={user.nickname}></UserInfoAvatar>
						</div>
					</div>
				</CardContent>
				<CardTitle>
					<p>디바이스</p>
					<CardDescription color='#333'>
						현재 활성화된 기기목록 입니다.
					</CardDescription>
				</CardTitle>
				<CardContent className='w-full flex flex-row'>
					<div className="w-full grid grid-col-4">
						<div>

						</div>
					</div>
				</CardContent>
				<DeleteAccount userId={user.id}></DeleteAccount>
			</Card>
		</div>
	)
}
UserInfoForm.propTypes = {}

export default UserInfoForm
