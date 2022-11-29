import React, {useState, useEffect, useRef} from "react"
import {MapContainer, TileLayer,  MapControl, withLeaflet, GeoJSON, Polyline} from 'react-leaflet'
import {LATITUDE, LONGITUDE, POINTS, POLYGON, LAT, LNG, REFRESH} from "../constants"
import {customMapOptions, customMarkerOptions} from "./markers"
import icon from "../constants"
import "leaflet-arrowheads"
import L from "leaflet"

export const LeafletMap = ({documents, onMarkerClick, zoom, center, icon, bounds}) => {

	useEffect(() => {
		map()
	}, [])

	const map = () => {
		let mapOptions = customMapOptions(zoom, center, documents)
        let markerOptions= customMarkerOptions(icon)
		
		const map = L.map("map-leaflet-id", mapOptions)

		if(bounds && Array.isArray(bounds) && bounds.length > 0){
			map.setView([40.866667, 34.566667], 5) // center of maps 
			map.fitBounds(bounds)
			map.flyToBounds(bounds)
		}

		const tileLayer = new  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })

		tileLayer.addTo(map)

		// Draw Markers
		documents.map(docs => {
			let coord = { id:docs.id, name: docs.name, lat: docs.lat, lng: docs.lng } // set lat and long
			//let marker = L.marker(coord , markerOptions).bindPopup(`hellotest`).openPopup()
			let marker = L.marker(coord , markerOptions).bindPopup(`lat: ${coord.lat} lng: ${coord.lng}`).on('click', function(e) {
				//let cData = coord.id
				let cData = coord
				cData[REFRESH] = Date.now()
				if(onMarkerClick) onMarkerClick(cData)
			})
			marker.addTo(map)
		})

		window.map = map
	}

	return <div id="map-leaflet-id" style={{ height: "100vh" }}></div>
}