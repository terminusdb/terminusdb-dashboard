import {
    ONEOFVALUES, 
    COORDINATES, 
    CHOICECLASSES, 
    POINT_TYPE, 
    SYS_UNIT_DATA_TYPE
} from "./constants"
import { isDataType } from "./utils"

// return true if only @type is available
function checkIfNotFilled (json){
    if(Object.keys(json).length === 1 && json.hasOwnProperty("@type")) return true
    return false
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
            //@oneOf
            let sysUnit=false, newOneOfData={}
            for(var oneOf in formData[key]) {
                if(formData[key][oneOf] === SYS_UNIT_DATA_TYPE) {
                    sysUnit=oneOf
                    break
                }
            }
            if(sysUnit) {
                newOneOfData = {
                    [sysUnit]: []
                }
            }
            else {
                let oneOfData=formData[key]
                if(oneOfData.hasOwnProperty("@choice") && !isDataType(oneOfData["@type"])) {
                    let choice = oneOfData["@choice"]
                    let choiceData = {}
                    for(var cds in oneOfData) {
                        if(cds !== "@choice") {
                            choiceData[cds]= oneOfData[cds]
                        }
                    }
                    newOneOfData = {
                        [choice]: choiceData
                    }
                }
                else {
                    // normal data types
                    let choice=oneOfData["@choice"]
                    newOneOfData={
                        [choice]: oneOfData[choice]
                    }
                }
                
            }
            return newOneOfData
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
                    if(fd.hasOwnProperty("info") && fd.info === CHOICECLASSES){
                        let temp = fd
                        delete temp.info
                        // at this stage there should be only 1 elemenet in frame[key]
                        let k = Object.keys(temp)[0]
                        transformed = temp[k]
                    }
                    else transformed=transformData(mode, schema, fd, frame, type)
                }
                if(transformed && Object.keys(transformed).length)
                    transformedArray.push(transformed)
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
                if(transformed) extracted[key]=transformed
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


