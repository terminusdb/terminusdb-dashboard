
import * as CONST from "../constants"
import {getProperties} from "../FrameHelpers"

 
 
function getDocumentLayout(choiceSubDocument, args) {
    let {fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation} = args

    let choiceSubDocumentFrame = fullFrame[choiceSubDocument]

    // get documentation from frame
    let extractedDocumentation= choiceSubDocumentFrame.hasOwnProperty(CONST.DOCUMENTATION) ? choiceSubDocumentFrame[CONST.DOCUMENTATION] : []
    let exractedProperties = getProperties(fullFrame, item, choiceSubDocumentFrame, uiFrame, mode, formData, onTraverse, onSelect, extractedDocumentation) 

    //console.log("exractedProperties sub", exractedProperties)
    exractedProperties.properties["@type"]={
        type: "string",
        title: choiceSubDocument,
        default: choiceSubDocument
    } 

    // hide @type field
    exractedProperties.uiSchema["@type"]={"ui:widget": "hidden"} 
    
    let layout = { 
        title: choiceSubDocument,
        //type: CONST.OBJECT_TYPE,
        properties: exractedProperties.properties,
        uiProperties:  exractedProperties.uiSchema
    }
    return layout
}

/**
 * 
 * @param {*} formData - fileld data
 * @param {*} item - property name
 * @returns extracts filled data from form data 
 */
function extractFormData (formData, item) {
    // return false if property is not filled at this point 
    var filledDataType

    // form data can be an array (sets or list) or an object (mandatory or optional)
    if(Array.isArray(formData)) {
        filledDataType=[]
        formData.map(data => {
            filledDataType.push(data.hasOwnProperty("@type") ? data["@type"] : false)
        })
    }
    else {
        // get the type of choice subdocument 
        filledDataType=(formData.hasOwnProperty(item) && formData[item].hasOwnProperty("@type")) ? formData[item]["@type"] : false
    }
    return filledDataType
}

export function getAnyOfSchema(args) {
    let { frame, item, mode, formData }=args
    let anyOfArray=[]
    var filledDataType
 
    if(!frame.hasOwnProperty(item)) {
        throw new Error (`Expected frames to include ${item}, but received undefined ... `)
    }

    // extract form data 
    if(mode !== CONST.CREATE) {
        filledDataType = extractFormData(formData, item)
    }

    /** get all definitions of choices by looping over frame array */
    frame[item].map(choice => {
        var choiceDocument
        if(typeof choice === CONST.OBJECT_TYPE && choice.hasOwnProperty("@class")) {
            choiceDocument=choice["@class"]
        }
        else choiceDocument=choice 

        // when filled data available
        if(mode !== CONST.CREATE && typeof filledDataType === CONST.STRING_TYPE) {
            if(filledDataType === choiceDocument) {
                anyOfArray.push(getDocumentLayout(choiceDocument, args))
            }
        }
        else {
            anyOfArray.push(getDocumentLayout(choiceDocument, args))
        }
    })
    
    //console.log("anyOfArray", JSON.stringify(anyOfArray, null, 2))
    return anyOfArray
}

/**
 * 
 * @param {*} frame - any of choice document frames
 * @param {*} item - property
 * @param {*} formData - data to be displayed
 * @returns a filled array items with any of choice document only with filled info 
 */
export function getChoiceSubDocumentsArrayItems (frame, item, formData) {
    let arrayItems=[]

    if(!formData) return arrayItems
    if(!Array.isArray(formData)) return arrayItems

    formData.map(data => {
        // get the choice which have been added
        let choice = data["@type"]
        frame.properties[item].anyOf.map( any => {
            if(any.title === choice) {
                let chosenAnyOfFrame = any

                // new Item layout
                let newItemLayout = {
                    type: CONST.OBJECT_TYPE,
                    info: CONST.CHOICESUBCLASSES,
                    title: choice,
                    anyOf: [chosenAnyOfFrame]
                }
                arrayItems.push(newItemLayout)
            }
        })
    })
    
    return arrayItems
}

