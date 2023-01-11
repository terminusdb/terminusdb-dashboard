import React from "react"
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai"
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card';
import * as CONST from "../constants"
import {DataTypeDiff} from "./displayArrayFieldDiffs"

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
export function showRemovedElementChanged(props) { 
    let type=(props.hasOwnProperty("schema") && props.schema.hasOwnProperty(CONST.INFO)) ? props.schema[CONST.INFO] : null
    let format=(props.hasOwnProperty("schema") && props.schema.hasOwnProperty(CONST.FORMAT)) ? props.schema[CONST.FORMAT] : null
    
    return <div className="form-group field field-string w-100">
        <Stack direction="horizontal" className="w-100 diff__removed__icon__spacing">
            <DisplayLabel type={type} label={props.name} format={format}/>
            <DisplayArrayFieldPlaceholder type={type} name={props.name}/>
            {removedIcons("text-success mb-3")}
        </Stack>
        <input className="form-control opacity-0 mb-3" readOnly={true} id={`root_${props.name}`} label={props.name} required="" placeholder="xsd:string" type="text"/>
    </div>
}

// function to show removed element for original 
 export function showRemovedElementOriginal(props) {
    //invisible
    let type=(props.hasOwnProperty("schema") && props.schema.hasOwnProperty(CONST.INFO)) ? props.schema[CONST.INFO] : null
    let format=(props.hasOwnProperty("schema") && props.schema.hasOwnProperty(CONST.FORMAT)) ? props.schema[CONST.FORMAT] : null
    
    return <div className="form-group field field-string w-100 ">
        <Stack direction="horizontal" className="w-100 diff__removed__icon__spacing">
            <DisplayLabel type={type} label={props.name} format={format}/>
            <DisplayArrayFieldPlaceholder type={type} name={props.name}/>
            {removedIcons("text-danger mb-3")}
            <input className="form-control opacity-0" readOnly={true} id={`root_${props.name}`} label={props.name} required="" placeholder="xsd:string" type="text"/>
        </Stack>
    </div>
}

export function showRemovedSubDocument (subDocument, schema, css) {
    let elements =[]
    for(let property in schema.items.properties) {
        if(property === "@type") continue
        if(schema.items.properties[property].info === CONST.DATA_TYPE) {
            elements.push(<DataTypeDiff data={subDocument[property]} css={css} label={property}/>)
        }
    }
    return  <Card bg="secondary" className=" p-4 mt-4 mb-4 tdb__subdocument__card">
        <Card.Body>
            <div className="mt-3 position-absolute">{removedIcons(css)}</div>
            <div className="opacity-0">{elements}</div>
        </Card.Body> 
    </Card>
}
 