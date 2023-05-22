import React, { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"
import { TDBLabel}  from "../components/LabelComponent"
import { BiPlus } from "react-icons/bi" 
import { TDBInput } from "../widgets/inputWidgets"
import * as CONST from "../constants"

function getCoordinateData (fieldName, data, polygonIndex, coordinateIndex) {
  if(!data[polygonIndex].length) return null
  else  {
    if(!data[polygonIndex][coordinateIndex]) {
      return null
    }
    else return data[polygonIndex][coordinateIndex][fieldName === CONST.LATITUDE ? 0 : 1] 
  }
}
  

const DisplayCoordinatesLatLng = ({ coordinatesPerPolygon, polygonID, polygonIndex, data, setData, onChangeHandler }) => {

  if(!Object.keys(coordinatesPerPolygon).length) return <div/>
  const [coordinateArray, setCoordinateArray] = useState([])

  function handleCoordinates(val, fieldName, polygonIndex, coordinateIndex) {
    let temp = {...data}, coord=[]
    if(fieldName === CONST.LATITUDE) {
      coord = data[polygonIndex][coordinateIndex] ? data[polygonIndex][coordinateIndex] : []
      coord[0] = val //lat
    }
    else {
      coord = data[polygonIndex][coordinateIndex] ? data[polygonIndex][coordinateIndex] : []
      coord[1] = val //lng
    }
    //temp[polygonIndex][coordinateIndex]=coord
    temp[polygonIndex][coordinateIndex]=coord
    if(onChangeHandler) onChangeHandler([data], CONST.COORDINATES_FIELD)
    setData(data)
  }

  useEffect(() => {
    if(coordinatesPerPolygon && polygonID) {
      let coordArray = []
      for(let count = 0; count < coordinatesPerPolygon[polygonID]; count ++) {
        let countID = `Polygon__${polygonID}__coordinate__${count}`
        coordArray.push(
          <Card className="border border-dark bg-secondary mb-3" key={countID}>
            <Card.Body>
              <TDBInput name={CONST.LATITUDE} 
                //value={} 
                value={getCoordinateData (CONST.LATITUDE, data, polygonIndex, count)}
                required={true}
                mode={"Create"} 
                //inputKey={config.key}
                //id={config.id}
                placeholder={"xsd:decimal"} 
                className={"tdb__doc__input"} 
                onChange={(val, fieldName) => handleCoordinates(val, fieldName, polygonIndex, count)}/>
              <TDBInput name={CONST.LONGITUDE} 
                //value={data[polygonIndex].length ? data[polygonIndex][count][1] : null} 
                value={getCoordinateData (CONST.LONGITUDE, data, polygonIndex, count)}
                required={true}
                mode={"Create"} 
                //inputKey={config.key}
                //id={config.id}
                placeholder={"xsd:decimal"} 
                className={"tdb__doc__input"} 
                onChange={(val, fieldName) => handleCoordinates(val, fieldName, polygonIndex, count)}/>
            </Card.Body>
          </Card>
        )
      }
      setCoordinateArray(coordArray)
    }
  }, [coordinatesPerPolygon])



  return <>{coordinateArray}</>
}

function getCoordinatesPerPolygon(data) {
  if(!data.length) return {}
  let temp = {}
  data.map((arr, index) => {
    temp[`Polygon__${index}`] = arr.length
  })
  return temp
}

const AddCoordinatesPerPolygon = ({ polygonCount, setPolygon, polygon, data, setData, onChangeHandler }) => {
  if(!polygonCount) return <div/>
  //const [coordinatesPerPolygon, setCoordinatesPerPolygon] = useState({})
  const [coordinatesPerPolygon, setCoordinatesPerPolygon] = useState(getCoordinatesPerPolygon(data))
  

  function addCoordinates(polygonNumber) {
    let temp = {...coordinatesPerPolygon}
    if(temp.hasOwnProperty(`Polygon__${polygonNumber}`)) {
      temp[`Polygon__${polygonNumber}`] += 1
    }
    else { 
      // add new 
      temp[`Polygon__${polygonNumber}`] = 1
    }
    setCoordinatesPerPolygon(temp)
  }

  useEffect(() => {
    if(polygonCount) {
      let polygonArray = []
      for(let count = 0; count < polygonCount; count ++) {
        let countID = `Polygon__${count}`
        polygonArray.push(
          <Card className="bg-secondary w-100 mb-3" key={`Polygon__${count}`}>
            <Card.Body>
              <Card.Text className="text-muted fst-italic">{`Polygon number - ${count+1}`}</Card.Text>
              {coordinatesPerPolygon.hasOwnProperty(countID) && <DisplayCoordinatesLatLng 
                data={data}
                setData={setData}
                polygonID={countID}
                polygonIndex={count}
                coordinatesPerPolygon={coordinatesPerPolygon}
                onChangeHandler={onChangeHandler}/>}
              <Button className="btn btn-sm bg-light text-dark" onClick={(e) => addCoordinates(count)}>
                <BiPlus className="mr-1"/>Add Coordinates
              </Button>
            </Card.Body>
          </Card>
        )
      }
      setPolygon(polygonArray)
    }
  }, [polygonCount, coordinatesPerPolygon])

  

  return <>{polygon}</>
}

function getFormDataLength(formData) {
  if(!formData) return 0
  return formData[0].length
}

function getFormData(formData) {
  if(!formData) return []
  return formData[0]
}


export const NestedMultiPolygonArrayFieldTemplate = (args, props, property, id) => {
  const [polygonCount, setPolygonCount] = useState(getFormDataLength(props.formData))
  const [polygon, setPolygon] = useState()
  const [data, setData] = useState(getFormData(props.formData))

  function addPolygon (e) {
    setPolygonCount(polygonCount+1)
    setData(arr => [...arr, []])
  }


  return <Stack gap={3} direction="horizontal" className="mb-3">
    <Stack className="col-md-2">
      <TDBLabel name={props.name} 
        required={props.required} 
        className="tdb__label__width"
        id={id}/>
      <small className="text-muted fst-italic">Click here to add a new Polygon</small>
    </Stack>
    <Stack className="p-3">
      <AddCoordinatesPerPolygon polygonCount={polygonCount} 
          onChangeHandler={props.onChange}
        data={data}
        setData={setData}
        setPolygon={setPolygon} 
        polygon={polygon}/>
      <Button className="btn btn-sm bg-light text-dark" onClick={addPolygon}>
        <BiPlus className="mr-1"/>Add Polygon
      </Button>
    </Stack>
  </Stack>
}