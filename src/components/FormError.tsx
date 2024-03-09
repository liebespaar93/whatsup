import React from 'react'
import { GoAlert } from "react-icons/go";

interface FormErrorProps {
	message?: string
}

function FormError(props: FormErrorProps) {
	if (!props.message)
		return (null);

	return (
		<div className="mt-4 bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
			<GoAlert />
			<p>{props.message}</p>
		</div>
	)
}

FormError.propTypes = {}

export default FormError
