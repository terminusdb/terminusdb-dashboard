import React, { useEffect, useState } from "react"
import Form from "@terminusdb/rjsf-core"
import { getProperties } from "./FrameHelpers"
//import CollapsibleField from "react-jsonschema-form-extras/lib/CollapsibleField"
import * as CONST from "./constants"
import { Alert } from "react-bootstrap"
import * as util from "./utils"
//import {transformData} from "./extract" 
import { v4 as uuidv4 } from 'uuid';
import { handleSubmit } from "./formActions"
import { DisplayDocumentation } from "./templates"
import { Viewer } from "./Viewer"

 
/*
**  frame     - full json schema of a document
**  uiFrame   - ui json of a document
**  type      - document type of interest
**  mode      - create/ edit/ view
**  submitButton - submit button configuration json object
**  formData  - filled value of the document
**  onSubmit  - a function with have custom logic to process data submitted
**  hideSubmit - hides Submit button - this is helpfull when you want to display nested FrameViewers
**  onChange   - a function with custom logic to process data when form data is changed
**  onSelect   - a js function which gets back the selected value from selects
**  onTraverse - a js function which gets back the ID of a document on click
**  FieldTemplate - a js function which you can pass at root level of FrameViewer to alter look and feel of fields
**  language - language code parameters to support a wide variety of languages in Ui as defined in schema
*/
export function FrameViewer({frame, uiFrame, type, mode, formData, onSubmit, onTraverse, onSelect, hideSubmit, onChange, language}){
  
	const [schema, setSchema]=useState(false)
	const [uiSchema, setUISchema]=useState(false)
	const [display, setDisplay]=useState(false)
	const [readOnly, setReadOnly]=useState(false)
	const [lang, setLanguage]=useState(false)
	const [error, setError]=useState(false)
	const [documentation, setDocumentation]=useState(false)
	const [data, setData]=useState(formData)

  const [message, setMessage]=useState(false)  
	const [reference, setReference]=useState({})  

	let current = `${type}`
	let formDataTemp=formData


	function clear() {
			setSchema(false)
			setUISchema(false)
			setReadOnly(false)
			setLanguage(false)
	}

	

	useEffect(() => {
		//try{ 
			if(frame && type && mode) { 
				
				clear()
				//let extractedDocumentation= util.extractDocumentation(frame, current, language)
				//store selected language here to get access to ENUM docs based on selected language
				frame[CONST.SELECTED_LANGUAGE]= language ? language : CONST.DEFAULT_LANGUAGE
				let extractedDocumentation= util.extractDocumentation(frame, type, language)
				setDocumentation(extractedDocumentation)
				let fullFrame=frame
				let documentFrame=frame[current]
				let properties=getProperties({ fullFrame, type, documentFrame, uiFrame, mode, formData, onTraverse, onSelect, extractedDocumentation, reference, setReference })
					
				let schema = {
						type: CONST.OBJECT_TYPE,
						properties: properties.properties,
						required: properties.required,
						dependencies: properties.dependencies,
				}
				/*console.log("schema", JSON.stringify(schema, null, 2))
				console.log("uiSchema", JSON.stringify(properties.uiSchema, null, 2))*/

				console.log("schema", schema)
				console.log("properties.uiSchema", properties.uiSchema)
				//setUISchema(uiSchema)
				//setSchema(schema)

				// order is set to place @documentation field at the start of the document
				properties.uiSchema["ui:order"] = util.getDocumentOrderBy(documentFrame)

				let schemata = {
					schema: schema,
					uiSchema: properties.uiSchema
				}

				setDisplay(schemata)
				
				

				//console.log("uiSchema", uiSchema)

				if(mode === CONST.VIEW) {
						setReadOnly(true)
				}
				else if(mode === CONST.EDIT && util.isValueHashDocument(frame[current])) {
					setMessage(util.getValueHashMessage())
					setReadOnly(true)
				}
				//else if(mode === CONST.CREATE) setInput(formData)
				/*
				else {
						setReadOnly(false)
				}
				setSchema(schema)
				const uiSchema = properties.uiSchema

				// get form level ui schema 
				if(uiFrame && uiFrame.hasOwnProperty("classNames")) uiSchema["classNames"]= uiFrame.classNames
				if(uiFrame && uiFrame.hasOwnProperty("ui:order")) uiSchema["ui:order"]=uiFrame["ui:order"]
				if(uiFrame && uiFrame.hasOwnProperty("ui:title")) uiSchema["ui:title"]= uiFrame["ui:title"]
				if(uiFrame && uiFrame.hasOwnProperty("ui:description")) uiSchema["ui:description"]= uiFrame["ui:description"]
				
				// order is set to place @documentation field at the start of the document
				if(frame) {
					uiSchema["ui:order"] = util.getOrderFromMetaData(frame[type])
				}
				
				setUISchema(uiSchema)

				// process form data to check if one ofs are available
				if(mode !== CONST.CREATE) {
						setData(util.getFormData(formData))
				}*/

			}
		//}
		//catch(e) {
			//setError(`An error has occured in generating frames. Err - ${e}`)
		//}

	}, [frame, uiFrame, type, mode, formData, language]) 

	if(!frame) return <div>No schema provided!</div>
	if(!mode) return  <div>Please include a mode - Create/ Edit/ View</div>
	if(mode === CONST.VIEW && !formData) return <div>Mode is set to View, please provide filled form data</div>
	if(!type) return  <div>Please include the type of document</div>
	

	if(error) {
		return <Alert variant="danger">{error}</Alert>
	}


	return <div className="tdb__frame__viewer ">
		<Viewer display={display} 
			message={message} 
			mode={mode} 
			type={type} 
			onSubmit={onSubmit} 
			readOnly={readOnly} 
			data={data} 
			setData={setData} 
			documentation={documentation}/>
	</div>
    
}


