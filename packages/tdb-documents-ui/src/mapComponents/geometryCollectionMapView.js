import React from "react"
import {
	MapContainer, 
	Marker, 
	Polygon, 
	Popup, 
	TileLayer, 
	Polyline
} from 'react-leaflet'
import * as CONST from "../constants"
import icon from "../constants"
import { MAP_OPTION } from "../mapComponents/map.constants"
import { setBounds } from "../utils"
import Stack from "react-bootstrap/Stack"
import { TDBLabel } from "../components/LabelComponent"


export const TDBViewGeoCollections = ({ formData, property, label, required, id }) => {
	//if(!formData.hasOwnProperty(property)) return <div/>
	//if(!Array.isArray(formData[property])) return <div/>

	let mapVectors = []
	let lineColor={ color: 'black' }
	let center=MAP_OPTION.center
	let zoom=MAP_OPTION.zoom

	let bounds=setBounds(formData)

	function getInternals (data) {
		let vectors=[]
		data.map(geo => {
			if(geo.hasOwnProperty("@type") && geo["@type"] === CONST.POINT && geo.hasOwnProperty("coordinates")) {
				vectors.push(
					<Marker position={geo["coordinates"]} icon={icon}>
						<Popup>
							<span>{`lat: ${geo["coordinates"][0]}, lng: ${geo["coordinates"][1]}`}</span>
						</Popup>
					</Marker>
				)
			}
			else if (geo.hasOwnProperty("@type") && geo["@type"] === CONST.LINE_STRING_TYPE && geo.hasOwnProperty("coordinates")) {
				vectors.push(
					<Polyline pathOptions={lineColor} positions={geo["coordinates"]} />
				)
			}
			else if (geo.hasOwnProperty("@type") && geo["@type"] === CONST.POLYGON && geo.hasOwnProperty("coordinates")) {
				vectors.push(
					<Polygon pathOptions={lineColor} positions={geo["coordinates"]} />
				)
			}
			else if (geo.hasOwnProperty("@type") && geo["@type"] === CONST.MULTIPOLYGON && geo.hasOwnProperty("coordinates")) {
				vectors.push(
					<Polygon pathOptions={lineColor} positions={geo["coordinates"]} />
				)
			}
		})
		return vectors
	}
	
	formData.map(geo => {

		if(geo.hasOwnProperty("@type") && geo["@type"] === CONST.POINT) {
			mapVectors.push(
				<Marker position={geo["coordinates"]} icon={icon}>
					<Popup>
						<span>{`lat: ${geo["coordinates"][0]}, lng: ${geo["coordinates"][1]}`}</span>
					</Popup>
					</Marker>
			)
		}
		else if (geo.hasOwnProperty("@type") && geo["@type"] === CONST.LINE_STRING_TYPE) {
			mapVectors.push(
				<Polyline pathOptions={lineColor} positions={geo["coordinates"]} />
			)
		}
		else if (geo.hasOwnProperty("@type") && geo["@type"] === CONST.POLYGON) {
			mapVectors.push(
				<Polygon pathOptions={lineColor} positions={geo["coordinates"]} />
			)
		}
		else if (geo.hasOwnProperty("@type") && geo["@type"] === CONST.MULTIPOLYGON) {
			mapVectors.push(
				<Polygon pathOptions={lineColor} positions={geo["coordinates"]} />
			)
		}
		else if (geo.hasOwnProperty("@type") && geo["@type"] === CONST.GEOMETRY_COLLECTION) {
			let mapItems=getInternals(geo[CONST.GEOMETRIES])
			mapVectors.push(
				mapItems
			)
		}
	})

	return <Stack direction="horizontal"  className="mb-3">
		<TDBLabel name={label} 
      required={required} 
      id={id}/>
		<MapContainer center={center} zoom={zoom} scrollWheelZoom={true} bounds={bounds}>
			<TileLayer
			attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{mapVectors}
		</MapContainer>
	</Stack>

}


