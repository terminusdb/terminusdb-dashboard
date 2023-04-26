import React from "react" 
import { FrameObj } from "./frameInit"
import JSONInput from 'react-json-editor-ajrm'
import locale    from 'react-json-editor-ajrm/locale/en'
 
export const FrameEditor = () => {
	const {
		frames,
		setFrames 
	} = FrameObj()

	if(!frames) return <Loading/>

	function handleInput (data) {
		setFrames(data.jsObject)
	}
	if(!frames) return <div/>
	//JSON Editor dimensions 
	return <JSONInput
		id='json_type_field'
		locale={ locale }
		placeholder={frames}
		height= {"550px"}
		width= {"380px"}
		onBlur={handleInput}
	/>

}