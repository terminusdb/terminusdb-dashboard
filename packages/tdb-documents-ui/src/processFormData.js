import * as CONST from "./constants"
 

/**
 * 
 * @param {*} frame - full frame of data base
 * @param {*} formData - filled form Data
 * @returns checks if formData has a one of field by checking with Schema - if a property is one of then 
 * alter the formData to have @oneOf in it so as work with rjsf one ofs
 * 
 */
export function processData (frame, type, formData) {
    if(!Object.keys(formData).length) return formData

    let processedFormData = {}

    for(let property in formData) {
        if(property === "@id") processedFormData["@id"] = formData["@id"] //keep @id for Edit docs
        else if(property === "@type") processedFormData["@type"] = formData["@type"]// store @type
        else if (typeof formData[property] === CONST.OBJECT_TYPE && Object.keys(formData[property]).length) {
            // if formData[property] is an object & is filled
            console.log(" property ", property, schema)
            let subType=formData[property].hasOwnProperty("@type") ? formData[property]["@type"] : null
            if(!subType) {
                // if subType not available loop inside to see if one ofs exist
                processedFormData[property]=processData (frame, type, formData[property])
            }
        }
        else if(typeof formData[property] === CONST.STRING_TYPE && formData[property]) {
            
        }
        
    }
    console.log("processedFormData", processedFormData)
    return processedFormData
}



export function processFormData (frame, type, formData, setData) { 
    let data = processData (frame, type, formData) 
    if(setData) setData(data)
}

