import React, { useState, useEffect } from "react"
import Stack from "react-bootstrap/Stack"
import Card from "react-bootstrap/Card"
import { TDBLabel } from "../components/LabelComponent"
import { MapViewer } from "../mapComponents/mapViewer"
import * as CONST from "../constants"

export const TDBPointDocuments = ({ config }) => {

  let mapConfig = { 
    type: CONST.POINT,
    documents: config.formData
  }

  return <Stack direction="horizontal"  className="mb-3">
    <TDBLabel name={config.label ? config.label : config.name} 
      required={config.required} 
      id={config.id}/>
    <MapViewer mapConfig={mapConfig}/>
  </Stack>
}

//onChange={ (event) => onChange(event.target.value, name) } />