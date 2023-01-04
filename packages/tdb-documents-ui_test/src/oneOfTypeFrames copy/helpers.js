import React, {useState} from "react"
import Card from 'react-bootstrap/Card';
import * as CONST from "../constants"


// retuns placeholder
export function getPlaceholder(uiSchema, property) {
    if( uiSchema.hasOwnProperty(property) && uiSchema[property].hasOwnProperty("ui:placeholder") ) 
        return uiSchema[property]["ui:placeholder"]
    return "Enter an input ... "
}

// returns filled data 
export function getFormData(schema, choice) {
    if( schema["properties"][choice]["default"] ) {
        return schema["properties"][choice]["default"] 
    }
    return ""
}

// returns info if datatype/ subdocument
export function getInfoType (schema, choice) {
    if( schema["properties"][choice]["info"] ) {
        return schema["properties"][choice]["info"] 
    } 
    return ""
}

// data fields
export const displayDataField = (choice, required, data, placeholder, onChange) => {
    const [value, setValue]=useState(data ? data : "")

    function handleChange(val) {
        setValue(val)
        if(onChange) onChange(val)
    }

    return <span className="d-flex"> 
        <div className="d-block h6 col-md-2">
            <span className="control-label">{choice}</span>
            {required && <span className="required">*</span>}
        </div>
        
        <input value={value} className={`form-control tdb__input`} placeholder={placeholder} onChange={(e) => handleChange(e.target.value)}/>
    </span>
}

// subdocument fields
export const displaySubDocumentField = (schema, uiSchema, required, data) => {
    let elements=[]
    for(let property in schema.properties) {
        if(property === "@type") continue
        if(schema.properties[property].info === CONST.DATA_TYPE) {
            let dataFieldData=data.hasOwnProperty(property) ? data[property] : ""
            let placeholder=getPlaceholder(uiSchema, property) 
            elements.push(displayDataField(property, required, dataFieldData, placeholder))
        }
        else if(schema.properties[property].info === CONST.SUBDOCUMENT_TYPE) {
            // get sub document schema for selected choice
            let subDocumentSchema=schema.properties[property]
            let subDocumentUISchema=uiSchema[property]
            let subDocumentData=data.hasOwnProperty(property) ? data[property] : ""
            elements.push(displaySubDocumentField(subDocumentSchema, subDocumentUISchema, required, subDocumentData))
        }
    }
    return <Card bg="secondary" className="mb-3">
        <Card.Body>{elements}</Card.Body>
    </Card>
}

// sys unit 
export const displaySysUnit = (choice) => {
    return <>{choice}</>
}