
import React, {useState, useEffect} from "react"
import "leaflet-arrowheads"
import L from "leaflet"
import * as CONST from "../constants"
import { pointMapViewer } from "./pointMapView"



export const MapViewer = ({ mapConfig }) => { 


	switch (mapConfig.type) {
		case CONST.POINT: 
			return pointMapViewer(mapConfig)
		/*case CONST.LINE_STRING_TYPE:
			return polylineMapViewer(args)
		case CONST.POLYGON: 
			return polygonMapViewer(args)
		case CONST.FEATURE_COLLECTION: 
			return geoJSONMapViewer(args) */
	}
}

