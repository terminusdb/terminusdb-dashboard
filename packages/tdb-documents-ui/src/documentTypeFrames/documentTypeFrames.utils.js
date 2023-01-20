import * as CONST from "../constants"
import * as helper from "./helpers"
import * as util from "../utils"
import {ViewDocumentLinks} from "./helpers"

export function getLayout (args) {
    let {frame, item, formData}=args
    let layout= {
        type: 'string', 
        info: CONST.DOCUMENT,
        linked_to: frame[item], // store document class name to be linked
        title: item
    }
    let filledData = util.getDefaultValue(item, formData)
    if(filledData) {
        /** edit & view mode */
        layout["default"]=filledData
    }

    return layout
}

//export function getUILayout (fullFrame, frame, item, uiFrame, mode, formData, onTraverse, onSelect, documentation, extractedFrames) {
export function getUILayout (fullFrame, frame, onSelect, onTraverse, item, uiFrame, mode, formData, documentation) {
  
    let uiLayout={}
    
    function displayLinkedDocument(props) {
        
        if(mode === CONST.VIEW) {
            //let displayValue=false
            // we consider formData at this point so as to get 
            let displayValue=""
            if(util.isUnfoldable(props.schema)) displayValue=props.formData["@id"]
            else displayValue=props.formData ? props.formData : props.schema.default
            return ViewDocumentLinks(displayValue, props.name, onTraverse, props.description)
        }

        // CREATE OR EDIT MODE
        //console.log("props", props)
        let actionStatus=false, showStatus=false
        if(mode !== CONST.VIEW && props && props.formData && Object.keys(formData).length > 1) {
            showStatus=true
            // if @unfoldable tag
            actionStatus=props.hasOwnProperty("formData") && typeof props.formData === CONST.STRING_TYPE ?  CONST.LINK_EXISTING_DOCUMENT : CONST.LINK_NEW_DOCUMENT 
        }
        return helper.linkedDocumentProvider(props, item, mode, documentation, onSelect, onTraverse, uiFrame, fullFrame, actionStatus, showStatus)
    }   

    uiLayout = {
        "ui:placeholder": `Start typing ... to search here ...`,
        classNames: "tdb__input mb-3 mt-3",
        "ui:field": displayLinkedDocument
    }

    return uiLayout
}
