import React from "react"
import * as util from "../utils"
import { TDBInput } from "../widgets/inputWidgets"
import { TDBBoolean } from "../widgets/booleanWidget"
import { TDBDateTime, TDBDate } from "../widgets/dateWidgets"
import * as TYPE from "../dataType.constants"
import { getPlaceholder } from "../helpers/placeholderHelper"
import { TDBSubDocument } from "../widgets/subDocumentWidget"
import * as CONST from "../constants"

/** displays widgets according to dataType */
export function display (config) {
  switch(config.dataType) { 
    case TYPE.XSD_BOOLEAN: 
      //XSD_BOOLEAN
      return <TDBBoolean name={config.name} 
        label={config.documentation.label}
        comment={config.documentation.comment}
        value={config.formData} 
        required={config.required}
        mode={config.mode} 
        id={config.id}
        placeholder={config.placeholder} 
        className={config.className} 
        onChange={config.onChange}/>
    
    case TYPE.XSD_DATE_TIME:
      //XSD_DATE_TIME
      return <TDBDateTime name={config.name} 
      value={config.formData} 
      label={config.documentation.label}
      comment={config.documentation.comment}
      required={config.required}
      mode={config.mode} 
      id={config.id}
      placeholder={config.placeholder} 
      className={config.className} 
      onChange={config.onChange}/>

    case TYPE.XSD_DATE:
        //XSD_DATE
        return <TDBDate name={config.name} 
        value={config.formData} 
        label={config.documentation.label}
        comment={config.documentation.comment}
        required={config.required}
        mode={config.mode} 
        id={config.id}
        placeholder={config.placeholder} 
        className={config.className} 
        onChange={config.onChange}/>

    default: 
      // ALL OTHER DATA TYPES
      return <TDBInput name={config.name} 
        value={config.formData} 
        label={config.documentation.label}
        comment={config.documentation.comment}
        required={config.required}
        mode={config.mode} 
        id={config.id}
        placeholder={config.placeholder} 
        className={config.className} 
        onChange={config.onChange}/>
    
  }
}

// NORMAL DATA TYPES
export function getUIDisplay (args, property, dataType) {

  let { documentFrame, extractedDocumentation, mode } = args
  let field = documentFrame[property]
  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)
  let config = {}

  function displayWidget(props) {

    // function expects input data and id of field into which user event occurs
    function handleChange(data, id) {
      if(props.onChange) props.onChange(data)
    }
  
    // condtruct a config object 
    config = {
      dataType: dataType,
      name: props.name,
      formData: props.formData,
      required: props.required,
      mode: mode,
      id: props.idSchema["$id"], 
      placeholder: getPlaceholder(field),
      className: "tdb__doc__input",
      onChange: handleChange,
      documentation: documentation
    }
    return display(config)
  }

  return { "ui:field": displayWidget }
}

// retrieves declaration for selected language
function extractPropertyDocumentation(extractedDocumentation, selectedLanguage) {
  if(!Array.isArray(extractedDocumentation)) {
    throw new Error(`Expected extracted documentation to be an array, but instead got ${extractedDocumentation}`)
  }
  let filtered = extractedDocumentation.filter( arr => arr[CONST.SELECTED_LANGUAGE] === selectedLanguage)
  return filtered[0]
}

// SUBDOCUMENT UI
export function getSubDocumentUIDisplay (args, extracted, property) {
  // at this point extracted will have all of the extracted documents from linked_to

  let { fullFrame, extractedDocumentation, mode, type } = args
  //let field = documentFrame[property]
  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)
  let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]

  function displaySubDocumentWidget(props) {
    // add logic for required properties 
    return  <TDBSubDocument extracted={extracted} 
      id={props.idSchema["$id"]}
      comment={documentation.comment ? documentation.comment : null} 
      mode={mode}
      propertyDocumentation={extractPropertyDocumentation(extracted.extractedDocumentation, selectedLanguage)}
      linked_to={type}
      props={props}/>
  }
  return  { "ui:field": displaySubDocumentWidget }
}
