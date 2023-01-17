import React from "react"
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai"
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card';
import * as CONST from "../constants"
import {DataTypeDiff} from "./displayArrayFieldDiffs"
import {ChoiceDocumentPlaceholder} from "./choiceDocumentDiffComponents"

// display label in special cases
const DisplayLabel = ({type, label, format}) => {
    if(type === CONST.DOCUMENT) return <label className="control-label" htmlFor={`root_${label}`}>
        <span>{label}</span>
    </label>
    // xsd:anyURI
    if(type === CONST.DATA_TYPE && format === CONST.URI) return <label className="control-label" htmlFor={`root_${label}`}>
        <span>{label}</span>
    </label>

    return <div/>
}

// function to display minus icons
export function removedIcons(css) {
    return <div className={`ms-auto ${css} w-100`}>
        <AiFillMinusCircle/>
        <AiFillMinusCircle/>
        <AiFillMinusCircle/>
    </div>
} 

// function to display set/ list control label placeholder of support lauput of diffs
const DisplayArrayFieldPlaceholder = ({type, name}) => {
    if(type) return <div/>
    return <div className="opacity-0 control-label">{name}</div>
}

// function to show removed element for changed
export function showRemovedElementChanged(elementsToPopulate, props) { 
    let type=(props.hasOwnProperty("schema") && props.schema.hasOwnProperty(CONST.INFO)) ? props.schema[CONST.INFO] : null
    let format=(props.hasOwnProperty("schema") && props.schema.hasOwnProperty(CONST.FORMAT)) ? props.schema[CONST.FORMAT] : null
    let name=props && props.hasOwnProperty("name") ? props.name : ""


    if(type === CONST.CHOICESUBCLASSES) {
        return <ChoiceDocumentPlaceholder name={name}
            type={type}
            elementsToPopulate={elementsToPopulate}
            css={"text-success"}/>
    }

    return <div className="form-group field field-string w-100">
        <Stack direction="horizontal" className="w-100 diff__removed__icon__spacing">
            <DisplayLabel type={type} label={name} format={format}/>
            <DisplayArrayFieldPlaceholder type={type} name={name}/>
            {removedIcons("text-success mb-3")}
        </Stack>
        <input className="form-control opacity-0 mb-3" readOnly={true} id={`root_${name}`} label={name} required="" placeholder="xsd:string" type="text"/>
    </div>
}



// function to show removed element for original 
// elementsToPopulate shows placeholders for number of properties in the case of choice subdocuments
 export function showRemovedElementOriginal(elementsToPopulate, props) {
    //invisible 
    let type=(props && props.hasOwnProperty("schema") && props.schema.hasOwnProperty(CONST.INFO)) ? props.schema[CONST.INFO] : null
    let format=(props && props.hasOwnProperty("schema") && props.schema.hasOwnProperty(CONST.FORMAT)) ? props.schema[CONST.FORMAT] : null
    let name=props && props.hasOwnProperty("name") ? props.name : ""

    if(type === CONST.CHOICESUBCLASSES) {
        return <ChoiceDocumentPlaceholder name={name}
            type={type}
            elementsToPopulate={elementsToPopulate}
            css={"text-danger"}
            />
    }

    return <div className="form-group field field-string w-100 ">
        <Stack direction="horizontal" className="w-100 diff__removed__icon__spacing">
            <DisplayLabel type={type} label={name} format={format}/>
            <DisplayArrayFieldPlaceholder type={type} name={name}/>
            {removedIcons("text-danger mb-3")}
            <input className="form-control opacity-0" readOnly={true} id={`root_${name}`} label={name} required="" placeholder="xsd:string" type="text"/>
        </Stack>
    </div>
}

/**
 * 
 * @returns hidden placeholder element when subdocument or choice sub document have been removed
 */
const DisplaySubHiddenElements = ({frameProperties, placeholder, css}) => {
    let elements =[]
    for(let property in frameProperties) {
        if(property === "@type") continue
        if(frameProperties[property].info === CONST.DATA_TYPE) {
            elements.push(<DataTypeDiff data={placeholder} css={css} label={property}/>)
        }
        else if(frameProperties[property].info === CONST.DOCUMENT) {
            elements.push(<LinkTypeDiff data={placeholder} css={css} label={property}/>)
        }
    }
    return  <Card bg="secondary" className=" p-4 mt-4 mb-4 tdb__subdocument__card">
        <Card.Body>
            <div className="mt-3 position-absolute">{removedIcons(css)}</div>
            <div className="opacity-0">{elements}</div>
        </Card.Body> 
    </Card>
}

/**
 * 
 * @param {*} subDocument plcaeholders
 * @param {*} schema schema
 * @param {*} css classnames for css
 * @returns retuns removed sub document placeholder 
 */
export function showRemovedSubDocument (schema, css) {
    // pass schema.items.title as dummy placehodlers 
    return <DisplaySubHiddenElements frameProperties={schema.items.properties} 
            placeholder={schema.items.title}
            css={css}/>
}

/**
 * 
 * @param {*} subDocument 
 * @param {*} schema 
 * @param {*} css 
 * @returns 
 */
export function showRemovedChoiceSubDocument (schema, css) {

    // use additional items schema to cater for properties which dont exist 
    let choiceFrame = schema.additionalItems["anyOf"][0]

    // pass choiceFrame.title as dummy placehodlers 
    return <>
        <input value={choiceFrame.title} className={`form-control tdb__input mb-3 mt-2 opacity-0`} readOnly/>
        <DisplaySubHiddenElements frameProperties={choiceFrame.properties} 
            placeholder={choiceFrame.title}
            css={css}/>
    </>
}
 