import React, { useEffect } from "react"
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

  let mapID=uuid()
  
  const map = () => { 
    let center=['53.43158399610475', '-6.708967005020142'] //getCenterFromData(config.formData[config.name], CONST.FEATURE_COLLECTION) 
    let zoom=MAP_OPTION.zoom
    let bounds=util.setBounds(config.formData.hasOwnProperty(CONST.B_BOX) ? config.formData[CONST.B_BOX] : [])

    let mapOptions = customMapOptions(zoom, center)
    let markerOptions= customMarkerOptions(icon)

    const map = L.map(`tdb__map__geojson__leaflet_${mapID}`, mapOptions) //mapOptions
    const tileLayer = new  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    if(bounds && Array.isArray(bounds) && bounds.length > 0){
      map.setView([40.866667, 34.566667], 5) // center of maps 
      map.fitBounds(bounds)
      map.flyToBounds(bounds)
    }

    tileLayer.addTo(map)
      L.geoJSON(config.featureData, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, markerOptions)
        }
      }).addTo(map)
    window.map = map
  }

  useEffect(() => {
    map()
  }, [])

  //return <div id={`map-leaflet-id-${mapID}`} className="rounded" data-testid={`map-leaflet-id`}/>


  return <Stack direction="horizontal"  className="mb-3">
    <TDBLabel name={config.label ? config.label : config.name} 
      required={config.required} 
      id={config.id}/>
    <div id={`tdb__map__geojson__leaflet_${mapID}`} className="rounded" data-testid={`map-leaflet-id`}></div>
  </Stack>
}