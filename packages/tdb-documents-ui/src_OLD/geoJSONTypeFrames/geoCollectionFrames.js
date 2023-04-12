import {featureCollectionType} from "./featureCollectionTypeFrames"

function geoCollectionTypeFrames (frame, item, uiFrame, mode, formData) {
    return featureCollectionType(frame[item], item, uiFrame, mode, formData)
}


export const makeGeoCollectionFrames = (frame, item, uiFrame, mode, formData) => {
    let madeFrames = geoCollectionTypeFrames(frame, item, uiFrame, mode, formData)
    let properties = madeFrames.properties
    let propertiesUI = madeFrames.propertiesUI
    return {properties, propertiesUI}
}