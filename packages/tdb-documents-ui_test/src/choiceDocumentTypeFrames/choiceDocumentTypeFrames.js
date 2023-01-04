
import * as CONST from "../constants"

// choice layout to be filled in any of array 
function getChoiceDocumentLayout (choice) {
    // add documentation part here - review later 
    let layout = {
        "title": choice,
        "properties": {
            [choice]: { 
                "type": CONST.STRING_TYPE
            }
        }
    }
    return layout
}

/** populate any of array with each choice layout */
function getAnyOfArray (frame, item) {
    let anyOfArray = []
    
    frame[item].map(choice => {
        anyOfArray.push(getChoiceDocumentLayout(choice))
    })
    return anyOfArray
}

// mandatory
export function makeChoiceDocumentTypeFrames (args) {
    let uiSchema={}
    let {frame, item, mode}=args

    let anyOf= getAnyOfArray(frame, item)
    return {anyOf, uiSchema}
}


