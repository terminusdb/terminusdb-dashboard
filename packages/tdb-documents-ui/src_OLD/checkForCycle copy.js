import * as CONST from "./constants"


function processDocumentLinks(properties, property, uiSchema, definitions, type) {
    // check only for Document links 
    if(properties[property].hasOwnProperty(CONST.INFO) && 
        properties[property][CONST.INFO] === CONST.DOCUMENT) {
        
        // get linked to document 
        let linked_to = properties[property][CONST.LINKED_TO]
        if(!linked_to) {
            throw new Error ("Something has gone wrong in processing schema for Document Links ...")
        }

        if(!Object.keys(properties[property]["anyOf"][1]["properties"]).length) {
            // add properties of create new frames 
            properties[property]["anyOf"][1]["properties"]=definitions[linked_to].properties
            // add ui schema of create new frames 
            if (uiSchema)  {
                if(uiSchema.hasOwnProperty(property) && !uiSchema[property].hasOwnProperty(property)) {
                    uiSchema[property][property]=definitions[linked_to].uiSchema
                    uiSchema[property][property]["@type"] = { "ui:widget": "hidden" } 
                }
                // hide @type
                if(uiSchema.hasOwnProperty(property) && uiSchema[property].hasOwnProperty(property) && !uiSchema[property].hasOwnProperty("@type")) {
                    uiSchema[property]["@type"] = { "ui:widget": "hidden" } 
                    uiSchema[property]=definitions[linked_to].uiSchema
                }
            }
        }
        // loop on
        else checkForCycle (properties[property]["anyOf"][1]["properties"], uiSchema[property], definitions, linked_to)
    
        //else checkForCycle (properties[property]["anyOf"][1]["properties"], uiSchema[property], definitions, linked_to)
    }
    else if (properties[property].hasOwnProperty(CONST.INFO) && 
        properties[property][CONST.INFO] === CONST.SUBDOCUMENT_TYPE) {
        for(let subProperties in properties[property].properties) {
            let subDocumentProperties = properties[property].properties
            processDocumentLinks(subDocumentProperties, subProperties, uiSchema, definitions, type)
        }
    }
}

export function checkForCycle (properties, uiSchema, definitions, type) {
    let aleterdProperties = {}
    for(let props in properties) {
        processDocumentLinks(properties, props, uiSchema, definitions, type)
        // check only for Document links 
        /*if(properties[props].hasOwnProperty(CONST.INFO) && 
            properties[props][CONST.INFO] === CONST.DOCUMENT) {
                
                // get linked to document 
                let linked_to = properties[props][CONST.LINKED_TO]
                if(!linked_to) {
                    throw new Error ("Something has gone wrong in processing schema for Document Links ...")
                }

                if(!Object.keys(properties[props]["anyOf"][1]["properties"]).length) {
                    // add properties of create new frames 
                    properties[props]["anyOf"][1]["properties"]=definitions[linked_to].properties
                    // add ui schema of create new frames 
                    if(!uiSchema[props].hasOwnProperty(props)) {
                        uiSchema[props][props]=definitions[linked_to].uiSchema
                        uiSchema[props][props]["@type"] = { "ui:widget": "hidden" } 
                    }
                    if(uiSchema[props].hasOwnProperty(props) && !uiSchema[props].hasOwnProperty("@type")) {
                        uiSchema[props]["@type"] = { "ui:widget": "hidden" } 
                        uiSchema[props]=definitions[linked_to].uiSchema
                    }
                }
                // loop on
                else checkForCycle (properties[props]["anyOf"][1]["properties"], uiSchema[props], definitions, linked_to)
        }*/
    }
    return aleterdProperties
}