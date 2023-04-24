import React, { useEffect, useRef } from "react"
import Stack from "react-bootstrap/Stack"
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/dist/styles.css";
import { TDBLabel } from "../components/LabelComponent"
import uuid from 'react-uuid'
import "leaflet-arrowheads"
import L from "leaflet"
import icon from "../constants"
import { MAP_OPTION, LINE_COLOR } from "./map.constants"
import * as CONST from "../constants"
import { customMapOptions, customMarkerOptions, getCenterFromData }  from "./markers"
import * as util from "../utils"

export const TDBFeatureCollectionDocuments = ({ config }) => {
  const mapRef = useRef(null);
  
  let mapID=uuid()
  
  const map = () => { 
    let zoom=MAP_OPTION.zoom
    //let bounds=util.setBounds(config.documents.hasOwnProperty(CONST.B_BOX) ? config.documents[CONST.B_BOX] : [])

    let mapOptions = customMapOptions(zoom, null)
    let markerOptions= customMarkerOptions(icon)

    const map = L.map(`tdb__map__geojson__leaflet_${mapID}`, mapOptions) //mapOptions
    const tileLayer = new  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })


    tileLayer.addTo(map)


    let geoJSON = L.geoJSON(config.formData, { 
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, markerOptions) 
      },
    }).bindPopup(function (layer) {
      return layer.feature.properties.description;
    }).addTo(map)
    
    window.map = map

    map.fitBounds(geoJSON.getBounds());
    setTimeout(() => map.invalidateSize(true), 2000);
  } 

  useEffect(() => {
    if(mapRef) {
      map()
    }
  }, [mapRef])


  return <Stack direction="horizontal"  className="mb-3">
    <TDBLabel name={config.label ? config.label : config.name} 
      required={config.required} 
      id={config.id}/>
    <div ref={mapRef} id={`tdb__map__geojson__leaflet_${mapID}`} className="rounded" data-testid={`map-leaflet-id`}></div>
  </Stack>
}