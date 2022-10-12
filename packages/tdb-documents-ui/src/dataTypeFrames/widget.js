import React from "react"
import {Form} from "react-bootstrap"
import Stack from 'react-bootstrap/Stack'
import * as DATATYPE from "../constants"


// function to provide a ui widget to date
export function getDateUIWidget(title) {
    let uiLayout = {}
    uiLayout["ui:widget"] = "date",
    uiLayout["ui:title"] = title,
    uiLayout["ui:options"] = {
        "yearsRange": [
            1980,
            2030
        ]
    }
    uiLayout["classNames"] = "tdb__input mb-3 mt-3 date-list-style"
    return uiLayout
}

// function to provide a ui widget to dateTime
export function getDateTimeUIWidget (title) {
    let uiLayout = {} 
    uiLayout["ui:widget"] = "alt-datetime",
    uiLayout["ui:title"] = title,
    uiLayout["ui:options"] = {
        "yearsRange": [
            1980,
            2030
        ]
    }
    uiLayout["classNames"] = "tdb__input mb-3 mt-3 date-list-style"
    return uiLayout
}

// function for URI in View mode
export function getURIUIWidget(title) {
    let uiLayout = {} 
    function displayURI(props) {
        return <Stack direction="horizontal" gap={3}>
            <Form.Label>{title}</Form.Label>
            <a href={props.formData} target="_blank">{props.formData}</a>
        </Stack>
    }
    uiLayout["ui:field"] = displayURI
    return uiLayout
}

const matchType ={
    [DATATYPE.XSD_STRING] : DATATYPE.STRING_TYPE,
    [DATATYPE.XSD_ANY_URI] : DATATYPE.STRING_TYPE,
    [DATATYPE.XSD_LANGUAGE] : DATATYPE.STRING_TYPE,
    [DATATYPE.RDF_LANGSTRING] :DATATYPE.STRING_TYPE,
    [DATATYPE.XDD_URL] : DATATYPE.STRING_TYPE,
    [DATATYPE.XSD_NAME] : DATATYPE.STRING_TYPE,
    [DATATYPE.XSD_NCNAME] : DATATYPE.STRING_TYPE,
    [DATATYPE.XSD_NMTOKEN] : DATATYPE.STRING_TYPE,
    [DATATYPE.XSD_NORMALIZED_STRING] :DATATYPE.STRING_TYPE,

    [DATATYPE.SYS_JSON_TYPE] : DATATYPE.JSON_TYPE,

    [DATATYPE.XSD_BYTE] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_SHORT] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_INT] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_LONG] : DATATYPE.NUMBER_TYPE,

    [DATATYPE.XSD_DOUBLE] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_FLOAT] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_POSITIVE_INTEGER] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_NONPOSITIVEINTEGER] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_NONNEGATIVEINTEGER] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_NEGATIVEINTEGER] : DATATYPE.NUMBER_TYPE,

    [DATATYPE.XSD_DECIMAL] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_INTEGER] : DATATYPE.NUMBER_TYPE,

    [DATATYPE.XSD_UNSINGNEDBYTE] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_UNSIGNEDSHORT] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_UNSIGNEDINT] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_UNSIGNEDLONG] : DATATYPE.NUMBER_TYPE,

    [DATATYPE.XSD_BOOLEAN] : DATATYPE.BOOLEAN_TYPE,
    [DATATYPE.XSD_DATE_TIME] : DATATYPE.DATE_TYPE,
    [DATATYPE.XSD_G_YEAR] : DATATYPE.DATE_TYPE,
    [DATATYPE.XSD_DATE] : DATATYPE.STRING_TYPE
} 

//get data type xsd: or xdd:
// you can rewrite with an object
export function getDataType(type) { 
    return matchType[type]
}
