import React, { useState, useEffect } from "react"
import { BiPlus } from "react-icons/bi"
import Stack from "react-bootstrap/Stack"	
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import * as CONST from "../constants"
import * as util from "../utils"
import { TDBLabel } from "../components/LabelComponent"
import { getDisplay } from "../helpers/fieldDisplay"
import { getPlaceholder } from "../helpers/placeholderHelper"



export const ArrayTemplates = (args, props, property, ui) => {
  /**
	 * constants for dealing with update - when it comes to document links rjsf lib 
	 * has a problem in which it fails to update documentlinks of different types (object/ string)
	 * in this case we force update 
	 */
	const [update, setUpdate] = useState({})

	let { extractedDocumentation, mode } = args

	//hide set when mode is view
	if(mode === CONST.VIEW && !Object.keys(props.formData).length) return <div className={`tdb__${props.title}__hidden`}/>

	//console.log("props", props)
	var variant="dark"
  let label=props.title  
	let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property, args.fullFrame[CONST.SELECTED_LANGUAGE])
	return  <div className={`${props.className} w-100 tdb__array__holder`}>
		<TDBLabel name={label} 
      comment={documentation.comment} 
      id={`root_Set_${label}`}/> 
		{props.items &&
			props.items.map((element, index) => {
				//let id = `${props.idSchema["$id"]}_${CONST.SET}_${index}`
			
				let id = `${element.id}__${index}`
				return <Stack direction="horizontal" key={element.key} className={`${element.className} tdb__array__input align-items-baseline w-100`}>
				
					{<div className="w-100"> 


						{/** display custom elements  */}
            { element.display }
					
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
  </div>
}