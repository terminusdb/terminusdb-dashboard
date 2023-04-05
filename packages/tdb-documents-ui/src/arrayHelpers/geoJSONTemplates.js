import React, { useState, useEffect } from "react"
import { BiPlus } from "react-icons/bi"
import Stack from "react-bootstrap/Stack"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import * as CONST from "../constants"
import * as util from "../utils"
import { TDBLabel } from "../components/LabelComponent"
import { getDisplay } from "../helpers/fieldDisplay"
import { getPlaceholder } from "../helpers/placeholderHelper"
import { TDBInput } from "../widgets/inputWidgets"

// Move down button
const MoveDownButton = ({ element, variant }) => {
    return <>
    {element.hasMoveDown && 
      <Button variant={variant} 
        className="mb-3 tdb__array__item__list bg-transparent border-0" 
        title="Move Down"  
        onClick={element.onReorderClick(
            element.index,
            element.index + 1
        )}>
        <FaArrowDown className="text-light" style={{fontSize: "20px"}}/>
      </Button>
    }
  </>
}

// Move up button
const MoveUpButton = ({ element, variant }) => {
  return <>
  {element.hasMoveUp && 
    <Button variant={variant} title="Move Up"  
      className="mb-3 tdb__array__item__list bg-transparent border-0" 
      onClick={element.onReorderClick(
        element.index,
        element.index - 1
      )}>
    <FaArrowUp className="text-light" style={{fontSize: "20px"}}/>
  </Button>
  }
</>
}

// remove button
const RemoveButton = ({ element, variant }) => {
  return <>
  {element.hasRemove && <Button  variant={variant} 
    className="mb-3 tdb__array__item__list bg-transparent border-0 " 
    title="Delete" 
    onClick={element.onDropIndexClick(element.index)}>
    <RiDeleteBin5Fill className="text-danger" style={{fontSize: "25px"}}/>
  </Button>
  }
</>
}

// Add button
const AddButton = ({ props, label }) => {
  return <>
    {props.canAdd && 
      <Button data-cy={`add_${props.title}`} variant="light" className="btn-sm text-dark" type="button" 
        onClick={ (e) => props.onAddClick(e) }>
        <BiPlus className="mr-2"/> <label>{`Add ${label}`} </label>
      </Button> 
    }
  </>
}

// custom display of elements based on schema
export const GetFieldDisplay = ({ args, onChange, formData, id, property }) => {

	function handleFieldChange(data, fieldName) {
		//console.log("data", data, fieldName) 
		//onChange(data, fieldName) 
    if(args.type === CONST.POINT) onChange(data) 
    else {
      if(property === CONST.B_BOX) onChange(data)
      else onChange(data, fieldName) // pass field name s to match for LINESTRING and other types
    }
	}

	function fieldDisplay() {
		let placeholder=getPlaceholder(args.documentFrame[property]) 
		let newProps = { 
			dataType: placeholder,
			name: id, // pass id as name latitude__0/ longitude__1
			formData: formData,
			mode: args.mode,
			id: id, 
			placeholder: placeholder, 
			className: "tdb__doc__input",
			hideFieldLabel: true,
			onChange: handleFieldChange
		}  

		return getDisplay(newProps, args, property)

	}

	return <div className="w-100">
		{fieldDisplay()}
	</div>
}

// display long and lat input card
function displayCoordinates(args, element, index, property) {
 
  let id = element.children.props.idSchema["$id"]

  function handleCoordinates (data, fieldName) {
    if(element.children.props.onChange) {
      // data
      let lat = fieldName === `${CONST.LATITUDE}__${index}` ? data : element.children.props.formData[0]
      let lng = fieldName === `${CONST.LONGITUDE}__${index}` ? data  : element.children.props.formData[1]
     
      // child is set to ttrue when nested in subdocument 
      // child is set to true when custom 
      if(element.children.props.child) {
        element.children.props.onChange([lat, lng], fieldName, index)
      }
      else element.children.props.onChange([lat, lng])
    }
  }

  let argsHolder = {...args}
  argsHolder.documentFrame={ [property] : args.documentFrame[property].hasOwnProperty(CONST.CLASS) ?
      args.documentFrame[property][CONST.CLASS] : args.documentFrame[property] }
  
  return <Card bg="secondary" className="mb-3 ">
    <Card.Body>
      {element.children.props.formData.map( (el, childIndex) => {
        return <div className="d-flex">
          <label className="latlng-control-label">{ childIndex === 0 ? CONST.LATITUDE : CONST.LONGITUDE }</label>
          <GetFieldDisplay args={argsHolder}
            onChange={handleCoordinates}
            formData={el}
            id={childIndex === 0 ? `${CONST.LATITUDE}__${index}` : `${CONST.LONGITUDE}__${index}` }
            property={property}/>
        </div>
      })}
    </Card.Body>

  </Card>
}

// POINT 
export function PointFieldTemplate(args, props, property) { 

	let { extractedDocumentation } = args

	var variant="dark"
  let label=props.title  
	let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)
  
	return  <div className={`${props.className} w-100 mb-3 d-flex`}>
		<TDBLabel name={label} 
      hideFieldLabel={props.hideFieldLabel}
      required={props.required}
      comment={documentation.comment} 
      id={`root_Set_${label}`}/>

    <Card bg="secondary" className="w-100">
      <Card.Body>
        {props.items &&
          props.items.map((element, index) => {
            let id = index === 0 ? `latitude__${element.index}` : `longitude__${element.index}`
            return <Stack direction="horizontal" key={element.key} className={`${element.className} align-items-baseline w-100`}>
              
              <label className="latlng-control-label">{ index === 0 ? "latitude" : "longitude" }</label>

              {<div className="w-100"> 
                {/** display custom elements  */}
                <GetFieldDisplay args={args} 
                  onChange={element.children.props.onChange} 
                  formData={element.children.props.formData}
                  id={id} 
                  property={property}/>
              </div>}
              <MoveDownButton element={element} variant={variant}/>
              <MoveUpButton element={element} variant={variant}/>
              <RemoveButton element={element} variant={variant}/>
            </Stack>
          })} 

          <AddButton props={props} label={CONST.COORDINATES}/>
      </Card.Body>
    </Card>
  </div>
}

// LINE STRING 
export function LineStringFieldTemplate(args, props, property) { 

	let { extractedDocumentation } = args

	//console.log("props", props)
	var variant="dark"
  let label=props.title  
	let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)


	return  <div className={`${props.className} w-100 mb-3 d-flex`}>
		<TDBLabel name={label} 
      required={props.required}
      hideFieldLabel={props.hideFieldLabel}
      comment={documentation.comment} 
      id={`root_Set_${label}`}/>

    <Card bg="transparent" className="w-100">
      <Card.Body> 
        {props.items &&
          props.items.map((element, index) => {

            let id = index === 0 ? `latitude__${element.index}` : `longitude__${element.index}`
            return <Stack direction="horizontal" key={element.key} className={`${element.className} align-items-baseline w-100`}>
              
              {<div className="w-100"> 
                {/** display custom elements  */}
                {<div className="w-100"> 
                  { displayCoordinates(args, element, index, property) }
                </div>}

              </div>}

              <MoveDownButton element={element} variant={variant}/>
              <MoveUpButton element={element} variant={variant}/>
              <RemoveButton element={element} variant={variant}/>
            </Stack>
          })} 
          <AddButton props={props} label={CONST.COORDINATES}/>
      </Card.Body>
    </Card>
  </div>
}

// DISPLAY ADD POLYGON ARRAY TEMPLATE (POLYGON)
export function PolygonArrayFieldTemplate(props) {
  let variant="secondary"
  let label=props.title 

  
	return  <div className={`${props.className} w-100 mb-3`}>
    <TDBLabel name={label} 
      hideFieldLabel={props.hideFieldLabel}
      id={`root_Set_${label}`}/> 
    {props.items && 
      props.items.map(element => (
        <div key={element.key} className={`${element.className} align-items-baseline w-100`}>
          {<div>{element.children}</div>}
          <MoveDownButton element={element} variant={variant}/>
          <MoveUpButton element={element} variant={variant}/>
          <RemoveButton element={element} variant={variant}/>
        </div> 
    ))} 
    {props.items && !props.items.length && <AddButton props={props} label={CONST.POLYGON}/>}
  </div>
}

// DISPLAY ADD POLYGON ARRAY TEMPLATE (MULTIPOLYGON)
export function MultiPolygonArrayFieldTemplate(props) {
  let variant="secondary"
  let label=props.title 

  
	return  <div className={`${props.className} w-100 mb-3`}>
    <TDBLabel name={label} 
      hideFieldLabel={props.hideFieldLabel}
      id={`root_Set_${label}`}/> 
    {props.items && 
      props.items.map(element => (
        <div key={element.key} className={`${element.className} align-items-baseline w-100`}>
          {<div>{element.children}</div>}
          <MoveDownButton element={element} variant={variant}/>
          <MoveUpButton element={element} variant={variant}/>
          <RemoveButton element={element} variant={variant}/>
        </div> 
    ))} 
    <small className="text-light fst-italics">{`Click here to add another Polygon`}</small>
    <AddButton props={props} label={CONST.POLYGON}/>
  </div>
}

// DISPLAY ADD COORDINATES ARRAY TEMPLATE 
export function CoordinatesArrayFieldTemplate(args, props, property) { 
	var variant="dark"
  let label=props.title 
  let { extractedDocumentation } = args
  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)

	return  <div className={`${props.className} w-100 mb-3 d-flex`}>
		<TDBLabel name={label} 
      hideFieldLabel={props.hideFieldLabel}
      required={props.required}
      comment={documentation.comment} 
      id={`root_Set_${label}`}/>

    <Card bg="secondary" className="w-100">
      <Card.Body>
        {props.items &&
          props.items.map((element, index) => {
            let id = index === 0 ? `latitude__${element.index}` : `longitude__${element.index}`
            return <Stack direction="horizontal" key={element.key} className={`${element.className} align-items-baseline w-100`}>

              {<div className="w-100"> 
              { displayCoordinates(args, element, index, property) }
             
              </div> }

              <MoveDownButton element={element} variant={variant}/>
              <MoveUpButton element={element} variant={variant}/>
              <RemoveButton element={element} variant={variant}/>
            </Stack>
          })} 

          <AddButton props={props} label={CONST.COORDINATES}/>
      </Card.Body>
    </Card>
  </div>
}


// BINDING BOX 
export function BBoxFieldTemplate(args, props, property) { 

	let { extractedDocumentation } = args

	//console.log("props", props)
	var variant="dark"
  let label=props.title  
	let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)
  
	return  <div className={`${props.className} w-100 mb-3 d-flex`}>
		<TDBLabel name={label} 
      required={props.required}
      hideFieldLabel={props.hideFieldLabel}
      comment={documentation.comment} 
      id={`root_Set_${label}`}/>

    <Card bg="secondary" className="w-100">
      <Card.Body>
        {props.items &&
          props.items.map((element, index) => {
            
            let id = `${util.getBBoxLabel(index)}__${element.index}`
            return <Stack direction="horizontal" key={element.key} className={`${element.className} align-items-baseline w-100`}>
              
              <label className="latlng-control-label">{ util.getBBoxLabel(index) }</label>

              {<div className="w-100"> 
                {/** display custom elements  */}
                {<GetFieldDisplay args={args} 
                  id={id} 
                  onChange={element.children.props.onChange} 
                  formData={element.children.props.formData}
                  property={property}/>}
              </div>}
              <MoveDownButton element={element} variant={variant}/>
              <MoveUpButton element={element} variant={variant}/>
              <RemoveButton element={element} variant={variant}/>
            </Stack>
          })} 

          <AddButton props={props} label={CONST.COORDINATES}/>
      </Card.Body>
    </Card>
  </div>
}
