import React, {useState, useEffect} from "react"
import {getSubDocumentTitle, getSubDocumentDescription, addCustomUI} from "../utils"
import {CREATE, DOCUMENT, EDIT, VIEW, SELECT_STYLES} from "../constants"
import {Form} from "react-bootstrap"
import AsyncSelect from 'react-select/async'
import {AsyncTypeahead} from 'react-bootstrap-typeahead'
import {
    getLayout,
    getUILayout
} from "./subDocumentType.utils"


export const makeSubDocumentFrames = (frame, item, uiFrame, mode, formData, onTraverse, onSelect, documentation) => {
    //console.log("subdocument frame ..." , frame)
    let layout=getLayout(frame, item, formData)
    let uiLayout=getUILayout(frame, item, uiFrame, mode, formData, documentation)
    return {layout, uiLayout}
}