import React from "react"
import * as CONST from "../constants"
import * as util from "../utils"
import * as helper from "./helpers"

export function getUILayout(anyOfFrames, frame, item, uiFrame, mode, formData, onSelect, onTraverse, documentation) {
    
    //let subDocuemntBg = util.extractUIFrameSubDocumentTemplate(uiFrame) ? util.extractUIFrameSubDocumentTemplate(uiFrame) : 'bg-secondary'
    anyOfFrames.uiSchema["classNames"]=` card p-4 mt-4 mb-4`

    let selectStyle = util.extractUIFrameSelectTemplate(uiFrame) ? util.extractUIFrameSelectTemplate(uiFrame) : CONST.SELECT_STYLES
    
 
    function displayLinkedDocument(props) {
        //console.log("props in choice doc ui", props)

        if(props.hasOwnProperty("name")) return <div>{props.name}</div>
        if(props.schema.title === item) return <div>{item}</div>

        let choiceType=props.schema.title
        let placeholder=`Start typing ${choiceType}`
        let data = (props.formData && Object.keys(props.formData).length) ? props.formData : ""
        return helper.displayLinkedDocumentUI(props.onChange, placeholder, props.required, data, choiceType, choiceType, "", onSelect, selectStyle)
    }

    anyOfFrames.uiSchema["ui:field"] = displayLinkedDocument
    return anyOfFrames.uiSchema

}