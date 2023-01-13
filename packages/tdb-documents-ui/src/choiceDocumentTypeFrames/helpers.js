
import React from "react"
import * as CONST from "../constants"
import * as util from "../utils"
import {getSelectComponent} from "../documentTypeFrames/helpers"

// display ui for single choice documents 
export function displayLinkedDocumentUI(onChange, placeholder, required, displayValue, label, linked_to, description, onSelect, selectStyle) {
    return <>
        {getSelectComponent(onChange, placeholder, required, displayValue, label, linked_to, description, onSelect, selectStyle)}
    </>
}
