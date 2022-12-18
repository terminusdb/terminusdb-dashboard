import {CREATE, DATA, VIEW, EDIT, DOCUMENT, DIMENSION, ONEOFSUBDOCUMENTS, ONEOFCLASSES, GEO_CORDINATES} from "../constants"
import {
    getLineStringTypeFilledValues,
    getLineStringCreateEditUI,
    getLineStringTypeViewUI
} from "./lineStringType.utils"

//[[125.6, 10.1], [125.6, 15.1]] // two or more prositions
export function lineStringType (frame, item, uiFrame, mode, formData) {
    console.log("frame .... LS", frame)
    let properties={}, propertiesUI={}

    var  layout= {
        type: "array",
        title: item,
        [DIMENSION]: frame[DIMENSION],
        items: [{
            type: "array",
            items: [{type: "number"}, {type: "number"}]
        }],
        additionalItems: {
            type: "array",
            items: [{type: "number"}, {type: "number"}]
        }
    }

    if(mode === EDIT) {
        layout["items"] = getLineStringTypeFilledValues (formData, item)
    }
    //schema
    properties[item] = layout


    //ui
    if(mode === CREATE) {
        let uiProperties=getLineStringCreateEditUI(item) 
        propertiesUI[item]=uiProperties[item]
    }
    else if(mode === EDIT){
        let uiProperties=getLineStringCreateEditUI(item) 
        propertiesUI[item]=uiProperties[item]
    }
    else {
        console.log("formData line string", formData, item,  frame[DIMENSION])
        let uiProperties=getLineStringTypeViewUI(formData, uiFrame, item, frame[DIMENSION]) 
        propertiesUI[item]=uiProperties[item]
    }

    //custom ui:schema
    if(uiFrame && uiFrame[item]) {
        //propertiesUI[item] = uiFrame[item]
        propertiesUI[item]["ui:title"] = item
    }

    return {properties, propertiesUI}
}