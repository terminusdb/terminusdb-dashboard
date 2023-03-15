import React, { useState } from "react"
import { BiPlus } from "react-icons/bi"
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import * as CONST from "../constants"
import * as util from "../utils"
import { TDBLabel } from "../components/LabelComponent"
import { getDisplay } from "./fieldDisplay"
import { getPlaceholder } from "../helpers/placeholderHelper"

// gets form data per field
function getFormData (fieldData, property) {
	return fieldData[property]
	if(element.children.props.formData && 
		element.children.props.formData.hasOwnProperty(CONST.TYPE)){
		return element.children.props.formData
	}
	else return element.children.props.formData
}



// EDIT or CREATE MODE
// Array field templates for lists and sets 
export function ArrayFieldTemplate(args, props, fieldDisplay, property) { 

	let { extractedDocumentation } = args

	//console.log("props", props)
	var variant="dark"
  let label=props.title  
	let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)
	return  <div className={`${props.className} w-100`}>
		<TDBLabel name={label} 
      comment={documentation.comment} 
      id={`root_Set_${label}`}/>
		{props.items &&
			props.items.map((element, index) => {
				let id = `${props.idSchema["$id"]}_${CONST.SET}_${index}`
				return <Stack direction="horizontal" key={element.key} className={`${element.className} align-items-baseline w-100`}>
					{<div className="w-100">
						{fieldDisplay}
						{/*getFieldDisplay(args, property, element, id)*/}
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
			<div className="row">
				<p className="col-xs-3 col-xs-offset-9 array-item-add text-right"> 
					<Button data-cy={`add_${label}`} variant="light" className="btn-sm text-dark" type="button" onClick={props.onAddClick}>
						<BiPlus className="mr-2"/> <label>{`Add `} {label}</label>
					</Button> 
				</p>
			</div>
		)}
  </div>
}


