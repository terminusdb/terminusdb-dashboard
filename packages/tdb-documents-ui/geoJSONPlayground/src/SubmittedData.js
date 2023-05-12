import React from "react"
import { FrameObj } from "./frameInit"
import JSONInput from 'react-json-editor-ajrm'
import locale    from 'react-json-editor-ajrm/locale/en'

export const SubmittedData = () => {
  const {
		data
	} = FrameObj()

	return <JSONInput
		id='submitted_data_field'
		locale={ locale }
		placeholder={data}
		viewOnly={true}
		height= {"550px"}
		width= {"380px"}
	/>
}