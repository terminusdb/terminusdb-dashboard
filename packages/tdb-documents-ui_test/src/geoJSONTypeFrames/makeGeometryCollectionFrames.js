import React from "react"
import {
	MapContainer, 
	Marker, 
	Polygon, 
	Popup, 
	TileLayer, 
	Polyline
} from 'react-leaflet'
import { 
	COORDINATES,
	LINE_STRING_TYPE,
	MULTIPOLYGON,
	POINT_TYPE,
	POLYGON,
	GEOMETRY_COLLECTION,
	GEOMETRIES 
} from "../constants"
import icon from "../constants"
import {MAP_OPTION} from "../maps/map.constants"
import {setBounds} from "../utils"

function getGeometryCollectionTypeViewUI(formData, item) {
	let ui = {}
    
    function getMapComponent(props) {
        if(!formData.hasOwnProperty(item)) return <div/>
		if(!Array.isArray(formData[item])) return <div/>

		let mapVectors = []
		let lineColor={ color: 'black' }
		let center=MAP_OPTION.center
		let zoom=MAP_OPTION.zoom

		let bounds=setBounds(formData)

		function getInternals (data) {
			let vectors=[]
			data.map(geo => {
				if(geo.hasOwnProperty("@type") && geo["@type"] === POINT_TYPE && geo.hasOwnProperty(COORDINATES)) {
					vectors.push(
						<Marker position={geo[COORDINATES]} icon={icon}>
							<Popup>
								<span>{`lat: ${geo[COORDINATES][0]}, lng: ${geo[COORDINATES][1]}`}</span>
							</Popup>
						</Marker>
					)
				}
				else if (geo.hasOwnProperty("@type") && geo["@type"] === LINE_STRING_TYPE && geo.hasOwnProperty(COORDINATES)) {
					vectors.push(
						<Polyline pathOptions={lineColor} positions={geo[COORDINATES]} />
					)
				}
				else if (geo.hasOwnProperty("@type") && geo["@type"] === POLYGON && geo.hasOwnProperty(COORDINATES)) {
					vectors.push(
						<Polygon pathOptions={lineColor} positions={geo[COORDINATES]} />
					)
				}
				else if (geo.hasOwnProperty("@type") && geo["@type"] === MULTIPOLYGON && geo.hasOwnProperty(COORDINATES)) {
					vectors.push(
						<Polygon pathOptions={lineColor} positions={geo[COORDINATES]} />
					)
				}
			})
			return vectors
		}
		
		formData[item].map(geo => {
			if(geo.hasOwnProperty("@type") && geo["@type"] === POINT_TYPE && geo.hasOwnProperty(COORDINATES)) {
				mapVectors.push(
					<Marker position={geo[COORDINATES]} icon={icon}>
						<Popup>
							<span>{`lat: ${geo[COORDINATES][0]}, lng: ${geo[COORDINATES][1]}`}</span>
						</Popup>
    				</Marker>
				)
			}
			else if (geo.hasOwnProperty("@type") && geo["@type"] === LINE_STRING_TYPE && geo.hasOwnProperty(COORDINATES)) {
				mapVectors.push(
					<Polyline pathOptions={lineColor} positions={geo[COORDINATES]} />
				)
			}
			else if (geo.hasOwnProperty("@type") && geo["@type"] === POLYGON && geo.hasOwnProperty(COORDINATES)) {
				mapVectors.push(
					<Polygon pathOptions={lineColor} positions={geo[COORDINATES]} />
				)
			}
			else if (geo.hasOwnProperty("@type") && geo["@type"] === MULTIPOLYGON && geo.hasOwnProperty(COORDINATES)) {
				mapVectors.push(
					<Polygon pathOptions={lineColor} positions={geo[COORDINATES]} />
				)
			}
			else if (geo.hasOwnProperty("@type") && geo["@type"] === GEOMETRY_COLLECTION && geo.hasOwnProperty(GEOMETRIES)) {
				let mapItems=getInternals(geo[GEOMETRIES])
				mapVectors.push(
					mapItems
				)
			}
		})

		return <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} bounds={bounds}>
			<TileLayer
			attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{mapVectors}
	  	</MapContainer>
    }
    ui[item] = {"ui:field": getMapComponent}
    return ui
}


function geoCollectionFrames (frame, item, uiFrame, mode, formData) {
    let properties={}, propertiesUI={}

    console.log("formData", formData, item)

    let layout= {
        type: "object",
        title: item
    }

    properties[item]=layout
    let ui=getGeometryCollectionTypeViewUI(formData, item) 
    propertiesUI[item]=ui[item]

    return {properties, propertiesUI}
}


export const makeGeometryCollectionFrames = (frame, item, uiFrame, mode, formData) => {
    let madeFrames = geoCollectionFrames(frame, item, uiFrame, mode, formData)
    let properties = madeFrames.properties
    let propertiesUI = madeFrames.propertiesUI
    return {properties, propertiesUI}
}