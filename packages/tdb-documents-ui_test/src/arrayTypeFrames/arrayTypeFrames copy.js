import { generateLabel } from "../helpers/labelHelper"
import * as CONST from "../constants"
import * as helper from "./helpers"
import {ArrayFieldTemplate} from "../arrayFrames/templates"
import {gatherViewUIItems} from "./viewGeoArrayTypeFrames"

/** gather items for array  */
function gatherItems (item, dimension) {
    if(dimension === CONST.POINT_TYPE_DIMENSION) {
        return helper.POINT_TYPE_LAYOUT
    }

    if(dimension === CONST.LINE_STRING_TYPE_DIMENSION) {
        return [{
            "type": "array",
            "items": helper.POINT_TYPE_LAYOUT
        }]
    }

    if(dimension === CONST.POLYGON_TYPE_DIMENSION) {
        let polygon = []

        let polygonLayout= {
            type: "array",
            title: item,
            [CONST.DIMENSION]: dimension,
            items: [{
                type: "array",
                items: helper.POINT_TYPE_LAYOUT
            }],
            additionalItems: {
                type: "array",
                items: helper.POINT_TYPE_LAYOUT
            }
        }

        polygon.push(polygonLayout)
        return polygon
    }
}

/** gather ui items for array  */
function gatherUIItems (frame, item, documentation, dimension) {
    let generatedLabel=generateLabel(frame, item, documentation)

    if(dimension >= CONST.POLYGON_TYPE_DIMENSION) {
        // polygon and multipolygon @dimensions = 3
        let uiPolygon = {
            "items": helper.POINT_TYPE_UI_LAYOUT
        }
        return {
            "ui:title": generatedLabel, 
            "items": {
                "ui:ArrayFieldTemplate": ArrayFieldTemplate,
                "ui:options" : {
                    addable: true,
                    orderable: true,
                    removable: true
                },
                "items" : uiPolygon,
                "additionalItems": helper.POLYGON_TYPE_UI_LAYOUT
            }
        }
    }
    else {
        // for points and line strings
        // @dimensions < 3
        return {
            "ui:title": generatedLabel, 
            "classNames": "tdb__geo__input",
            "ui:options" : {
                addable: true,
                orderable: true,
                removable: true 
            },
            "ui:ArrayFieldTemplate": ArrayFieldTemplate,
            "items": helper.getherUIItems(dimension),
            "additionalItems": helper.gatherAdditionalUIItems(dimension)
        }
    }
}

// EDIT & CREATE
function makeEditableGeoArrayTypeFrames (args) {
    let layout={}, uiLayout={}
    let { frame, item, documentation }=args

    let dimension=frame[item][CONST.DIMENSION]
    
    layout= {
        type: "array",
        title: item,
        [CONST.DIMENSION]: dimension, 
        items: gatherItems(item, dimension)
    }

    if(dimension === CONST.LINE_STRING_TYPE_DIMENSION) {
        layout["additionalItems"]=helper.gatherAdditionalItems(dimension)
    }

    uiLayout = gatherUIItems(frame, item, documentation, dimension)
    return {layout, uiLayout}
}

// VIEW 
function makeViewGeoArrayTypeFrames (args) {
    let layout={}, uiLayout={}
    let { frame, item, documentation, formData }=args

    let dimension=frame[item][CONST.DIMENSION]
    
    layout= {
        type: "object",
        title: item,
        [CONST.DIMENSION]: dimension, 
        properties: {
            type: CONST.STRING_TYPE
        }
    }

    uiLayout = gatherViewUIItems(frame, item, formData, documentation, dimension)
    return {layout, uiLayout}
}


export function makeArrayTypeFrames (args) {
    let { mode }=args
    if(mode !== CONST.VIEW) {
        return makeEditableGeoArrayTypeFrames(args)
    }
    // in View mode display Map Viewer
    return makeViewGeoArrayTypeFrames(args)
}