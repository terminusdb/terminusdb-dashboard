import React, { useState, useEffect } from "react"
import Stack from "react-bootstrap/Stack"
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/dist/styles.css";
import { TDBLabel } from "../components/LabelComponent"
import {
	MapContainer, 
	Marker, 
	Polygon, 
	Popup, 
	TileLayer, 
	Polyline
} from 'react-leaflet'
import icon from "../constants"
import { MAP_OPTION, LINE_COLOR } from "./map.constants"
import * as CONST from "../constants"
import * as util from "../utils"
import { getCenterFromData } from "./markers"


function getMapVectors (formData) {
  let mapVectors = [], lineColor={ color: LINE_COLOR }
  formData.map(geo => {
    
    if(geo.hasOwnProperty(CONST.TYPE) && 
      geo[CONST.TYPE] === CONST.POINT && 
      geo.hasOwnProperty(CONST.COORDINATES_FIELD)) {
      // POINTS 
      mapVectors.push(
        <Marker position={geo[CONST.COORDINATES_FIELD]} icon={icon}>
          <Popup>
            <span>{`lat: ${geo[CONST.COORDINATES_FIELD][0]}, lng: ${geo[CONST.COORDINATES_FIELD][1]}`}</span>
          </Popup>
        </Marker>
      )
    }
    else if (geo.hasOwnProperty(CONST.TYPE) && 
      geo[CONST.TYPE] === CONST.LINE_STRING_TYPE && 
      geo.hasOwnProperty(CONST.COORDINATES_FIELD)) {
        // LINE STRING 
        mapVectors.push(
          <Polyline pathOptions={lineColor} positions={geo[CONST.COORDINATES_FIELD]} />
        )
    }
    else if (geo.hasOwnProperty(CONST.TYPE) && 
      geo[CONST.TYPE] === CONST.POLYGON && 
      geo.hasOwnProperty(CONST.COORDINATES_FIELD)) {
        // POLYGON
        mapVectors.push(
          <Polygon pathOptions={lineColor} positions={geo[CONST.COORDINATES_FIELD]} />
        )
    }
    else if (geo.hasOwnProperty(CONST.TYPE) && 
      geo[CONST.TYPE] === CONST.MULTIPOLYGON && 
      geo.hasOwnProperty(CONST.COORDINATES_FIELD)) {
        // MULTIPOLYGON
        mapVectors.push(
          <Polygon pathOptions={lineColor} positions={geo[CONST.COORDINATES_FIELD]} />
        )
    }
    else if (geo.hasOwnProperty(CONST.TYPE) && 
      geo[CONST.TYPE] === CONST.GEOMETRY_COLLECTION && 
      geo.hasOwnProperty(CONST.GEOMETRIES)) {
        // GEOMETRIES
        let mapItems=getMapVectors(geo[CONST.GEOMETRIES])
        mapVectors.push(
          mapItems
        )
    }
  })
  return mapVectors
}

export const TDBGeoCollectionDocuments = ({ config }) => {

  // when nothing is filled return blank div
  if(!config.formData.hasOwnProperty(config.name)) return <React.Fragment/>
  
  
  let center=getCenterFromData(config.formData[config.name]) 
  let zoom=MAP_OPTION.zoom
  let bounds=util.setBounds(config.formData.hasOwnProperty(CONST.B_BOX) ? config.formData[CONST.B_BOX] : [])

  let mapVectors = getMapVectors(config.formData[config.name])

  return <Stack direction="horizontal"  className="mb-3">
    <TDBLabel name={config.label ? config.label : config.name} 
      required={config.required} 
      id={config.id}/>
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} bounds={bounds} className="rounded">
			<TileLayer
			attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{mapVectors}
      <FullscreenControl position="bottomleft"
        forceSeparateButton={true}/>
	  </MapContainer>
  </Stack>
}
