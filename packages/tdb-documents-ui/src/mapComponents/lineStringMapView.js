
import React, { useState, useEffect } from "react"
import { REFRESH } from "../constants"
import { customMapOptions, customMarkerOptions}  from "./markers"
import icon from "../constants"
import "leaflet-arrowheads"
import L from "leaflet"
import uuid from 'react-uuid'
import { MARKER_OPTION } from "./map.constants"

export const lineStringMapViewer = (args) => {
	let { documents, zoom, onMarkerClick, center, bounds }=args
	
	let mapID=uuid()

	useEffect(() => {
		map()
	}, [])  

	const map = () => {

		// gather lat and lng
		let coordinates = [ { lat: documents[0], lng: documents[1] } ]

		let mapOptions = customMapOptions(zoom, center, coordinates)
    let markerOptions= customMarkerOptions(icon)
	
		const map = L.map(`map-leaflet-id-${mapID}`) 

    // set bounds if available
		if(bounds && Array.isArray(bounds) && bounds.length > 0){
			map.fitBounds(bounds)
		}

		const tileLayer =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

		tileLayer.addTo(map)

		let polyline = L.polyline(documents, { color: "black" }).addTo(map)

		// add markers
		if(Array.isArray(documents)) { 
			documents.map(mrk => {
				L.marker(mrk, MARKER_OPTION)
				.bindPopup(`lat: ${mrk[0]} lng: ${mrk[1]}`)
				.on('click', function(e) {
					let cData = mrk
					cData[REFRESH] = Date.now()
					if(onMarkerClick) onMarkerClick(cData)
			})
				.addTo(map)
			})
		}

		// zoom the map to the polyline
		map.fitBounds(polyline.getBounds())

		window.map = map
	}

	return <div id={`map-leaflet-id-${mapID}`} className="rounded"></div>
}