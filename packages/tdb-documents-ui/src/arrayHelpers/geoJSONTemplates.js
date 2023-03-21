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
import { getDisplay } from "./fieldDisplay"
import { getPlaceholder } from "../helpers/placeholderHelper"
import { TDBInput } from "../widgets/inputWidgets"

// custom display of elements based on schema
const GetFieldDisplay = ({ args, onChange, formData, id, property }) => {

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
			onChange: handleFieldChange,
			hideFieldLabel: true
		}  

		return getDisplay(newProps, args, property)

	}

	return <span>
		{fieldDisplay()}
	</span>
}

 
// EDIT or CREATE MODE
// Array field templates for lists and sets 
export function PointFieldTemplate(args, props, property) { 

	let { extractedDocumentation } = args

	//console.log("props", props)
	var variant="dark"
  let label=props.title  
	let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)
  
	return  <div className={`${props.className} w-100 mb-3 d-flex`}>
		<TDBLabel name={label} 
      required={props.required}
      comment={documentation.comment} 
      id={`root_Set_${label}`}/>

    <Card bg="secondary" className="w-100">
      <Card.Body>
        {props.items &&
          props.items.map((element, index) => {
            //let id = `${props.idSchema["$id"]}_${CONST.SET}_${index}`
          
            //let id = `${element.children.props.idSchema["$id"]}__${element.index}`
            let id = index === 0 ? `latitude__${element.index}` : `longitude__${element.index}`
            return <Stack direction="horizontal" key={element.key} className={`${element.className} align-items-baseline w-100`}>
              
              <label className="latlng-control-label">{ index === 0 ? "latitude" : "longitude" }</label>

              {<div className="w-100"> 
                {/** display custom elements  */}
                {<GetFieldDisplay args={args} 
                  onChange={element.children.props.onChange} 
                  formData={element.children.props.formData}
                  id={id} 
                  property={property}/>}
              </div>}

              {element.hasMoveDown && (
                <Button variant={variant} 
                  className="mb-3 tdb__array__item__list bg-transparent border-0" 
                  title="Move Down" 
                  id={`MoveDown_${id}`} 
                  onClick={element.onReorderClick(
                      element.index,
                      element.index + 1
                  )}>
                  <FaArrowDown className="text-light" style={{fontSize: "20px"}}/>
                </Button>
              )}

              {element.hasMoveUp && (
                <Button variant={variant} title="Move Up"  
                  id={`MoveDown_${id}`} 
                  className="mb-3 tdb__array__item__list bg-transparent border-0" 
                  onClick={element.onReorderClick(
                    element.index,
                    element.index - 1
                  )}>
                <FaArrowUp className="text-light" style={{fontSize: "20px"}}/>
              </Button>
              )}

              {element.hasRemove && <Button  variant={variant} 
                className="mb-3 tdb__array__item__list bg-transparent border-0 " 
                title="Delete" 
                id={`Remove_${id}`} 
                onClick={element.onDropIndexClick(element.index)}>
                <RiDeleteBin5Fill className="text-danger" style={{fontSize: "25px"}}/>
              </Button>}
            </Stack>
          })} 

        {props.canAdd && (
          <div>
              <Button data-cy={`add_${label}`} variant="light" className=" tdb__add__button btn-sm text-dark" type="button" onClick={props.onAddClick}>
                <BiPlus className="mr-2"/> <label>{`Add `} {label}</label>
              </Button> 
          </div>
        )}
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
      comment={documentation.comment} 
      id={`root_Set_${label}`}/>

    <Card bg="secondary" className="w-100">
      <Card.Body>
        {props.items &&
          props.items.map((element, index) => {
            //let id = `${props.idSchema["$id"]}_${CONST.SET}_${index}`
          
            //let id = `${element.children.props.idSchema["$id"]}__${element.index}`
            //let id = index === 0 ? `latitude__${element.index}` : `longitude__${element.index}`
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

              {element.hasMoveDown && (
                <Button variant={variant} 
                  className="mb-3 tdb__array__item__list bg-transparent border-0" 
                  title="Move Down" 
                  id={`MoveDown_${id}`} 
                  onClick={element.onReorderClick(
                      element.index,
                      element.index + 1
                  )}>
                  <FaArrowDown className="text-light" style={{fontSize: "20px"}}/>
                </Button>
              )}

              {element.hasMoveUp && (
                <Button variant={variant} title="Move Up"  
                  id={`MoveDown_${id}`} 
                  className="mb-3 tdb__array__item__list bg-transparent border-0" 
                  onClick={element.onReorderClick(
                    element.index,
                    element.index - 1
                  )}>
                <FaArrowUp className="text-light" style={{fontSize: "20px"}}/>
              </Button>
              )}

              {element.hasRemove && <Button  variant={variant} 
                className="mb-3 tdb__array__item__list bg-transparent border-0 " 
                title="Delete" 
                id={`Remove_${id}`} 
                onClick={element.onDropIndexClick(element.index)}>
                <RiDeleteBin5Fill className="text-danger" style={{fontSize: "25px"}}/>
              </Button>}
            </Stack>
          })} 

        {props.canAdd && (
          <div>
              <Button data-cy={`add_${label}`} variant="light" className=" tdb__add__button btn-sm text-dark" type="button" onClick={props.onAddClick}>
                <BiPlus className="mr-2"/> <label>{`Add `} {label}</label>
              </Button> 
          </div>
        )}
      </Card.Body>
    </Card>
  </div>
}


function displayCoordinates(args, element, index, property) {
 
  let id = element.children.props.idSchema["$id"]

  function handleCoordinates (data, fieldName) {
    if(element.children.props.onChange) {
      // data
      let lat = fieldName === `${CONST.LATITUDE}__${index}` ? data : element.children.props.formData[0]
      let lng = fieldName === `${CONST.LONGITUDE}__${index}` ? data  : element.children.props.formData[1]
      console.log(" CHECKKKK STUFFF", fieldName, lat, lng, typeof lat, typeof lng)
      element.children.props.onChange([lat, lng])
    }
  }

  
  return <Card bg="secondary" className="mb-3 ">
    <Card.Body>
      {element.children.props.formData.map( (el, childIndex) => {
        return <GetFieldDisplay args={args}
        onChange={handleCoordinates}
        formData={el}
        id={childIndex === 0 ? `${CONST.LATITUDE}__${index}` : `${CONST.LONGITUDE}__${index}` }
        property={property}/>
      })}
    </Card.Body>

  </Card>
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
      comment={documentation.comment} 
      id={`root_Set_${label}`}/>

    <Card bg="transparent" className="w-100">
      <Card.Body>
        {props.items &&
          props.items.map((element, index) => {

            //return  PointFieldTemplate(args, props, property) 
            //let id = `${props.idSchema["$id"]}_${CONST.SET}_${index}`
          
            //let id = `${element.children.props.idSchema["$id"]}__${element.index}`
            let id = index === 0 ? `latitude__${element.index}` : `longitude__${element.index}`
            return <Stack direction="horizontal" key={element.key} className={`${element.className} align-items-baseline w-100`}>
              
              {<div className="w-100"> 
                {/** display custom elements  */}
                {<div className="w-100"> 
                  { displayCoordinates(args, element, index, property) }
                </div>}

              </div>}

              {element.hasMoveDown && (
                <Button variant={variant} 
                  className="mb-3 tdb__array__item__list bg-transparent border-0" 
                  title="Move Down" 
                  id={`MoveDown_${id}`} 
                  onClick={element.onReorderClick(
                      element.index,
                      element.index + 1
                  )}>
                  <FaArrowDown className="text-light" style={{fontSize: "20px"}}/>
                </Button>
              )}

              {element.hasMoveUp && (
                <Button variant={variant} title="Move Up"  
                  id={`MoveDown_${id}`} 
                  className="mb-3 tdb__array__item__list bg-transparent border-0" 
                  onClick={element.onReorderClick(
                    element.index,
                    element.index - 1
                  )}>
                <FaArrowUp className="text-light" style={{fontSize: "20px"}}/>
              </Button>
              )}

              {element.hasRemove && <Button  variant={variant} 
                className="mb-3 tdb__array__item__list bg-transparent border-0 " 
                title="Delete" 
                id={`Remove_${id}`} 
                onClick={element.onDropIndexClick(element.index)}>
                <RiDeleteBin5Fill className="text-danger" style={{fontSize: "25px"}}/>
              </Button>}
            </Stack>
          })} 

        {props.canAdd && (
          <div>
              <Button data-cy={`add_${label}`} variant="light" className=" tdb__add__button btn-sm text-dark" type="button" onClick={props.onAddClick}>
                <BiPlus className="mr-2"/> <label>{`Add `} {label}</label>
              </Button> 
          </div>
        )}
      </Card.Body>
    </Card>
  </div>
}

