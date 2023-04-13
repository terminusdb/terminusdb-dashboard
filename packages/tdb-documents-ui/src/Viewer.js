import React, { useEffect, useState } from "react"
import Form from "@terminusdb/rjsf-core"
import * as CONST from "./constants"
import { handleSubmit } from "./formActions"
import { DisplayDocumentation } from "./templates"
import Stack from 'react-bootstrap/Stack';

const SelectedLanguage = ({ language }) => {
	if(!language) return false

	return <Stack direction="horizontal" gap={3}>
		<label className="mb-3 text-muted">{`Selected language`}</label>
		<label className="mb-3 text-warning fw-vold">{`${language}`}</label>
	</Stack>
}

export const Viewer = ({ display, message, mode, type, onSubmit, readOnly, data, setData, documentation, language }) => {
	
	return <div className="tdb__frame__viewer ">
		{display && message && message}
		<SelectedLanguage language={language}/>
		<DisplayDocumentation documentation={documentation}/>
		{display && <Form schema={display.schema}
			uiSchema={display.uiSchema}
			mode={mode} 
			onSubmit={(data) => handleSubmit(data, onSubmit, setData, type, mode)}
			readonly={readOnly}
			formData={data}
			showErrorList={true}
			children={ mode === CONST.VIEW ? true : false } />
		}
	</div>
}
 

