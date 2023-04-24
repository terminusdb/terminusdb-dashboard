
import React, {useState, useEffect} from "react"
import "leaflet-arrowheads"
import L from "leaflet"
import * as CONST from "../constants"
import { pointMapViewer } from "./pointMapView"
import { lineStringMapViewer } from "./lineStringMapView"
import { bboxMapViewer } from "./bboxMapView"
import { polygonMapViewer } from "./polygonMapView"
import { TDBFeatureCollectionDocuments } from "./featureCollectionWidget"



export const MapViewer = ({ mapConfig }) => { 


	switch (mapConfig.type) {
		case CONST.B_BOX: 
			return bboxMapViewer(mapConfig)
		case CONST.POINT: 
			return pointMapViewer(mapConfig)
		case CONST.LINE_STRING_TYPE:
			return lineStringMapViewer(mapConfig)
		case CONST.POLYGON: 
			return <TDBFeatureCollectionDocuments config={mapConfig}/>
			//return polygonMapViewer(mapConfig)
		/*case CONST.FEATURE_COLLECTION: 
			return geoJSONMapViewer(args) */
	}
}

