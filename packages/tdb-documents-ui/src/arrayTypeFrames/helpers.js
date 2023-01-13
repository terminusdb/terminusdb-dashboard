import * as CONST from "../constants"


// constants for geo types 
export const POINT_TYPE_UI_LAYOUT=[
    { 
        "ui:placeholder": `Enter latitude ...`,
        classNames: "tdb__input mb-3"
    },
    {
        "ui:placeholder": `Enter longitude ...`, 
        classNames: "tdb__input mb-3"
    }
]
export const POINT_TYPE_LAYOUT = [{type: "number"}, {type: "number"}]
export const LINE_TYPE_UI_LAYOUT={
    "items" : POINT_TYPE_UI_LAYOUT,
    "classNames": "d-block tdb__input",
    "ui:description": "Enter multiple coordinates to make a line string",
}
export const POLYGON_TYPE_UI_LAYOUT={
    "items" : POINT_TYPE_UI_LAYOUT,
    "classNames": "d-block tdb__input",
    "ui:description": "Enter multiple coordinates to make a polygon",
}

export function gatherAdditionalUIItems(dimension) {
    if(dimension === CONST.LINE_STRING_TYPE_DIMENSION) {
        return LINE_TYPE_UI_LAYOUT
    }
}

export function getherUIItems (dimension) {
    if(dimension === CONST.POINT_TYPE_DIMENSION) {
        return POINT_TYPE_UI_LAYOUT
    }
    if(dimension === CONST.LINE_STRING_TYPE_DIMENSION) {
        return LINE_TYPE_UI_LAYOUT
    }
}

export function gatherAdditionalItems(dimension) {
    if(dimension === CONST.LINE_STRING_TYPE_DIMENSION) {
        return {
            "type": "array",
            "items": POINT_TYPE_LAYOUT
        }
    }
}

