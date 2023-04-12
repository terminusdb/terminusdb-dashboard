
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


function buildMap(lat, lon)  {
    document.getElementById('tdb__map__leaflet__id').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    osmAttribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
                        ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    osmLayer = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});
    var map = new L.Map('map');
    map.setView(new L.LatLng(lat , lon), 9);
    map.addLayer(osmLayer);
    var validatorsLayer = new OsmJs.Weather.LeafletLayer({lang: 'en'});
    map.addLayer(validatorsLayer);
}

export const MapViewer = (args) => { 
	let {property, type, documents, zoom, scrollWheelZoom, display, onMarkerClick, polyline, polygon, icon, geojsonFeature, center, bounds}=args
	
	if(!type) return <>{`Expected the type of vector displayed in map like ${CONST.POINT_TYPE} or ${CONST.LINE_STRING_TYPE}... instead received ${type}`}</>

	// nothing to display on maps
	if(!Object.keys(documents).length) return <div/>
    
	/*let lat = "53.30975648987139", lon="-6.267268390534857"
	buildMap(lat, lon)  */

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

