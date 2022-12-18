import * as CONST from "../constants"
import {getProperties} from "../FrameHelpers"

function getOneOfDocumentLayout(fullFrame, oneOfDocumentName, oneOfDocumentFrame, uiFrame, mode, formData, onTraverse, onSelect, documentation) {
    
    let oneOfDocumentData = formData.hasOwnProperty(oneOfDocumentName) ? formData[oneOfDocumentName] : {}
    let exractedProperties = getProperties(fullFrame, oneOfDocumentName, oneOfDocumentFrame, uiFrame, mode, oneOfDocumentData, onTraverse, onSelect, documentation) 
    
    return exractedProperties
}



// mandatory
export function makeOneOfTypeFrames (fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation) {
    let properties={}, uiSchema={}, exractedProperties={}

    //getOneOfDocumentLayout(fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation)
    let oneOf = []
    frame[item].map(oneOfs => {
        for(let oneOfDoc in oneOfs) {
            let oneOfDocumentName=oneOfDoc
            let oneOfDocumentFrame={[oneOfDocumentName]: oneOfs[oneOfDoc]}
            exractedProperties=getOneOfDocumentLayout(fullFrame, oneOfDocumentName, oneOfDocumentFrame, uiFrame, mode, formData, onTraverse, onSelect, documentation)
            oneOf.push({
                "title": oneOfDocumentName,
                "type": CONST.OBJECT_TYPE,
                "properties": exractedProperties.properties,
                "required": [oneOfDocumentName]
            })
        }
    })
    
    
    //properties ={
        //"type": CONST.OBJECT_TYPE,
        //"oneOf": oneOfArray
    //}

   
        /*"oneOf": [
          {
            "properties": {
              "lorem": {
                "type": "string"
              }
            }
          },
          {
            "properties": {
              "ipsum": {
                "type": "string"
              }
            }
          }
        ]*/
    console.log("oneOf", oneOf)
    return {oneOf, uiSchema} 
}
