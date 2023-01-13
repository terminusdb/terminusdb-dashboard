import * as CONST from "../constants"



// get optional frames
export function makeRDFLangFrames (frame, item, uiFrame, mode, formData, documentation) {
    let properties =  {}, uiSchema={}

    properties =  {
        "@lang": {
            "type": CONST.STRING_TYPE,
            "title": "language"
        },
        "@value": {
            "type": CONST.STRING_TYPE,
            "title": "value"
        }
    }

    return {properties, uiSchema}
}
