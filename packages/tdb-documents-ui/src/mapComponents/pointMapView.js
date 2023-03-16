
import React, { useState, useEffect } from "react"
import { REFRESH } from "../constants"
import { customMapOptions, customMarkerOptions}  from "./markers"
import icon from "../constants"
import "leaflet-arrowheads"
import L from "leaflet"
import uuid from 'react-uuid'

export const pointMapViewer = (args) => {
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
	
		const map = L.map(`map-leaflet-id-${mapID}`, mapOptions) 

        // set center of maps 
		if(bounds && Array.isArray(bounds) && bounds.length > 0){
			map.setView(bounds, 5) 
			map.fitBounds(bounds)
			map.flyToBounds(bounds)
		}

		const tileLayer =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

		tileLayer.addTo(map)

		// Draw Markers
		coordinates.map(docs => {
			// set lat and lng
			let coord = { id: docs.id, name: docs.name, lat: docs.lat, lng: docs.lng } 
			let marker = L.marker(coord , markerOptions)
				.bindPopup(`lat: ${coord.lat} lng: ${coord.lng}`)
				.on('click', function(e) {
					let cData = coord
					cData[REFRESH] = Date.now()
					if(onMarkerClick) onMarkerClick(cData)
			})
			marker.addTo(map)
		})  

		window.map = map
	}

	return <div id={`map-leaflet-id-${mapID}`} style={{ height: "100vh" }}></div>
}