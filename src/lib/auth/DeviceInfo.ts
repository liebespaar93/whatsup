"use client"

import React from 'react'
import PropTypes from 'prop-types'

type DeviceInfoprops =
{

}
async function DeviceInfo(props : DeviceInfoprops) {
	navigator.geolocation.getCurrentPosition((position) => {
		// 성공시
		console.log(position)
	}, () => {
		// 싫패시
		console.log("fialtest")
	})
}

DeviceInfo.propTypes = {}

export default DeviceInfo
