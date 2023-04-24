import React, { useState, useEffect, useContext } from 'react'
export const FrameContext = React.createContext()
export const FrameObj = () => useContext(FrameContext)
import { CREATE, LEGO } from "./constants"
import { LEGO_FRAMES } from "./frames.constants"

export const FrameProvider = ({ children, config }) => {

	// constants to store selected data product
	const [dataProduct, setDataproduct] = useState(LEGO)
	// constants to store frames
	const [frames, setFrames] = useState(LEGO_FRAMES)
	// constants to store mode - CREATE/ EDIT or VIEW
	const [mode, setMode] = useState(CREATE)
	// constants to store document type
	const [type, setType] = useState("Theme")
    
	return (
		<FrameContext.Provider
			value={{
				dataProduct, 
				setDataproduct,
				frames,
				mode,
				setMode,
				type, 
				setType	
			}}
		>
				{children}
		</FrameContext.Provider>
	)
}
