import React, { useEffect, useState } from "react"
import Form from "@terminusdb/rjsf-core"
import * as CONST from "./constants"
import { handleSubmit } from "./formActions"
import { DisplayDocumentation } from "./templates"

export const Viewer = ({ display, message, mode, type, onSubmit, readOnly, data, setData, documentation }) => {
	
	return <div className="tdb__frame__viewer ">
		{display && message && message}
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
 

