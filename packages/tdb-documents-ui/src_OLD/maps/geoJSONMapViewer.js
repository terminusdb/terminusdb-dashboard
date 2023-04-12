import React, {useState, useEffect, createRef} from "react"
import {MapContainer, TileLayer,  MapControl, withLeaflet, GeoJSON} from 'react-leaflet'
import {LATITUDE, LONGITUDE, POINTS, POLYGON, LAT, LNG, REFRESH} from "../constants"
import {renderPositions, customMapOptions, customMarkerOptions} from "./markers"
import icon from "../constants"
import "leaflet-arrowheads"
import L from "leaflet" 
import uuid from 'react-uuid'

export function geoJSONMapViewer  (args) {
	 

    let {geojsonFeature, documents, onMarkerClick, zoom, center, icon, bounds} = args

    useEffect(() => {
      map()
    }, [])

    let mapID=uuid()

    const map = () => {
          let mapOptions = customMapOptions(zoom, center)
          let markerOptions= customMarkerOptions(icon)

      const map = L.map(`tdb__map__geojson__leaflet_${mapID}`, mapOptions)
      const tileLayer = new  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          })

      if(bounds && Array.isArray(bounds) && bounds.length > 0){
        map.setView([40.866667, 34.566667], 5) // center of maps 
        map.fitBounds(bounds)
        map.flyToBounds(bounds)
      }
  
      tileLayer.addTo(map)

          L.geoJSON(documents, {
              pointToLayer: function (feature, latlng) {
                  return L.marker(latlng, markerOptions)
              }
          }).addTo(map)

      window.map = map
    }

    return <div id={`tdb__map__geojson__leaflet_${mapID}`} style={{ height: "100vh" }}></div>
}