import React, { useState, useEffect, useContext } from 'react'
export const FrameContext = React.createContext()
export const FrameObj = () => useContext(FrameContext)
import { CREATE, LEGO } from "./constants"
import { GEO_JSON_FRAMES } from "./frames"
import { generateFrameViewerCode } from "./generateCode"
import { GEO_FEATURE } from './menu.constants'
import { getFormData } from "./controller"

export const FrameProvider = ({ children, config }) => {

	// constants to store selected menu option 
	const [menuItem, setMenuItem] = useState(GEO_FEATURE)
	// constants to store frames
	const [frames, setFrames] = useState(GEO_JSON_FRAMES)
	// constants to store mode - CREATE/ EDIT or VIEW
	const [mode, setMode] = useState(CREATE)
	// constants to store form data
	const [formData, setFormData] = useState(false)
	// constants to store document type
	const [type, setType] = useState(GEO_FEATURE)
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

	useEffect(() => {
		if(menuItem) {
			if(mode !== CREATE) {
				let extracted = getFormData(menuItem)
				setData(extracted)
			}
			else setData({}) 
		}
	}, [menuItem])

    
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
				setCode,
				menuItem, 
				setMenuItem
			}}
		>
				{children}
		</FrameContext.Provider>
	)
}
