import * as CONST from "./constants"

// filter out create new definition 
function getCreateNewDefinition(properties) {
    let createNewDocument=properties["anyOf"].filter(arr => arr.title === CONST.LINK_NEW_DOCUMENT)
    return createNewDocument[0]
}


function processDocumentLinks (args) {

    let { props, properties, uiSchema, definitions } = args

    // Document links
    if(properties.hasOwnProperty(CONST.INFO) && 
        properties[CONST.INFO] === CONST.DOCUMENT)  {

        // check filter method
        let createNewDocument = getCreateNewDefinition(properties)
        
        // if no property defined then add definition
        if(!Object.keys(createNewDocument.properties).length) {
            //add definitions
            let linked_to=properties.linked_to
            if(!definitions.hasOwnProperty(linked_to)) {
                throw new Error ("Something has gone wrong in processing schema for Document Links ...")
            }
            // get Property schema
            createNewDocument.properties=definitions[linked_to].properties
            // get UI Schema
            //uiSchema[props]=uiSchema
            uiSchema[props] = uiSchema
        }
        else {
            for(let props in createNewDocument.properties) {
                properties = createNewDocument.properties[props]
                //uiSchema = uiSchema[props]
                //uiSchema = uiSchema
                let obj = {
                    props: props, 
                    properties: properties, 
                    uiSchema: uiSchema[props], 
                    definitions: definitions
                }
                processDocumentLinks (obj)
            }
        }
    }
}


export function checkForCycle (propertyDefinitions, uiSchema, definitions, mode) {
    let aleterdProperties = {}

    if(mode === CONST.VIEW) return aleterdProperties

    for(let props in propertyDefinitions) {
        let properties=propertyDefinitions[props]
        processDocumentLinks({ props, properties, uiSchema, definitions })
    }
    return aleterdProperties
}