
import React, {useState, useEffect} from "react"
import {LATITUDE, LONGITUDE, POINTS, POLYGON, LAT, LNG, REFRESH} from "../constants"
import {customMapOptions, customMarkerOptions} from "./markers"
import icon from "../constants"
import "leaflet-arrowheads"
import L from "leaflet"
import {MAP_OPTION, MARKER_OPTION} from "./map.constants"
import uuid from 'react-uuid'

export const polylineMapViewer = (args) => {
	let {property, documents, zoom, icon, center, bounds}=args

	let mapID=uuid()
	
	useEffect(() => {
		map()
	}, []) 

	const map = () => {

		let mapOptions = customMapOptions(zoom, center)
        let markerOptions= customMarkerOptions(icon)
		
		const map = L.map(`map-polyline-id-${mapID}`)

        // set center of maps 
		if(bounds && Array.isArray(bounds) && bounds.length > 0){
			//map.setView([40.866667, 34.566667], 5) 
			map.fitBounds(bounds)
			map.flyToBounds(bounds)
		}

		const tileLayer =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })

		tileLayer.addTo(map)
		

		let polyline = L.polyline(documents, {color: "black"}).addTo(map)

		// add markers
		if(Array.isArray(documents)) { 
			documents.map(mrk => {
				L.marker(mrk, MARKER_OPTION).addTo(map)
			})
		}
		
        // zoom the map to the polyline
        map.fitBounds(polyline.getBounds())
		window.map = map
	} 

	return <div id={`map-polyline-id-${mapID}`} style={{ height: "100vh" }}></div>
}