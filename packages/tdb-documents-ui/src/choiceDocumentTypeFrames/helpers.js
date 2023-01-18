
import React from "react"
import * as CONST from "../constants"
import * as util from "../utils"
import {getSelectComponent, linkedDocumentProvider} from "../documentTypeFrames/helpers" 

// display ui for single choice documents 
export function displayLinkedDocumentUI(args) {
    //props.onChange, placeholder, props.required, data, choiceType, choiceType, "", onSelect, selectStyle
    //linkedDocumentProvider = (props, item, mode, documentation, onSelect, onTraverse, uiFrame)
    let obj={
        formData: args.displayValue,
        required: args.required,
        onChange: args.onChange
    }
    return linkedDocumentProvider (obj, args.label, args.mode, args.documentation, args.onSelect, args.onTraverse)
    
    /*return <>
        {getSelectComponent(onChange, placeholder, required, displayValue, label, linked_to, description, onSelect, selectStyle)}
    </>*/
}
