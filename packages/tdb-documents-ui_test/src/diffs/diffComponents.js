import React from "react"
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai"
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card';
import * as CONST from "../constants"
import {DataTypeDiff} from "./displayArrayFieldDiffs"

export function removedIcons(css) {
    return <div className={`ms-auto ${css} w-100`}>
        <AiFillMinusCircle/>
        <AiFillMinusCircle/>
        <AiFillMinusCircle/>
    </div>
}

// function to show removed element for changed
export function showRemovedElementChanged(props) { 
    return <div className="form-group field field-string w-100 mb-3">
        <Stack direction="horizontal" gap={5} className="w-100 ">
            <label className="control-label" htmlFor={`root_${props.name}`}>
                <span>{props.name}</span>
                {props.required && <span className="required">*</span>}
            </label>
            {removedIcons("text-success")}
        </Stack>
        <input className="form-control opacity-0" readOnly={true} id={`root_${props.name}`} label={props.name} required="" placeholder="xsd:string" type="text"/>
    </div>
}

// function to show removed element for original 
 export function showRemovedElementOriginal(props) {
    return <div className="form-group field field-string w-100 mb-3">
        <Stack direction="horizontal" gap={5} className="w-100">
            <label className="control-label" htmlFor={`root_${props.name}`}>
                <span>{props.name}</span>
                {props.required && <span className="required">*</span>}
            </label>
            {removedIcons("text-danger")}
        </Stack>
        <input className="form-control opacity-0" readOnly={true} id={`root_${props.name}`} label={props.name} required="" placeholder="xsd:string" type="text"/>
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
 