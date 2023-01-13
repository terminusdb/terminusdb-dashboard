
import * as util from "../utils"
import * as helper from "./helpers"

// mandatory
export function makeChoiceSubDocumentTypeFrames (args) {
    
    
    let anyOf={} 
    let {frame, item, uiFrame, documentation}=args

    anyOf = helper.getAnyOfSchema(args) 

    let subDocuemntBg = util.extractUIFrameSubDocumentTemplate(uiFrame) ? util.extractUIFrameSubDocumentTemplate(uiFrame) : 'bg-secondary'

    let uiSchema = {
        //"ui:title": util.getTitle(item, util.checkIfKey(item, frame["@key"]), documentation),
        classNames:`card ${subDocuemntBg} p-4 mt-4 mb-4`
    }

    /** pass on ui schema */
    if(Array.isArray(anyOf)) { 
        anyOf.map(choices => {
            for(var ui in choices.uiProperties) {
                uiSchema[ui]=choices.uiProperties[ui]
            }
        })
    }

    return {anyOf, uiSchema}
   
}
