import React, {useEffect, useState, useRef} from "react"
import Form from "@terminusdb/rjsf-core"
import {getProperties} from "./FrameHelpers"
import CollapsibleField from "react-jsonschema-form-extras/lib/CollapsibleField"
import * as CONST from "./constants"
import {Alert} from "react-bootstrap"
import * as util from "./utils"
import {transformData} from "./extract" 
import { v4 as uuidv4 } from 'uuid';
import {DisplayFieldTemplate, DisplayDocumentation} from "./templates"


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
export function FrameViewer({frame, uiFrame, type, mode, formData, onSubmit, onTraverse, onSelect, hideSubmit, onChange, FieldTemplate, language}){
    const [schema, setSchema]=useState(false)
    const [uiSchema, setUISchema]=useState(false)
    const [readOnly, setReadOnly]=useState(false)
    const [lang, setLanguage]=useState(false)
    const [error, setError]=useState(false)
    const [documentation, setDocumentation]=useState(false)
    const [data, setData]=useState({})

    const [message, setMessage]=useState(false)  

    const [chainedData, setChainedData]=useState(false)
   

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
            //if(frame && uiFrame && type && mode) { //formData 
            if(frame && type && mode) { 
                clear()
                let extractedDocumentation= util.extractDocumentation(frame, current, language)
                //store selected language here to get access to ENUM docs based on selected language
                frame[CONST.SELECTED_LANGUAGE]= language ? language : CONST.DEFAULT_LANGUAGE
                let properties=getProperties(frame, type, frame[current], uiFrame, mode, formData, onTraverse, onSelect, extractedDocumentation, setChainedData)
                let schema = {
                    type: CONST.OBJECT_TYPE,
                    properties: properties.properties,
                    required: properties.required,
                    dependencies: properties.dependencies,
                }
                //console.log("schema", JSON.stringify(schema, null, 2))
                //console.log("uiSchema", JSON.stringify(properties.uiSchema, null, 2))

                console.log("schema", schema)
                console.log("properties.uiSchema", properties.uiSchema)
                //console.log("uiSchema", uiSchema)

                if(mode === CONST.VIEW) {
                    setReadOnly(true)
                }
                //else if(mode === CONST.CREATE) setInput(formData)
                else if(mode === CONST.EDIT && util.isValueHashDocument(frame[current])) {
                    setMessage(util.getValueHashMessage())
                    setReadOnly(true)
                }
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
                    //processFormData(frame, type, formData, setData)
                }

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

    /*const handleChange = ({formData}) => {
        setData(formData)
        if(onChange) {
            var extracted = transformData(mode, schema.properties, formData, frame, type)
            if(extracted && !extracted.hasOwnProperty("@type")) extracted["@type"] = type

            if(mode === CONST.EDIT &&  // append id in edit mode
                extracted && 
                !extracted.hasOwnProperty("@id") && 
                formDataTemp.hasOwnProperty("@id")) {
                    extracted["@id"] = formDataTemp["@id"] 
            }
            onChange(extracted)
        }
    }*/

    const handleChange = ({formData}) => {
        setData(formData)
        if(onChange) {
            //if(onChange) onChange (formData)
            var extracted = transformData(mode, schema.properties, formData, frame, type)
            if(extracted && !extracted.hasOwnProperty("@type")) extracted["@type"] = type

            if(mode === CONST.EDIT &&  // append id in edit mode
                extracted && 
                !extracted.hasOwnProperty("@id") && 
                formDataTemp.hasOwnProperty("@id")) {
                    extracted["@id"] = formDataTemp["@id"] 
            }
            onChange(extracted) 
        }
    }


    /**
     * 
     * @param {*} formData - data extracted from the form 
     * @returns extracted data to onSubmit callback function 
     */
    const handleSubmit = ({formData}) => { 
        if(onSubmit) { 
            //console.log("Before submit: ", formData)
            console.log("chainedData", chainedData)
            //let addedData = util.addOnChainedData(formData, chainedData)
            //console.log("addedData", addedData)
            setData(formData)
            var extracted = transformData(mode, schema.properties, formData, frame, type)
            if(extracted && !extracted.hasOwnProperty("@type")) extracted["@type"] = type

            if(mode === CONST.EDIT &&  // append id in edit mode
                extracted && 
                !extracted.hasOwnProperty("@id") && 
                formDataTemp.hasOwnProperty("@id")) {
                    extracted["@id"] = formDataTemp["@id"]
            }

            onSubmit(extracted)
            console.log("Data submitted: ",  extracted)
            return extracted
        }
    }

    if(error) {
        return <Alert variant="danger">{error}</Alert>
    }

    /**
     * 
     * @param {*} errors - error list from rjsf 
     * @returns a list of errors 
     */
    function transformErrors(errors) {
      
        let descriptionErrorFound=false
        let errorList = errors.map(error => {

            if(error.stack.indexOf('.description should be string') >= 0)  {
                // ignore description string error 
                descriptionErrorFound=true
            }
            error.message = `${error.name} ${error.message}`
            return error;
            
        });
        if(descriptionErrorFound) return []
        return errorList
    }

    //console.log("data", data)

    return <div data-cy="frame_viewer" className="tdb__frame__viewer">
            {schema && message && message}
            <DisplayDocumentation documentation={documentation}/>
            {schema && <Form schema={schema}
                uiSchema={uiSchema}
                mode={mode} 
                //ref={formRef}
                onSubmit={handleSubmit}
                //onChange={handleChange}
                //onBlur={onBlur}
                readonly={readOnly}
                formData={data}
                transformErrors={transformErrors} 
                showErrorList={true}
                fields={{
                    collapsible: CollapsibleField
                }}
                children={hideSubmit} // hide submit button on view mode
                FieldTemplate={mode===CONST.VIEW ? DisplayFieldTemplate : null}/>
            }
        </div>
    
}
/*
>
<button type={"submit"} 
    onClick={(e, formData) => { e.preventDefault(); console.log(e)} }>{"test"}</button>*/
/**
 const handleChange = (data) => {
    //console.log("Data changed: ",  data)
    setInput(data)
    if(onChange) {
        onChange(data)
    }
}
 */

