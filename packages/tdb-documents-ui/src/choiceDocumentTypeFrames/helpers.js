
import React from "react"
import * as CONST from "../constants"
import * as util from "../utils"
import {displaySearchComponent} from "../documentTypeFrames/helpers" 
 
// display ui for single choice documents 
export function displayLinkedDocumentUI(args) {
    let obj={
        formData: args.displayValue,
        required: args.required,
        onChange: args.onChange,
        name: args.label
    }
    //console.log("args", args)
    return displaySearchComponent(obj, args.onSelect, args.label)
    //return linkedDocumentProvider (obj, args.label, args.mode, args.documentation, args.onSelect, args.onTraverse)
    
    /*return <>
        {getSelectComponent(onChange, placeholder, required, displayValue, label, linked_to, description, onSelect, selectStyle)}
    </>*/
}
