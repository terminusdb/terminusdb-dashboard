
import React, {useState, useEffect} from "react"
import {LATITUDE, LONGITUDE, POINTS, POLYGON, LAT, LNG, REFRESH} from "../constants"
import {customMapOptions, customMarkerOptions} from "./markers"
import icon from "../constants"
import "leaflet-arrowheads"
import L from "leaflet"
import {pointMapViewer} from "./pointTypeMap"
import {polylineMapViewer} from "./polylineMapViewer"
import {polygonMapViewer} from "./polygonMapViewer"
import {geoJSONMapViewer} from "./geoJSONMapViewer"
import * as CONST from "../constants"

export const MapViewer = (args) => { 
	let {property, type, documents, zoom, scrollWheelZoom, display, onMarkerClick, polyline, polygon, icon, geojsonFeature, center, bounds}=args
	
	if(!type) return <>{`Expected the type of vector displayed in map like ${CONST.POINT_TYPE} or ${CONST.LINE_STRING_TYPE}... instead received ${type}`}</>

	// nothing to display on maps
	if(!Object.keys(documents).length) return <div/>

	switch (type) {
		case CONST.POINT_TYPE: 
			return pointMapViewer(args)
		case CONST.LINE_STRING_TYPE:
			return polylineMapViewer(args)
		case CONST.POLYGON: 
			return polygonMapViewer(args)
		case CONST.FEATURE_COLLECTION: 
			return geoJSONMapViewer(args)
	}
}

