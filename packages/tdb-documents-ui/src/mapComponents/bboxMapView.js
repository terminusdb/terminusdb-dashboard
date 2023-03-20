
import React, { useEffect } from "react"
import "leaflet-arrowheads"
import L from "leaflet"
import uuid from 'react-uuid'

export const bboxMapViewer = (args) => {
	let { documents }=args
	
	let mapID=uuid()

	useEffect(() => {
		map()
	}, [])  

	const map = () => {

		const map = L.map(`map-leaflet-id-${mapID}`) 

		const tileLayer =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

		tileLayer.addTo(map)

		// create an orange rectangle
		L.rectangle(documents, {color: "#ff7800", weight: 1}).addTo(map);

		// zoom the map to the rectangle bounds
		map.fitBounds(documents);

		window.map = map
	}

	return <div id={`map-leaflet-id-${mapID}`} style={{ height: "100vh" }}></div>
}