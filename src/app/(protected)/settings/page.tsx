import React from 'react'
import UserInfoForm from '@/components/auth/info/UserInfoForm';
import DefaultHeader from '@/components/\btemplates/DefaultHeader';

type SettingsPageProps = {

}

async function SettingsPage(props: SettingsPageProps) {
	console.log("SettingPage")
	return (
		<div>
			<DefaultHeader></DefaultHeader>
			<UserInfoForm classname='mt-2'></UserInfoForm>
		</div>
	)
}

SettingsPage.propTypes = {}

export default SettingsPage
