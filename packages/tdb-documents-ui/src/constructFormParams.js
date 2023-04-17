import { getProperties } from "./FrameHelpers"
import * as CONST from "./constants"
import * as util from "./utils"

export function constructFormParams (props, setDocumentation, reference, setReference, setReadOnly, setMessage, display, setDisplay ) {

  let { frame, uiFrame, type, mode, formData, compareFormData, onTraverse, onSelect, language } = props

  // current document class to be display in <Viewer/>
	let current = `${type}`

  //let extractedDocumentation= util.extractDocumentation(frame, current, language)
	//store selected language here to get access to ENUM docs based on selected language
	frame[CONST.SELECTED_LANGUAGE]= language ? language : CONST.DEFAULT_LANGUAGE
	let extractedDocumentation= util.extractDocumentation(frame, type, language)
	setDocumentation(extractedDocumentation)
  let fullFrame=frame
  let documentFrame=frame[current]
  let properties=getProperties({ fullFrame, type, documentFrame, uiFrame, mode, formData, compareFormData, onTraverse, onSelect, extractedDocumentation, reference, setReference })
					
  let schema = {
      type: CONST.OBJECT_TYPE,
      properties: properties.properties,
      required: properties.required,
      dependencies: properties.dependencies,
  }
  /*console.log("schema", JSON.stringify(schema, null, 2))
  console.log("uiSchema", JSON.stringify(properties.uiSchema, null, 2))*/
  //console.log("display", display)


  console.log("schema", schema)
  console.log("properties.uiSchema", properties.uiSchema)
  //setUISchema(uiSchema)
  //setSchema(schema)

  // order is set to place @documentation field at the start of the document
  properties.uiSchema["ui:order"] = util.getDocumentOrderBy(documentFrame)

  if(uiFrame && 
    uiFrame.hasOwnProperty(type) && 
    uiFrame[type].hasOwnProperty(CONST.CLASSNAME)) 
    properties.uiSchema["classNames"]= uiFrame[type][CONST.CLASSNAME]
				

  let schemata = {
    schema: schema,
    uiSchema: properties.uiSchema
  }

  setDisplay(schemata)

  if(mode === CONST.VIEW) {
      setReadOnly(true)
  }
  else if(mode === CONST.EDIT && util.isValueHashDocument(frame[current])) {
    setMessage(util.getValueHashMessage())
    setReadOnly(true)
  }
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