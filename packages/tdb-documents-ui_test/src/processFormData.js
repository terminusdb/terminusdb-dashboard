import * as CONST from "./constants"

// normal one ofs 
function addOneOfProperty(formData, property, processedFormData) {
    processedFormData[property]={}

    for(let props in formData[property]) {
        if(props === "@id") continue//processedFormData[property][props]=formData[property][props]
        else if (props === "@type") processedFormData[property][props]=formData[property][props]
        else {
            // add oneof property here to form data so as to work with edit/ view mode of rjsf (oneOfs)
            processedFormData[property][CONST.ONEOFVALUES]={}
            processedFormData[property][CONST.ONEOFVALUES][props] = extractChoiceFilledData(formData[property][props])
            processedFormData[property][CONST.ONEOFVALUES]["@choice"]= props
        } 
    }
}

/** remove id from EDIT if available */
function extractChoiceFilledData (choiceFormData) {
    let extracted = {}
    for(let props in choiceFormData) {
        if(props === "@id") continue
        else if(typeof choiceFormData[props] === CONST.OBJECT_TYPE) extracted[props]=extractChoiceFilledData(choiceFormData[props])
        else extracted[props]=choiceFormData[props]
    }
    return extracted
}


// Array one ofs
function addOneOfArrayProperty(formData, property, index, processedFormData) {
    processedFormData[property]={}

    for(let props in formData[property][index]) {
        if(props === "@id") continue//processedFormData[property][props]=formData[property][index][props]
        else if (props === "@type") processedFormData[property][props]=formData[property][index][props]
        else {
            // add oneof property here to form data so as to work with edit/ view mode of rjsf (oneOfs)
            processedFormData[property][CONST.ONEOFVALUES]={}
            //processedFormData[property][CONST.ONEOFVALUES][props] = formData[property][index][props]
            processedFormData[property][CONST.ONEOFVALUES][props] = extractChoiceFilledData(formData[property][index][props])
            processedFormData[property][CONST.ONEOFVALUES]["@choice"]= props
        }
    }
}
/**
 * 
 * @param {*} frame - full frame of data base
 * @param {*} formData - filled form Data
 * @returns checks if formData has a one of field by checking with Schema - if a property is one of then 
 * alter the formData to have @oneOf in it so as work with rjsf one ofs
 * 
 */
export function processFormData (frame, type, formData) {
    if(!Object.keys(formData).length) return formData

    let processedFormData = {}

    for(let property in formData) {
        if(property === "@id") continue//processedFormData["@id"] = formData["@id"]
        else if(property === "@type") processedFormData["@type"] = formData["@type"]
        else if (Array.isArray(formData[property]) && formData[property].length) {
            processedFormData[property]=[]

            formData[property].map((arr, index) => {

                let subType=arr["@type"]
                // check frame for one ofs
                if(frame && frame.hasOwnProperty(subType) &&
                    frame[subType].hasOwnProperty(CONST.ONEOFVALUES)) {
                    //console.log("found the thingi ...", subType)
                    let eachProcessedFormData={}
                    addOneOfArrayProperty(formData, property, index, eachProcessedFormData)
                    processedFormData[property].push(eachProcessedFormData[property])
                }
                /*else if(frame && frame.hasOwnProperty(type) && 
                    frame[type].hasOwnProperty(CONST.ONEOFVALUES)) {
                    processedFormData[CONST.ONEOFVALUES]={}
                    processedFormData[CONST.ONEOFVALUES]={[property]: formData[property]}
                }*/
                else {
                    // normal data types
                    processedFormData[property] = formData[property]
                }


            })
        }
        else if(typeof formData[property] === CONST.OBJECT_TYPE && Object.keys(formData[property]).length) {
            let subType=formData[property]["@type"]
            // check frame for one ofs
            if(frame && frame.hasOwnProperty(subType) &&
                frame[subType].hasOwnProperty(CONST.ONEOFVALUES)) {
                //console.log("found the thingi ...", subType)
                addOneOfProperty(formData, property, processedFormData)
            }
            else if(frame && frame.hasOwnProperty(type) && 
                frame[type].hasOwnProperty(CONST.ONEOFVALUES)) {
                processedFormData[CONST.ONEOFVALUES]={}
                processedFormData[CONST.ONEOFVALUES]={[property]: formData[property]}
            }
            else {
                processedFormData[property] = processFormData (frame, property, formData[property])
            }
        }
        else {
            if(frame && frame.hasOwnProperty(type) && 
                frame[type].hasOwnProperty(CONST.ONEOFVALUES)) {
                    processedFormData[CONST.ONEOFVALUES]={}
                    processedFormData[CONST.ONEOFVALUES]={[property]: formData[property]}
                }
            else processedFormData[property] = formData[property]
        }
    }
    //console.log("processedFormData", processedFormData)
    return processedFormData
}


