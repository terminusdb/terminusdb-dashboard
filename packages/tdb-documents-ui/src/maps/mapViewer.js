
import React, {useState, useEffect} from "react"
import {LATITUDE, LONGITUDE, POINTS, POLYGON, LAT, LNG, REFRESH} from "../constants"
import {PolyLineLeafletMap} from "./polyLineLeafletMap"
import {LeafletMap} from "./leafletMap"
import {PolygonLeafletMap} from "./polygonLeafletMap"
import {GeoJSONLeafletMap} from "./geoJSONLeafletMap"

/*
**  documents            - Array of documents with latitudes and longitudes
**  zoom                 - zoom im map
**  scrollWheelZoom      - boolean to allow on scroll
*/
export const MapViewer = ({documents, zoom, scrollWheelZoom, display, onMarkerClick, polyLine, polygon, icon, geojsonFeature, center, bounds}) => {

	return <React.Fragment>
		{
			documents && !polyLine && !polygon &&
				<LeafletMap documents={documents} 
					onMarkerClick = {onMarkerClick} 
					zoom={zoom} 
					icon={icon} 
					center={center} 
					bounds={bounds}/>
		}
		{
			polyLine && <PolyLineLeafletMap polyLine={polyLine} 
				onMarkerClick = {onMarkerClick} 
				bounds={bounds}
				zoom={zoom} 
				center={center}/>
		}
		{
			polygon && <PolygonLeafletMap polygon={polygon} 
				onMarkerClick = {onMarkerClick} 
				bounds={bounds}
				zoom={zoom} 
				center={center}/>
		}
		{
			geojsonFeature && <GeoJSONLeafletMap geojsonFeature={geojsonFeature} 
				center={center} 
				bounds={bounds}
				zoom={zoom} 
				icon={icon}/>
		}
	</React.Fragment>
}

