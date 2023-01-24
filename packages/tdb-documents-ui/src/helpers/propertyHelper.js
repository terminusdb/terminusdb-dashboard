import * as CONST from "../constants"
import * as util from "../utils"
import {getProperties} from "../FrameHelpers"
import {makeChoiceSubDocumentTypeFrames} from "../choiceSubDocumentTypeFrames/choiceSubDocumentTypeFrames"
import {makeDocumentTypeFrames} from "../documentTypeFrames/documentTypeFrames"
import {makeEnumTypeFrames} from "../enumTypeFrames/enumTypeFrames"
import {makeChoiceDocumentTypeFrames} from "../choiceDocumentTypeFrames/choiceDocumentTypeFrames"
import {makeSysUnitTypeFrames} from "../sysDataTypeFrames/sysDataTypeFrames"
import {makeOneOfTypeFrames} from "../oneOfTypeFrames/oneOfTypeFrames"
import {makeRDFLangFrames} from "../rdfLanguageString/rdfLanguageString"
import {makeFeatureCollectionTypeFrames} from "../arrayTypeFrames/featureCollectionTypeFrames"
 
function getSubDocumentFormData (formData, subDocumentName) {
    // pass on extracted sub document data from form data 
    //(we use this in one ofs to sort choices selected by user)
    if(!formData) return formData
    if(!formData.hasOwnProperty(subDocumentName)) return formData
    return formData[subDocumentName]
}
 
function constructSubDocumentFrame (fullFrame, subDocumentName, documentClassName,frame, uiFrame, mode, formData, onTraverse, onSelect, documentation, setChainedData) {
    
    //documentClassNamme
    let constructedFrame= fullFrame.hasOwnProperty(documentClassName) ? fullFrame[documentClassName] : {}
    // pass on sub documents filled data 1
    //let subDocumentFormData=(formData && formData.hasOwnProperty(subDocumentName)) ? formData[subDocumentName] : {}
    let subDocumentFormData=getSubDocumentFormData(formData, subDocumentName)
    //let subDocumentFormData=formData
    let subDocumentFrames = getProperties(
        fullFrame,
        documentClassName,
        constructedFrame,
        uiFrame,
        mode,
        subDocumentFormData,
        onTraverse,
        onSelect,
        documentation,
        setChainedData
    )
    // Add @type attribute here only for CREATE & EDIT mode to help in saving to terminusDB
    if(mode !== CONST.VIEW) {
        // add subdocument type as @type field
        subDocumentFrames.properties["@type"]={
            type: "string",
            title: documentClassName,
            default: documentClassName
        }
        // hide @type field
        subDocumentFrames.uiSchema["@type"]={"ui:widget": "hidden"} 
    }
    
    // order is set to place @documentation field at the start of the document
    if(frame) {
        let order=util.getOrderFromMetaData(fullFrame[documentClassName])
        // add @type to ui order else ui order will complain 
        if(order) {
            order.push("@type")
            subDocumentFrames.uiSchema["ui:order"] = order
        }
    }
    return subDocumentFrames
}
 

export function generateInternalFrames(fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation, setChainedData) {
    /** return null if frame doesnt have property in it */
    if(!frame.hasOwnProperty(item)) return null

    if(util.isSubDocumentType(frame[item])) { // Subdocument type
        let documentClassName=util.getLinkedDocumentClassName (frame, item)
        let subDocumentFormData=formData//formData.hasOwnProperty(item) ? formData[item] : {}
        let subDocumentFrame = constructSubDocumentFrame(fullFrame, item, documentClassName, frame, uiFrame, mode, subDocumentFormData, onTraverse, onSelect, documentation, setChainedData) 

        return subDocumentFrame
    }
    else if (util.isChoiceSubDocumentType(frame[item])) {
        let choiceSubDocumentFrame= makeChoiceSubDocumentTypeFrames({fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation})
        return choiceSubDocumentFrame
    }
    else if (util.isEnumType(frame[item])) { 
        let enumFrame= makeEnumTypeFrames(fullFrame, frame, item, uiFrame, mode, formData, documentation)
        return enumFrame
    }
    else if (util.isChoiceDocumentType(frame[item])) {
        let choiceDocumentFrame= makeChoiceDocumentTypeFrames({fullFrame, frame, item, uiFrame, mode, formData, documentation})
        return choiceDocumentFrame
    }
    else if(util.isSysUnitDataType(frame[item])) {
        let sysUnitFrame= makeSysUnitTypeFrames(item, documentation)
        return sysUnitFrame
    }
    else if(util.isOneOfDataType(frame, item)) { 
        let oneOfFrame= makeOneOfTypeFrames(fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation)
        return oneOfFrame
    } 
    /*else if(util.isFeatureCollection(frame[item], mode)) {
        // this is for VIEW mode of FeatureCollection - where we display all of the feature links on a Map 
        // Feature Collection EDIT/ CREATE mode will go to util.isDocumentType()=true frames
        let feautureViewFrames = makeFeatureCollectionTypeFrames(frame, item, uiFrame, mode, formData)
        return feautureViewFrames
    }*/
    else if(util.isDocumentType(frame[item], fullFrame)) {
        let documetFrames=makeDocumentTypeFrames({fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation})
        return documetFrames
    }
    else if (util.isRdfLangString(frame[item])) {
        let rdfLangFrames=makeRDFLangFrames({fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation})
        return rdfLangFrames
    }
    return null

}