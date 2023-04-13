import * as util from "../utils"
import * as CONST from "../constants"

export function getLayout (frame, item, formData) {
    let layout= {
        type: "object", 
        title: item,
        info: CONST.SUBDOCUMENT_TYPE,
        properties: frame.properties
    }
    return layout
}

export function getUILayout (frame, item, uiFrame, mode, formData, documentation) {
    let uiLayout= {} 
    let subDocuemntBg = util.extractUIFrameSubDocumentTemplate(uiFrame) ? util.extractUIFrameSubDocumentTemplate(uiFrame) : 'bg-secondary'
    if(frame.hasOwnProperty("uiSchema")) {
        uiLayout=frame["uiSchema"]
    }
    uiLayout["ui:field"]="collapsible" 
    uiLayout["collapse"]={
        field: "ObjectField",
        classNames:"tdb__subdocument__collapse_headers"
    }
    uiLayout["classNames"]=`card ${subDocuemntBg} p-4 mt-4 mb-4 tdb__subdocument__card`
    //let description = getCommentFromDocumentation(item, documentation, true) 
    //uiLayout["ui:description"]=util.getSubDocumentDescription(item, description) 
    //uiLayout["ui:title"]=util.getSubDocumentLabel(item, documentation, true)
    // custom ui:schema - add to default ui schema
    //let addedCustomUI=util.addCustomUI(item, uiFrame, uiLayout) 
    return uiLayout
}