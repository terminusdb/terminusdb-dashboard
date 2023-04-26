import React, { useState, useEffect, useContext } from 'react'
export const FrameContext = React.createContext()
export const FrameObj = () => useContext(FrameContext)
import { CREATE, LEGO } from "./constants"
import { LEGO_FRAMES } from "./lego.constants"
import { generateFrameViewerCode } from "./generateCode"

export const FrameProvider = ({ children, config }) => {

	// constants to store frames
	const [frames, setFrames] = useState(LEGO_FRAMES)
	// constants to store mode - CREATE/ EDIT or VIEW
	const [mode, setMode] = useState(CREATE)
	// constants to store form data
	const [formData, setFormData] = useState(false)
	// constants to store document type
	const [type, setType] = useState("Theme")
	// constants to store data
	const [data, setData] = useState({})
	// consttant to store display of code 
	const [showCode, setShowCode] = useState(false)
	// consttant to store code 
	const [code, setCode] = useState(false)

	useEffect(() => {
		if(showCode) {
			setCode(generateFrameViewerCode(data, mode, type))
		}
	}, [showCode])

    
	return (
		<FrameContext.Provider
			value={{
				frames,
				setFrames,
				mode,
				setMode,
				type, 
				setType,
				formData, 
				setFormData,
				data, 
				setData,
				showCode, 
				setShowCode,
				code, 
				setCode
			}}
		>
				{children}
		</FrameContext.Provider>
	)
}
