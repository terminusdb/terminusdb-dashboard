import React from "react"
import {InitObj} from "./init"
import JSONInput from 'react-json-editor-ajrm'
import locale    from 'react-json-editor-ajrm/locale/en'
import {EDITOR_HEIGHT, DATA_EDITOR_WIDTH} from "./constants"

export const SubmittedData = () => {
    const {
		data
	} = InitObj()

    return <JSONInput
        id='submitted_data_field'
        locale={ locale }
        placeholder={data}
        viewOnly={true}
        height= {EDITOR_HEIGHT}
        width= {DATA_EDITOR_WIDTH}
    />
}