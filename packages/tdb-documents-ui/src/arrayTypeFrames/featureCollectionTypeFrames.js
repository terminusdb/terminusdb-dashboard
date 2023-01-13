import React from "react"
import * as CONST from "../constants"
import {displayMapComponent} from "../arrayTypeFrames/viewGeoArrayTypeFrames"


function alterFormData(data) {
    let featureArray=[]
    if(!Array.isArray(data)) return data 
    data.map(item => {
        let altered={}
        altered={
            type: "Feature",
            id: item["@id"],
            geometry: {
                coordinates: item["geometry"]["coordinates"],
                type: item["geometry"]["type"]
            }
        }
        if(item.hasOwnProperty("properties")) {
            altered["properties"]=item["properties"]
        }
        featureArray.push(altered)
    })
    return featureArray
}

export function getUILayout (extractedFrames, frame, item, uiFrame, mode, formData, onSelect, onTraverse, documentation) {
    let ui={}
    
    ui = {"ui:field": getGeoCollectionMapComponent}
    return ui
}




export function makeFeatureCollectionTypeFrames(fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation) {
    
    

    let layout= {
        type: CONST.OBJECT_TYPE
    }
    
    function getGeoCollectionMapComponent(props) {
        let data = props.formData
    
        //if(!formData.hasOwnProperty(item)) return <div/>

        let featureCollectionData = {
            "type": CONST.FEATURE_COLLECTION,
            "features": alterFormData(data)
        }
    
        //console.log("featureCollectionData", featureCollectionData)
    
        let property=props.name
        return displayMapComponent(featureCollectionData, formData, property, CONST.FEATURE_COLLECTION)
    }

    let uiLayout ={"ui:field": getGeoCollectionMapComponent}


    return {layout, uiLayout}
}
