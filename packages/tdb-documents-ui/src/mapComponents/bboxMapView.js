
import React, { useEffect } from "react"
import "leaflet-arrowheads"
import L from "leaflet"
import { v4 as uuidv4 } from 'uuid';
import { LINE_COLOR } from "./map.constants"

export const bboxMapViewer = (args) => {
	let { documents }=args
	
	let mapID=uuidv4()

	useEffect(() => {
		map()
	}, [])  

	const map = () => {

		const map = L.map(`map-leaflet-id-${mapID}`, {
			fullscreenControl: true,
			fullscreenControlOptions: {
				position: 'topleft'
			}
		}) 

		const tileLayer =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

		tileLayer.addTo(map)

		// create an orange rectangle
		L.rectangle(documents, {color: LINE_COLOR, weight: 1}).addTo(map);

		// zoom the map to the rectangle bounds
		map.fitBounds(documents);

		window.map = map
	}

	return <div id={`map-leaflet-id-${mapID}`} className="rounded"></div>
} 