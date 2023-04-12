
import * as CONST from "../constants"
import {getProperties} from "../FrameHelpers"
import {getDataType} from "../dataTypeFrames/helpers" 

// retrieves layout of sys unit data type one ofs
function getSysUnitTypeLayout(choice) {

    let layout = {
        "title": choice,
        "properties": {
          [choice]: {
            "type": "string",
            "title": choice,
            "default": "[]"
          }
        },
    }

    let uiSchema = {"ui:widget": "hidden"}
    return {layout, uiSchema}
}

// retrieves layout of normal data type one ofs
function getNormalDataTypeLayout(choice, dataType) {

    let layout = {
        "title": choice,
        "properties": {
          [choice]: {
            "type": getDataType(dataType),
            "title": choice
          }
        }
    }
    return layout
}

// return type and title from extractedProperties
function extractPropertyFrames (extractedProperties) {
    let extractedLayout={}
    for(let props in extractedProperties) {
        if(extractedProperties[props]["type"] === CONST.STRING_TYPE) {
            extractedLayout[props] = { 
                type: extractedProperties[props]["type"],
                title: extractedProperties[props]["title"]
            }
        }
        else if(extractedProperties[props]["type"] === CONST.OBJECT_TYPE) {
            extractedLayout[props] = { 
                type: extractedProperties[props]["type"],
                title: extractedProperties[props]["title"],
                properties: extractedProperties[props]["properties"]
            }
        }
        // pass in default type here 
        if(props === "@type") extractedLayout[props]["default"]=extractedProperties[props]["default"]
    }
    return extractedLayout
}
 
// retrieves layout of object data types one ofs
function getDocumentLayout(choiceDocument, choiceDocumentFrames, oneOfLinkedClassName, args) {
    let {fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation, docType} = args

    let choiceSubDocument=choiceDocumentFrames.hasOwnProperty("@class") ? choiceDocumentFrames["@class"] : choiceDocumentFrames
    let choiceSubDocumentFrame = fullFrame[choiceSubDocument]
 
    // get documentation from frame
    let extractedDocumentation= choiceSubDocumentFrame.hasOwnProperty(CONST.DOCUMENTATION) ? choiceSubDocumentFrame[CONST.DOCUMENTATION] : []
    let exractedProperties = getProperties(fullFrame, item, choiceSubDocumentFrame, uiFrame, mode, formData, onTraverse, onSelect, extractedDocumentation, docType) 

    console.log("exractedProperties sub", exractedProperties)
    exractedProperties.properties["@type"]={
        type: "string",
        title: choiceSubDocument,
        default: choiceSubDocument
    } 

    // hide @type field
    exractedProperties.uiSchema["@type"]={"ui:widget": "hidden"} 
    let uiSchema=exractedProperties.uiSchema
    
    let layout= {
        title: choiceDocument,
        properties: {
            [choiceDocument]: {
                title: choiceDocument,
                properties: extractPropertyFrames(exractedProperties.properties)
            },
            "@type": { 
                type: "string",
                title: oneOfLinkedClassName,
                default: oneOfLinkedClassName
            }
        }
    }

    let layout_o = {
        //title: choiceSubDocument,
        title: choiceDocument,
        properties: extractPropertyFrames(exractedProperties.properties)
    }
    return {layout, uiSchema}
}


export function getAnyOfSchema(args) {
    let { frame, fullFrame, item, mode, formData }=args
    let anyOfArray=[], anyOfUiSchema={}

    let oneOfLinkedClassName=frame[item]["@class"]
    let oneOfLinkedClassFrame=fullFrame[oneOfLinkedClassName]
 
    if(!frame.hasOwnProperty(item)) {
        throw new Error (`Expected frames to include ${item}, but received undefined ... `)
    }


    /** get all definitions of choices by looping over frame array */
    let oneOfChoices=oneOfLinkedClassFrame["@oneOf"][0] // one of will have only array length 1
    for(let choice in oneOfChoices) {
        if(typeof oneOfChoices[choice] === CONST.OBJECT_TYPE && 
            oneOfChoices[choice].hasOwnProperty("@class")) {
                let  {layout, uiSchema} =getDocumentLayout(choice, oneOfChoices[choice], oneOfLinkedClassName, args)
                anyOfUiSchema[choice]=uiSchema
                anyOfArray.push(layout)
        }
        else if(typeof oneOfChoices[choice] === CONST.STRING_TYPE) {
            if(fullFrame.hasOwnProperty(oneOfChoices[choice])) {
                let  {layout, uiSchema} =getDocumentLayout(choice, oneOfChoices[choice], oneOfLinkedClassName, args)
                anyOfUiSchema=uiSchema
                anyOfArray.push(layout)
            }
            else if(oneOfChoices[choice] === CONST.SYS_UNIT_DATA_TYPE) {
                let {layout, uiSchema} = getSysUnitTypeLayout(choice)
                anyOfUiSchema[choice]=uiSchema
                anyOfArray.push(layout)
            }
            else anyOfArray.push(getNormalDataTypeLayout(choice, oneOfChoices[choice]))
        }

    }
    //console.log("anyOfArray", anyOfArray, anyOfUiSchema)
    return {anyOfArray, anyOfUiSchema}
}

/**
 * 
 * @param {*} frame - any of choice document frames
 * @param {*} item - property
 * @param {*} formData - data to be displayed
 * @returns a filled array items with any of choice document only with filled info 
 */
export function getOneOfTypeArrayItems (frame, item, formData) {
    let arrayItems=[]

    if(!formData) return arrayItems
    if(!Array.isArray(formData)) return arrayItems

    formData.map(data => {
        // get the choice which have been added
        //let choice = data["@type"]
        for(let props in data) {
            if(props === "@id") continue
            else if(props === "@type") continue
            else {
                let choice = props
                frame.properties[item].anyOf.map( any => {
                    if(any.title === choice) {
                        let chosenAnyOfFrame = any

                        // new Item layout
                        let newItemLayout = {
                            type: CONST.OBJECT_TYPE,
                            info: CONST.ONEOFVALUES,
                            title: choice,
                            anyOf: [chosenAnyOfFrame]
                        }
                        arrayItems.push(newItemLayout)
                    }
                })
            }
        }
        
    })
    
    return arrayItems
}

