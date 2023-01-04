import React, {useState, useEffect, createRef} from "react"
import {MapContainer, TileLayer,  MapControl, withLeaflet, GeoJSON, Polygon} from 'react-leaflet'
import {LATITUDE, LONGITUDE, POINTS, POLYGON, LAT, LNG, REFRESH} from "../constants"
import {renderPositions} from "./markers"
import icon from "../constants"
import "leaflet-arrowheads"
import L from "leaflet"
import {MAP_OPTION, ARROW_OPTION, MARKER_OPTION} from "./map.constants"
import {customMapOptions, customMarkerOptions} from "./markers"

export const PolygonLeafletMap = ({polygon, onMarkerClick, zoom, center, bounds}) => {

	useEffect(() => { 
		map()
	}, [])

	//console.log("polygon in LeafletMap", polygon, polygon.data)

	const map = () => {
		let mapOptions = customMapOptions(zoom, center)
        let markerOptions= customMarkerOptions(icon)

		const map = L.map("map-leaflet-id-polygon", mapOptions)
	
		const tileLayer = new L.TileLayer(
			"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			{
				attribution:
				'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
			} 
		)

		if(bounds && Array.isArray(bounds) && bounds.length > 0){
			map.setView([40.866667, 34.566667], 5) // center of maps 
			map.fitBounds(bounds)
			map.flyToBounds(bounds)
		}

		tileLayer.addTo(map)
        var polygonMap = L.polygon(polygon.data, { color: 'purple', smoothFactor: 5 }).addTo(map)

        // zoom the map to the polygon
        map.fitBounds(polygonMap.getBounds())

		window.map = map

    }

	return <div id="map-leaflet-id-polygon" style={{ height: "100vh" }}></div>
}