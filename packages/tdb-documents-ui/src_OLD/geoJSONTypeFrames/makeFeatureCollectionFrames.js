import React from "react"
import {GeoJSONLeafletMap} from "../maps/geoJSONLeafletMap"


function alterFormData(data) {
    let featureArray=[]
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

function getFeatureCollectionTypeViewUI(formData, item) {
	let ui = {}
    
    function getMapComponent(props) {
        let featureCollectionData = {
            "type": "FeatureCollection",
            "features":alterFormData(formData[item])
        }

		return <React.Fragment>
            <span>{props.name}</span>
            <GeoJSONLeafletMap geojsonFeature={featureCollectionData}/>
        </React.Fragment>
    }
    ui[item] = {"ui:field": getMapComponent}
    return ui
}

function featureCollectionFrames (frame, item, uiFrame, mode, formData) {
    let properties={}, propertiesUI={}

    console.log("formData", formData, item)

    let layout= {
        type: "object",
        title: item
    }

    properties[item]=layout
    let ui=getFeatureCollectionTypeViewUI(formData, item) 
    propertiesUI[item]=ui[item]

    return {properties, propertiesUI}
}


export const makeFeatureCollectionFrames = (frame, item, uiFrame, mode, formData) => {
    let madeFrames = featureCollectionFrames(frame, item, uiFrame, mode, formData)
    let properties = madeFrames.properties
    let propertiesUI = madeFrames.propertiesUI
    return {properties, propertiesUI}
}