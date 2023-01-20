import {
    ONEOFVALUES, 
    COORDINATES, 
    CHOICECLASSES, 
    POINT_TYPE, 
    SYS_UNIT_DATA_TYPE
} from "./constants"
import { isDataType } from "./utils"
import * as CONST from "./constants"

// return true if only @type is available
function checkIfNotFilled (json){
    if(!json) return false
    if(Object.keys(json).length === 1 && json.hasOwnProperty("@type")) return true
    return false
}

function extractOneOfValue (formData) {
    // at this point the selected choice by user will be populated in @choice
    if(formData[CONST.ONEOFVALUES].hasOwnProperty("@choice")) {
        let selectedChoice = formData[CONST.ONEOFVALUES]["@choice"]
        if(formData[CONST.ONEOFVALUES].hasOwnProperty(selectedChoice)) {
            return {[selectedChoice]: formData[CONST.ONEOFVALUES][selectedChoice]}
        }
        // mostly at this point - this is going to be a sys_unit type
        return {[selectedChoice]: []}
    }
}

/*
**  mode     - current mode 
**  schema   - schema of document
**  data      - data extracted from form 
**  frame      - frames of data product
**  type  - filled value of the document
*/
export const transformData = (mode, schema, data, frame, type) => {
    var extracted={}
    //let currentFrame=frame[current]
    let formData = data
    for(var key in formData){
        if(formData[key] === undefined) continue // undefined
        else if(key === ONEOFVALUES) { 
            let selectedOneOfValue = extractOneOfValue(formData)
            return selectedOneOfValue
        }
        else if(key === COORDINATES && Array.isArray(formData[key])) {
            // coordinates for geo jsons - we only support POINT TYPE
            return formData
        }
        else if(Array.isArray(formData[key])) {
            // array (sets/ lists)
            let transformedArray = [], transformed
            formData[key].map(fd => {
                // loop over each frames in Set/ List
                if(checkIfNotFilled(fd)) {
                    // object with only @type in it , we dont extract this value as it is not filled
                    //return extracted
                    return
                }
                if(typeof fd === "string" || typeof fd === "number" || typeof fd === "boolean")  { // set of document classes
                    transformedArray.push(fd)
                }
                else {
                    if(fd && fd.hasOwnProperty("info") && fd.info === CHOICECLASSES){
                        let temp = fd
                        delete temp.info
                        // at this stage there should be only 1 elemenet in frame[key]
                        let k = Object.keys(temp)[0]
                        transformed = temp[k]
                    }
                    else {
                        transformed=transformData(mode, schema, fd, frame, type)
                    }
                }
                if(transformed && Object.keys(transformed).length){
                    // choice classes extract 
                    if (schema.hasOwnProperty(key) && 
                        schema[key].items.hasOwnProperty("info") && 
                            schema[key]["items"]["info"] === CHOICECLASSES) {
                                let choiceType=transformed["@type"]
                                let choiceValue=transformed[choiceType]
                                transformed=choiceValue
                            }
                    //else extracted[key]=transformed

                    transformedArray.push(transformed)
                }
            })
            if(Array.isArray(transformedArray) && transformedArray.length === 0) {
                if(schema.hasOwnProperty(key) && 
                    schema[key].hasOwnProperty("info") && 
                    schema[key]["info"] === SYS_UNIT_DATA_TYPE) {
                        extracted[key] = formData[key]
                    }
            }
            else if(Array.isArray(transformedArray) && transformedArray.length) {
                // populate only if not empty
                extracted[key] = transformedArray
            }
        }
        else if(typeof formData[key] !== "string" && Object.keys(formData[key]).length > 1) {
            // objects 
            if(formData[key].hasOwnProperty("info") && formData[key].info === CHOICECLASSES){
                let temp = formData[key]
                delete temp.info
                // at this stage there should be only 1 elemenet in frame[key]
                let k = Object.keys(temp)[0]
                extracted[key] = temp[k]
            }
            else {
                let transformed=transformData(mode, schema, formData[key], frame, type)
                if(key === POINT_TYPE) return transformed
                if(transformed) {
                    // choice classes extract 
                    if (schema.hasOwnProperty(key) && 
                        schema[key].hasOwnProperty("info") && 
                            schema[key]["info"] === CHOICECLASSES) {
                                let choiceType=transformed["@type"]
                                extracted[key]=transformed[choiceType]
                            }
                    else extracted[key]=transformed
                }
            }
        }
        else if(checkIfNotFilled(formData[key])) {
            // object with only @type in it , we dont extract this value as it is not filled - required to store documnets in TerminusDB
            continue
        }
        else if(typeof formData[key] === "string" || typeof formData[key] === "number" || typeof formData[key] === "boolean") {
            // xsd data types
            extracted[key] = formData[key]
        }
        else if(typeof formData[key] === "object") {
                // sys:JSON types
                extracted[key] = formData[key]
        }
    }
    if(checkIfNotFilled(extracted)) return null
    return extracted
}


