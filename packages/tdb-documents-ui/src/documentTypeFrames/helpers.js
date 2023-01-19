import React, {useState, useEffect} from "react"
import * as util from "../utils"
import * as CONST from "../constants"
import {
    DocumentSelect, 
    DocumentSearch,
    DocumentView
} from "./DocumentSelects"
import {getCommentFromDocumentation, getPropertyLabelFromDocumentation} from "../documentationTemplates"

export function ViewDocumentLinks (displayValue, label, onTraverse, description, selectStyle) {
    return <DocumentView value={displayValue} 
        label={label} 
        styles={selectStyle}
        //required={props.required}
        onTraverse={onTraverse} 
        description={description}/>
}

/** gets filled value to display  in react select  */
function getValue (displayValue) {
    if(typeof displayValue === CONST.OBJECT_TYPE) {
        return displayValue.hasOwnProperty("@id") ? {value: displayValue["@id"], label: displayValue["@id"]} : null
    }
    return displayValue ? {value: displayValue, label: displayValue} : null
}
 
// function returns a react select with an onSelect callback method
//function getSelectComponent (props, displayValue, label, linked_to, description, onSelect, selectStyle) {
export function getSelectComponent (onChange, placeholder, required, displayValue, label, linked_to, description, onSelect, selectStyle) {
    //const [value, setValue]=useState(props.formData ? {value: props.formData, label: props.formData} : null)
    //const [value, setValue]=useState(getValue(displayValue))
    const [value, setValue]=useState(getValue(displayValue))

    useEffect(() => {
        setValue(getValue(displayValue))
    }, [displayValue])
    //if(value) {
        //props.onChange(value.value)
    //}
    
    const loadOptions = async (inputValue, callback) => {
        //console.log("linked_to", linked_to)
        let opts = await onSelect(inputValue, linked_to)
        callback(opts)
        return opts
    }

    const handleInputChange = (newValue) => {
        const inp = newValue.replace(/\W/g, '')
        return inp
    }

    const handleChange = e => {
        setValue({value: e.value, label: e.value})
        onChange(e.value)
    }

   
    return <DocumentSelect
        label={label}
        required={required}
        styles={selectStyle}
        placeholder={placeholder}
        onChange={handleChange}
        loadOptions={loadOptions}
        value={value ? value : ""}
        description={description}
        handleInputChange={handleInputChange}
    />
}

/**
 * 
 * @param {*} props - props from ui field display of UI Layout
 * @param {*} onSelect -can be a callback function for searching documents or a search component UI to select a document
 * @returns - linked documnet field display 
 */
export const linkedDocumentProvider = (props, item, mode, documentation, onSelect, onTraverse, uiFrame) => {
    

    let label = getPropertyLabelFromDocumentation(item, documentation)//util.getLabelFromDocumentation (item, documentation)
    let description = <div/>//getCommentFromDocumentation(item, documentation)
    let linked_to=(props.schema && props.schema.hasOwnProperty("linked_to")) ? props.schema["linked_to"] : item
    // extracting custom ui styles
    let selectStyle = util.extractUIFrameSelectTemplate(uiFrame) ? util.extractUIFrameSelectTemplate(uiFrame) : CONST.SELECT_STYLES
    
    if(mode === CONST.VIEW) { 
        //let displayValue=props.formData
        // props.formData for normal document type  
        // props.schema.default is for choice document types where its not automated
        let displayValue=props.formData ? props.formData : props.schema.default
        return ViewDocumentLinks(displayValue, label, onTraverse, description, selectStyle)
    }
  
    // review this - will remove after graphQL integrate in tdb-dashboard
    if(typeof onSelect === "function") {
        let displayValue=props.formData ? props.formData : props.schema.default
        return getSelectComponent(props.onChange, props.uiSchema["ui:placeholder"], props.required, displayValue, label, linked_to, description, onSelect, selectStyle)
    }

    // simply sents back component
    return <DocumentSearch  
        label={label}
        value={props.formData ? {id: props.formData, label: props.formData} : null}
        linked_to={linked_to}
        display={onSelect ? onSelect : <>No Component to display ...</>}
        description={<div/>}
        required={props.required}
        onChange={props.onChange}
    />

}