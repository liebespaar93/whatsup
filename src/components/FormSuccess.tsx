import React from 'react'

import { GoCheckCircle } from "react-icons/go";

type FormSuccessProps = {
	message?: string
}

function FormSuccess(props: FormSuccessProps) {
	if (!props.message)
		return (null);
	return (
		<div className="mt-2 bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
			<GoCheckCircle />
			<p>{props.message}</p>
		</div>
	)
}

FormSuccess.propTypes = {}

export default FormSuccess
