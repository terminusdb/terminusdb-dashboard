import React from "react" 
import {InitObj} from "./init"
import JSONInput from 'react-json-editor-ajrm'
import locale    from 'react-json-editor-ajrm/locale/en'
import {EDITOR_HEIGHT, EDITOR_WIDTH} from "./constants"

export const UIFrameEditor = () => {
    const {
		setUIFrames,
        uiFrames
	} = InitObj()


    function handleInput (data) {
        setUIFrames(data.jsObject)
    }

    return <JSONInput
        id='json_type_field'
        locale={ locale }
        placeholder={uiFrames}
        height= {EDITOR_HEIGHT}
        width= {EDITOR_WIDTH}
        onBlur={handleInput}
    />
}