import * as CONST from "../constants"
import {getProperties} from "../FrameHelpers"
import * as util from "../utils"
import * as helper from "./helpers"

// mandatory
export function makeOneOfTypeFrames (args) {
    
    let anyOf={} 
    let {frame, item, uiFrame, documentation}=args

    let {anyOfArray, anyOfUiSchema} = helper.getAnyOfSchema(args) 
    anyOf=anyOfArray

    let subDocuemntBg = util.extractUIFrameSubDocumentTemplate(uiFrame) ? util.extractUIFrameSubDocumentTemplate(uiFrame) : 'bg-secondary'

    let uiSchema = {
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

    console.log("uiSchema !!!", uiSchema)

    return {anyOf, anyOfUiSchema}
   

}
