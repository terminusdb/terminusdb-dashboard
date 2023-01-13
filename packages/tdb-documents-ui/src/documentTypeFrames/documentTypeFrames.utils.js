import * as CONST from "../constants"
import * as helper from "./helpers"
import * as util from "../utils"

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
export function getUILayout (frame, onSelect, onTraverse, item, uiFrame, mode, formData, documentation) {
  
    let uiLayout={}
    
    function displayLinkedDocument(props) {
        return helper.linkedDocumentProvider(props, item, mode, documentation, onSelect, onTraverse, uiFrame)
    }   

    uiLayout = {
        "ui:placeholder": `Start typing ... to search here ...`,
        classNames: "tdb__input mb-3 mt-3",
        "ui:field": displayLinkedDocument
    }

    return uiLayout
}
