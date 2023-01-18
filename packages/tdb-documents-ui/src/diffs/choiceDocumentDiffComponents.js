import React from "react"
import {removedIcons} from "./diffComponents"
import {Card} from "react-bootstrap"

/** CHOCIE SUB DOCS  */
/**
 * 
 * @param {*} param0 - @after elements from diff
 * @returns returns placeholders for number of @after fields which were removed
 */
const DisplayChoiceDocumentPlaceholder = ({elementsToPopulate}) => {
    let elements=[]
    for(let key in elementsToPopulate) {
        elements.push(
            <input className="form-control removed__choice__subdoc__fields opacity-0"  
                readOnly={true} 
                id={`root_${key}`} 
                label={key} 
                placeholder="xsd:string" 
                type="text" 
                value={key}/>
        )
    }
    return <div className="d-block">{elements}</div>
}

/**
 * 
 * @param {*} name property name
 * @param {*} type choice type
 * @param {*} elementsToPopulate number of fields as placeholders (we hide this from UI)
 * @param {*} css class names
 * @returns  
 */
export const ChoiceDocumentPlaceholder = ({name, type, elementsToPopulate, css}) => {
    return  <div className="field field-string w-100 removed__choiceSubDocs">
        {removedIcons(`${css} mb-3 ml-3 `)}
        <span className="opacity-0">{name}</span>
        <input className="form-control opacity-0"  
            readOnly={true} 
            placeholder="xsd:string" 
            type="text" 
            value={elementsToPopulate["@type"]}/>
        <Card bg="secondary" className=" p-4 mt-4 mb-4 opacity-0">
            <Card.Body>
                <DisplayChoiceDocumentPlaceholder type={type} name={name} elementsToPopulate={elementsToPopulate}/>
            </Card.Body> 
        </Card>
    </div>
}