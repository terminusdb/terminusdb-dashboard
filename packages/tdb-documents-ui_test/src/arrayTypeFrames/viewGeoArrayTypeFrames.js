import React from "react"
import {MapViewer} from "../maps/mapViewer"
import * as CONST from "../constants"
import * as util from "../utils"

const type = {
    [CONST.POINT_TYPE_DIMENSION]: CONST.POINT_TYPE,
    [CONST.LINE_STRING_TYPE_DIMENSION]: CONST.LINE_STRING_TYPE,
    [CONST.POLYGON_TYPE_DIMENSION]: CONST.POLYGON
}

export function getTypeFromDimension(dimension) {
    return type[dimension]
}



export function displayMapComponent(data, formData, property, type) {     
    let bbox=util.setBounds(formData)

    return <div className="mb-5 w-100">
        <span className="control-label mb-2">{property}</span>
        <MapViewer documents={data} 
            property={property}
            type={type}
            bounds={bbox}/>
    </div>
}

function checkIfFeatureCollection (frame) {
    if(!frame.hasOwnProperty("type")) return  
    if(frame["type"]["@values"][0] === FEATURE_COLLECTION)
        return FEATURE_COLLECTION
}

// display map component at this point 
export function gatherViewUIItems(frame, item, formData, documentation, dimension) {
    let ui={}
    function getMapComponent(props) {
        let data = props.formData
        let property=props.name
        let type=getTypeFromDimension(dimension)
        if(!type) type=checkIfFeatureCollection(frame)
        return displayMapComponent(data, formData, property, type)
    }

    ui = {"ui:field": getMapComponent}
    return ui
}