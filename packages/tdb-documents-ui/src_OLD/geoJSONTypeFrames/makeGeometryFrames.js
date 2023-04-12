import {lineStringType} from "./lineStringType"
import {pointType} from "./pointTypeFrames"
import {polygonType} from "./polygonType"
import {multiPolygonType} from "./multiPolygonType"
import {
    LINE_STRING_TYPE_DIMENSION,
    POINT_TYPE_DIMENSION, 
    DIMENSION, 
    LINE_STRING_TYPE, 
    POINT_TYPE,
    POLYGON,
    COORDINATES,
    ARRAY,
    XSD_DECIMAL,
    POLYGON_STRING_TYPE_DIMENSION,
    MULTIPOLYGON
} from "../constants"

// line string
function getLineStringFrames(item, uiFrame, mode, formData) {
    let geometryProperty={}, ui={}
    let lineStringFrame={
        "@class": XSD_DECIMAL,
        [DIMENSION]: LINE_STRING_TYPE_DIMENSION,
        "@type": ARRAY,
        "info": LINE_STRING_TYPE
    }
    ui=lineStringType(lineStringFrame, COORDINATES, uiFrame, mode, formData[item])
   
    geometryProperty={
        "properties": {
            [item]: ui.properties[COORDINATES]
        },
        "propertiesUI": {
            [item]: ui.propertiesUI[COORDINATES]
        }
    }
    return geometryProperty
}

// point 
function getPointFrames(item, uiFrame, mode, formData) {
    let geometryProperty={}, ui={}
    let pointFrame={
        "@class": XSD_DECIMAL,
        [DIMENSION]: POINT_TYPE_DIMENSION,
        "@type": ARRAY,
        "info": POINT_TYPE
    }
    ui=pointType(pointFrame, COORDINATES, uiFrame, mode, formData[item])
   
    geometryProperty={
        "properties": {
            [item]: ui.properties[COORDINATES]
        },
        "propertiesUI": {
            [item]: ui.propertiesUI[COORDINATES]
        }
    }
    return geometryProperty
}

//polygon 
function getPolygonFrames(item, uiFrame, mode, formData) {
    let geometryProperty={}, ui={}
    let polygonFrame={
        "@class": XSD_DECIMAL,
        [DIMENSION]: POLYGON_STRING_TYPE_DIMENSION,
        "@type": ARRAY,
        "info": POLYGON
    }
    ui=polygonType(polygonFrame, COORDINATES, uiFrame, mode, formData[item])
   
    geometryProperty={
        "properties": {
            [item]: ui.properties[COORDINATES]
        },
        "propertiesUI": {
            [item]: ui.propertiesUI[COORDINATES]
        }
    }
    return geometryProperty
}

//MultiPolygon 
function getMultiPolygonFrames(item, uiFrame, mode, formData) {
    let geometryProperty={}, ui={}
    let multiPolygonFrame={
        "@class": XSD_DECIMAL,
        [DIMENSION]: POLYGON_STRING_TYPE_DIMENSION,
        "@type": ARRAY,
        "info": MULTIPOLYGON
    }
    ui=multiPolygonType(multiPolygonFrame, COORDINATES, uiFrame, mode, formData[item])
   
    geometryProperty={
        "properties": {
            [item]: ui.properties[COORDINATES]
        },
        "propertiesUI": {
            [item]: ui.propertiesUI[COORDINATES]
        }
    }
    return geometryProperty
}

// get frames based on geometry array types
function geometryFrames(frame, item, uiFrame, mode, formData) {
    let geometryProperty={}

    if(formData && formData.hasOwnProperty(item)
        && formData[item].hasOwnProperty("@type")) {
        if(formData[item]["@type"] === LINE_STRING_TYPE) { // line string type
            geometryProperty=getLineStringFrames(item, uiFrame, mode, formData) 
        }
        else if(formData[item]["@type"] === POINT_TYPE) { // point type
            geometryProperty=getPointFrames(item, uiFrame, mode, formData) 
        }
        else if(formData[item]["@type"] === POLYGON) { // polygon
            geometryProperty=getPolygonFrames(item, uiFrame, mode, formData) 
        }
        else if(formData[item]["@type"] === MULTIPOLYGON) { // multi polygon
            geometryProperty=getMultiPolygonFrames(item, uiFrame, mode, formData) 
        }
    }
    return geometryProperty
}


export const makeGeometryFrames = (frame, item, uiFrame, mode, formData) => {
    let madeFrames = geometryFrames(frame, item, uiFrame, mode, formData)
    let properties = madeFrames.properties
    let propertiesUI = madeFrames.propertiesUI
    return {properties, propertiesUI}
}