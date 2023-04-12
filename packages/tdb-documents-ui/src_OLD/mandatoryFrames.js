import * as typeHelper from "./helpers/typeHelper"
import * as infoHelper from "./helpers/infoHelper"
import * as metaDataHelper from "./helpers/metaDataHelper"
import * as formatHelper from "./helpers/formatHelper"
import * as propertyHelper from "./helpers/propertyHelper"
import * as util from "./utils"
import * as dataProvider from "./helpers/formDataHelper"
import {generateUI} from "./helpers/uiHelper"
import * as CONST from "./constants"

/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - property 
 * @param {*} uiFrame - custom UI to change appearance
 * @param {*} mode - mode in which FrameViewer is being called
 * @param {*} formData - filled data to be displayed in form 
 * @param {*} documentation - formData - filled data to be displayed in form 
 * @returns a data field 
 */
export function makeMandatoryFrames (fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation, docType) {

    /** generate properties of sub frames */
    let extractedFrames = propertyHelper.generateInternalFrames(fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation, docType)
    //console.log("extractedFrames", extractedFrames)
    
    /** gather layout of property  */ 
    let layout = { 
        type: typeHelper.getType(fullFrame, frame, item),  
        info: infoHelper.getInfo(fullFrame, frame, item),
        title: item,
        [CONST.METADATA]: metaDataHelper.getMetaData(frame, item, documentation),
        format: formatHelper.getFormat(frame, item) 
    } 
    /** add properties  */ 
    if(extractedFrames) {
        if(extractedFrames.hasOwnProperty("properties")) {
            // subdocuments
            layout["properties"]=extractedFrames.properties 
        }
        else if(extractedFrames.hasOwnProperty("anyOf") && 
            extractedFrames.hasOwnProperty("anyOfUiSchema")) {
            // one of documents
            layout["anyOf"]=extractedFrames.anyOf 
        }
        else if(extractedFrames.hasOwnProperty("anyOf") && 
            extractedFrames["anyOf"] &&
            extractedFrames.hasOwnProperty(CONST.LINKED_TO)) {
                //linked to documents
                layout["anyOf"]=extractedFrames.anyOf
        }
        else if(extractedFrames.hasOwnProperty("anyOf") && 
            !extractedFrames["anyOf"] &&
            extractedFrames.hasOwnProperty(CONST.LINKED_TO)) {
                //linked to documents where @unfoldable is false
                layout["type"]=CONST.STRING_TYPE
        }
        else if(extractedFrames.hasOwnProperty("anyOf")) {
            // choice subdocuments & choice documents
            layout["anyOf"]=extractedFrames.anyOf
        }
        else if(extractedFrames.hasOwnProperty("enum")) {
            // enums
            layout["enum"]=extractedFrames.enum 
        }
        else if(extractedFrames.hasOwnProperty("default")) {
            // pre store sys unit default value as []
            layout["default"]=extractedFrames.default
        }
    }

    /** gather filled data when mode is Edit or View */
    //if(mode !== CONST.CREATE && util.getDefaultValue(item, formData)) {
    if(mode !== CONST.CREATE && formData) {
        let data=dataProvider.getFormData(frame, item, mode, formData)
        if(data) layout["default"]=data
    }
    if(layout["type"] === CONST.BOOLEAN_TYPE) {
        let data=dataProvider.getFormData(frame, item, mode, formData)
        if(!data) layout["default"]=data
    }

    /** gather ui layout of property to change look and feel */
    let uiLayout = generateUI(fullFrame, frame, item, uiFrame, mode, formData, onTraverse, onSelect, documentation, extractedFrames, docType)

    //console.log("layout", layout)
    //console.log("uiLayout", uiLayout)

    return {layout, uiLayout}
}
