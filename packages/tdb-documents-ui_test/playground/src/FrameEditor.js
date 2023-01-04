import React from "react" 
import {InitObj} from "./init"
import JSONInput from 'react-json-editor-ajrm'
import locale    from 'react-json-editor-ajrm/locale/en'
import {EDITOR_HEIGHT, EDITOR_WIDTH} from "./constants"
import {Loading} from "./Loading"
 
export const FrameEditor = () => {
    const {
		frames,
        setFrames
	} = InitObj()

    if(!frames) return <Loading/>

    function handleInput (data) {
        setFrames(data.jsObject)
        //console.log("data", data)
    }

    return <JSONInput
        id='json_type_field'
        locale={ locale }
        placeholder={frames}
        height= {EDITOR_HEIGHT}
        width= {EDITOR_WIDTH}
        onBlur={handleInput}
    />

}