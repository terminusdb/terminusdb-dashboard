import React from "react"
import {Form} from "react-bootstrap"
import Stack from 'react-bootstrap/Stack'
import {
    XSD_STRING,
    XSD_DECIMAL,
    XSD_DATE_TIME,
    XSD_BOOLEAN,
    XSD_INTEGER,
    XSD_ANY_URI,
    STRING_TYPE,
    SYS_JSON_TYPE,
    NUMBER_TYPE,
    BOOLEAN_TYPE, 
    DATE_TYPE,
    JSON_TYPE,
    XSD_G_YEAR,
    XSD_DATE,
    XDD_URL, 
    XSD_FLOAT,
    XSD_LANGUAGE,
    XSD_POSITIVE_INTEGER
} from "../constants"


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


//get data type xsd: or xdd:
// you can rewrite with an object
export function getDataType(type) { 
    if(type === XSD_STRING) return STRING_TYPE 
    else if(type === XSD_FLOAT) return NUMBER_TYPE
    else if(type === XSD_ANY_URI) return STRING_TYPE
    else if(type === XSD_LANGUAGE) return STRING_TYPE
    else if(type === XDD_URL) return STRING_TYPE
    else if(type === SYS_JSON_TYPE) return JSON_TYPE
    else if(type === XSD_POSITIVE_INTEGER) return NUMBER_TYPE
    else if(type === XSD_DECIMAL) return NUMBER_TYPE
    else if(type === XSD_INTEGER) return NUMBER_TYPE
    else if(type === XSD_BOOLEAN) return BOOLEAN_TYPE
    else if(type === XSD_DATE_TIME) return DATE_TYPE 
    else if(type === XSD_G_YEAR) return DATE_TYPE 
    else if(type === XSD_DATE) return STRING_TYPE
}
