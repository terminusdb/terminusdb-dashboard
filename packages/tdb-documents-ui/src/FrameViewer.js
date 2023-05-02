import React, { useEffect, useState } from "react"
import { getProperties } from "./FrameHelpers"
import * as CONST from "./constants"
import { Alert } from "react-bootstrap"
import * as util from "./utils"
import { Viewer } from "./Viewer"
import { HelperMessages } from "./HelperMessages"
import { constructFormParams } from "./constructFormParams"
import { BootswatchSelect } from 'react-bootswatch-select';
import { Row } from "react-bootstrap"
//import { loadTheme } from "./formActions"
 
/*
**  frame     - full json schema of a document
**  uiFrame   - ui json of a document
**  type      - document type of interest
**  mode      - create/ edit/ view
**  submitButton - submit button configuration json object
**  formData  - filled value of the document
**  onSubmit  - a function with have custom logic to process data submitted
**  onSelect   - a js function which gets back the selected value from selects
**  onTraverse - a js function which gets back the ID of a document on click
**  compareFormData - used for diff viewers to compare against original or changed data 
**  language - language code parameters to support a wide variety of languages in Ui as defined in schema
**  showThemeSelector - a Select to select differnet themes when using Themes on an application level 
*/
export function FrameViewer(props){

	let { frame, uiFrame, type, mode, formData, onSubmit,  showThemeSelector, language, theme } = props

	// schema constants
	const [schema, setSchema]=useState(false)
	// ui schema constants
	const [uiSchema, setUISchema]=useState(false)
	// display constants which holds schema & ui Schema to refresh Viewer
	const [display, setDisplay]=useState(false)
	// read only constants (used in VIEW mode)
	const [readOnly, setReadOnly]=useState(false)
	// language support constants
	const [lang, setLanguage]=useState(false)
	// error constants
	const [error, setError]=useState(false)
	// documentation constants
	const [documentation, setDocumentation]=useState(false)
	// form data constants 
	const [data, setData]=useState(formData)
	// message constants 
  const [message, setMessage]=useState(false)  
	// look up constants which maintains a reference to all of the class definitions
	const [reference, setReference]=useState({})  
	// constants to update form props 
	const [update, setUpdate] = useState(false)
	
 
	function clear() {
		// reset everything on change of form props
		setDisplay(false)
		setSchema(false)
		setUISchema(false)
		setReadOnly(false)
		setLanguage(false)
	}

	/*useEffect(() => {
		if(theme) {
			loadTheme(theme)
		}
	}, [theme])*/


	useEffect(() => {
		try{ 
			if(frame && type && mode) { 
				clear()
				// update form
				setUpdate(Date.now())
			}
		}
		catch(e) {
			setError(`An error has occured in generating frames. Err - ${e}`)
		}

	}, [frame, uiFrame, type, mode, formData, language]) 

	useEffect(() => {
		// on update construct form params 
		if(update) {
			constructFormParams(props, setDocumentation, reference, setReference, setReadOnly, setMessage, display, setDisplay)
		}
	}, [update])

	

	if(error) {
		return <Alert variant="danger">{error}</Alert>
	}
	
	return <div className="tdb__frame__viewer ">
			
		<BootswatchSelect version={'4.4.1'} selectedThemeName={theme} selectorHidden/>
		{showThemeSelector && <div className="mb-3 d-flex">
			<small className="text-muted">{`Theme Selector: `}</small>
			<BootswatchSelect version={'4.4.1'} selectedThemeName={theme ? theme : "darkly"} />
		</div>}
		<HelperMessages frame={frame} mode={mode} type={type} formData={formData} />
		<Viewer display={display} 
			message={message} 
			mode={mode} 
			type={type} 
			language={language}
			onSubmit={onSubmit} 
			readOnly={readOnly} 
			data={formData} 
			setData={setData} 
			documentation={documentation}/>
	</div>
}


