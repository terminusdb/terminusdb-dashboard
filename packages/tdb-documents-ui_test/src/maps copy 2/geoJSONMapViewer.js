import React, {useState, useEffect, createRef} from "react"
import {MapContainer, TileLayer,  MapControl, withLeaflet, GeoJSON} from 'react-leaflet'
import {LATITUDE, LONGITUDE, POINTS, POLYGON, LAT, LNG, REFRESH} from "../constants"
import {renderPositions, customMapOptions, customMarkerOptions} from "./markers"
import icon from "../constants"
import "leaflet-arrowheads"
import L from "leaflet"


export const geoJSONMapViewer = (args) => {
    let {geojsonFeature, documents, onMarkerClick, zoom, center, icon, bounds} = args

    geojsonFeature={ "type": "FeatureCollection",
  "features": [
    { "type": "Feature",
      "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
      "properties": {"prop0": "value0"}
      },
    { "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
          ]
        },
      "properties": {
        "prop0": "value0",
        "prop1": 0.0
        }
      },
    { "type": "Feature",
       "geometry": {
         "type": "Polygon",
         "coordinates": [
           [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
             [100.0, 1.0], [100.0, 0.0] ]
           ]

       },
       "properties": {
         "prop0": "value0",
         "prop1": {"this": "that"}
         }
       }
    ]
  }


	useEffect(() => {
		map()
	}, [])

	const map = () => {
        let mapOptions = customMapOptions(zoom, center)
        let markerOptions= customMarkerOptions(icon)

		const map = L.map("map-geojson-leaflet-id", mapOptions)
		const tileLayer = new  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })

		if(bounds && Array.isArray(bounds) && bounds.length > 0){
			map.setView([40.866667, 34.566667], 5) // center of maps 
			map.fitBounds(bounds)
			map.flyToBounds(bounds)
		}
 
		tileLayer.addTo(map)

        L.geoJSON(geojsonFeature, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, markerOptions)
            }
        }).addTo(map)

		window.map = map
	}

	return <div id="map-geojson-leaflet-id" style={{ height: "100vh" }}></div>
}