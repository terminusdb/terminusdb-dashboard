import React from "react"
import * as CONST from "../constants"
import * as util from "../utils"
import * as helper from "./helpers"
import Form from "@terminusdb/rjsf-core"

 
export function getUILayout(anyOfFrames, item, uiFrame, mode, formData, documentation) {

    let subDocuemntBg = util.extractUIFrameSubDocumentTemplate(uiFrame) ? util.extractUIFrameSubDocumentTemplate(uiFrame) : 'bg-secondary'
    //anyOfFrames.uiSchema["classNames"]=`choice_subdocument_title card ${subDocuemntBg} p-4 mt-4 mb-4`
    anyOfFrames.uiSchema["classNames"]=`choice_subdocument_title d-block mt-4 mb-4`
    return anyOfFrames.uiSchema 
}