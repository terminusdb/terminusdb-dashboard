import React from "react"
import * as CONST from "../constants"
import * as display from "./displayHelper"
import * as geoTemplate from "../arrayHelpers/geoJSONTemplates"


// NORMAL DATA TYPES
export function getUIDisplay (args, property, dataType) {

  function displayWidget (props) {
    // we pass ID at this point since we have sepratae IDs for normal dataTypes & for Sets/ List
    let id = props.idSchema["$id"]
    // normal data type inputa are being called here 
    // function expects input data and id of field into which user event occurs
    function handleChange(data) {
      if(props.onChange) props.onChange(data)
    }

    return display.displayDataTypesWidget(props, args, property, dataType, id, handleChange)
  }

  return { "ui:field": displayWidget }
}

// retrieves declaration for selected language
export function extractPropertyDocumentation(extractedDocumentation, selectedLanguage) {
  if(!Array.isArray(extractedDocumentation)) {
    throw new Error(`Expected extracted documentation to be an array, but instead got ${extractedDocumentation}`)
  }
  // includes multi lang support
  let filtered = extractedDocumentation.filter( arr => arr[CONST.SELECTED_LANGUAGE] === selectedLanguage)
  return filtered[0]
}

// SUBDOCUMENT UI
export function getSubDocumentUIDisplay (args, extracted, property, expanded) {
  let { type } = args

  // at this point extracted will have all of the extracted documents from linked_to
  function displaySubDocumentWidget(props) {
    let id = props.idSchema["$id"], linked_to=type
    return display.displaySubDocument(props, args, extracted, property, expanded, id, null, linked_to)
  }
   
  return  { "ui:field": displaySubDocumentWidget }
}

// DOCUMENT LINKS UI  
export function getDocumentUIDisplay (args, extracted, property, linked_to) {
  
  function displayDocumentLinkWidget (props) {
    return display.displayDocumentLink(props, args, extracted, property, linked_to)
  }
  
  return  { "ui:field": displayDocumentLinkWidget }
}
  
// ENUM UI 
export function getEnumUIDisplay(args, property) {

  function displayEnumWidget(props) {
    let id = props.idSchema["$id"], hideFieldLabel=false
    return display.displayEnum(args, props, property, id, hideFieldLabel) 
  }  

  return { "ui:field": displayEnumWidget }
}

// rdf:Lang
export function getRDFLangUIDisplay(args, property) {
  function rdfLanguageWidget(props) {
    return display.displayRDFLanguageWidget(args, props, property) 
  }  

  return { "ui:field": rdfLanguageWidget }
}
 
// SYS:JSON 
export function getJSONUIDisplay(args, property) {
  
  function displayJSONWidget (props) {
    let id=props.idSchema["$id"]
    return display.displayJSON(props, args, property, id)
  }

  return { "ui:field": displayJSONWidget }
}

// Choice Sub documents
export function getChoiceSubDocumentUIDisplay(args, property) {
  function displayChoiceSubDocumentWidget (props) {
    let id = props.idSchema["$id"]
    return display.displayChoiceSubDocument(props, args, property, id)
  }

  return { "ui:field": displayChoiceSubDocumentWidget }
}

// CHOICE DOCUMENTS 
export function getChoiceDocumentUIDisplay(args, property) {

  function displayChoiceDocumentWidget(props) {
    let id = props.idSchema["$id"]
    return display.displayChoiceDocument(props, args, property, id)
  }
  return { "ui:field": displayChoiceDocumentWidget }
}

// LINE STRING GEO JSONs
export function getlineStringUIDisplay (args, property) {


  let { mode } = args

  if(mode === CONST.VIEW) {
    function displayLineStringUI(props) {
      let id = props.idSchema["$id"]
      if(props.formData && props.formData.includes(undefined)) 
        return <div className={`tdb__${props.name}__hidden`}/>
      else return display.displayLineStringDocument(props, args, property, id)
    }
    return { "ui:field": displayLineStringUI }
  }

  function showLineStringUI(props) {
    let argsHolder = {...args}
    argsHolder.documentFrame={ [property]: args.documentFrame[property][CONST.CLASS] }
    return geoTemplate.LineStringFieldTemplate(argsHolder, props, property) 
	} 


  return {
    "ui:options": CONST.GEO_FRAMES_ARRAY_OPTIONS,
    "ui:ArrayFieldTemplate" : showLineStringUI
  }
}

// POINT GEO JSONs
export function getPointUIDisplay (args, property) {

  let { mode } = args

  if(mode === CONST.VIEW) {
    function displayPointUI(props) {
      let id = props.idSchema["$id"]
      if(props.formData && props.formData.includes(undefined)) 
        return <div className={`tdb__${props.name}__hidden`}/>
      else return display.displayPointDocument(props, args, property, id)
    }
    return { "ui:field": displayPointUI }
  }

  function showPointUI(props) {
    let argsHolder = {...args}
    argsHolder.documentFrame={ [property]: args.documentFrame[property][CONST.CLASS] }
    return geoTemplate.PointFieldTemplate(argsHolder, props, property) 
		//return geoTemplate.PointFieldTemplate(argsHolder, props, property)
	} 


  return {
    "ui:options": CONST.UI_HIDDEN_ARRAY_OPTIONS,
    "ui:ArrayFieldTemplate" : showPointUI
  }
}

// POLYGON 
export function getPolygonUIDisplay (args, property) {
  let { mode } = args

  if(mode === CONST.VIEW) {
    function displayPolygonUI(props) {
      let id = props.idSchema["$id"]
      if(props.formData && props.formData.includes(undefined)) 
        return <div className={`tdb__${props.name}__hidden`}/>
      else return display.displayPolygonDocument(props, args, property, id)
    }
    return { "ui:field": displayPolygonUI }
  }

  function coordinatesArrayTemplate(props) {
    return geoTemplate.CoordinatesArrayFieldTemplate(args, props, property)
  }
  return  { 
    "ui:ArrayFieldTemplate": geoTemplate.PolygonArrayFieldTemplate,
    "items": {
      "ui:ArrayFieldTemplate": coordinatesArrayTemplate,
      "items": {
        "ui:options": CONST.UI_HIDDEN_ARRAY_OPTIONS
      }
    }
  }
}


// MULTIPOLYGON 
export function getMultiPolygonUIDisplay (args, property) {
  let { mode } = args

  if(mode === CONST.VIEW) {
    function displayMultiPolygonUI(props) {
      let id = props.idSchema["$id"]
      if(props.formData && props.formData.includes(undefined)) 
        return <div className={`tdb__${props.name}__hidden`}/>
      else return display.displayPolygonDocument(props, args, property, id) // pass to polygon map viewer
    }
    return { "ui:field": displayMultiPolygonUI }
  }

  function coordinatesArrayTemplate(props) {
    return geoTemplate.CoordinatesArrayFieldTemplate(args, props, property)
  }
  
  return { 
    "ui:ArrayFieldTemplate": geoTemplate.MultiPolygonArrayFieldTemplate,
    "items": {
      "ui:ArrayFieldTemplate": coordinatesArrayTemplate,
      "items": {
        "ui:options": CONST.UI_HIDDEN_ARRAY_OPTIONS
      }
    }
  }

}

// BINDING BOX 
export function getBBoxUIDisplay (args, property) { 
  let { mode } = args

  if(mode === CONST.VIEW) {
    function displayBBoxUI(props) {
      let id = props.idSchema["$id"]
      if(props.formData && props.formData.includes(undefined)) 
        return <div className={`tdb__${props.name}__hidden`}/>
      else return display.displayBBoxDocument(props, args, property, id)
    }
    return { "ui:field": displayBBoxUI }
  }

  function showBBoxUI(props) {
    let argsHolder = {...args}
    argsHolder.documentFrame={ [property]: args.documentFrame[property][CONST.CLASS] }
		return geoTemplate.BBoxFieldTemplate(argsHolder, props, property)
	}  

  return {
    "ui:options": CONST.UI_HIDDEN_ARRAY_OPTIONS,
    "ui:ArrayFieldTemplate" : showBBoxUI
  }
}