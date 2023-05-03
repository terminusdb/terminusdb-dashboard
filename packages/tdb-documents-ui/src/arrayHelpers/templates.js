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
import { HiddenWidgets } from "../widgets/hiddenWidgets"

// custom display of elements based on schema 
export const GetFieldDisplay = ({ args, props, element, id, property, setUpdate, update }) => {

	function handleElementChange(data, name, element) {
		if(element.children.props.hasOwnProperty("child")) {
			// for array properties inside documents 
			element.children.props.onChange(data, element.index); 
		}
		else element.children.props.onChange(data); 
		setUpdate(Date.now()) 
	}

	function fieldDisplay() {
		let doc = args.documentFrame[property]
		let placeholder=getPlaceholder(doc) 
		let newProps = { 
			dataType: placeholder,
			name: property,
			formData: element.children.props.formData,
			mode: args.mode, 
			id: id, 
			isArray: true,
			placeholder: placeholder, 
			className: "tdb__doc__input",
			hideFieldLabel: props.hasOwnProperty(CONST.HIDE_FIELD_LABEL) ? props[CONST.HIDE_FIELD_LABEL] : true, // always hide label for Set fields
			onChange: (data, name) => handleElementChange(data, name, element),
			hideFieldLabel: true,
			index: element.index.toString() // convert index to String - this index controls diff set ups for Arrays 
		}  
 
		return getDisplay(newProps, args, property)

	}

	return <span> 
		{fieldDisplay()}
	</span>
} 

export const DisplayExtraElements = ({ args, props, property }) => {
	if(args.uiFrame && args.uiFrame.hasOwnProperty(property)) {
		// no extra elements available from DiffViewer at this point 
		if(props.items.length === args.uiFrame[property].length) return <React.Fragment/>
		let extraElementsCount = args.uiFrame[property].length - props.items.length, elements =[]
		for(let count = 0; count< extraElementsCount; count++) {
			let id = `root_hidden__${count}`
			elements.push(
				<HiddenWidgets args={args} 
					name={props.title}
					required={props.required}
					className={args.uiFrame[property][count + props.items.length][CONST.CLASSNAME]}
					id={id} 
					hideFieldLabel={true}
					/>
			)
		}	
		return elements
	}
}

 
// EDIT or CREATE MODE
// Array field templates for lists and sets 
export function ArrayFieldTemplate(args, props, property) { 

	/** 
	 * constants for dealing with update - when it comes to document links rjsf lib 
	 * has a problem in which it fails to update documentlinks of different types (object/ string)
	 * in this case we force update 
	 */
	const [update, setUpdate] = useState(Date.now())

	let { extractedDocumentation, mode } = args

	//hide set when mode is view
	if(mode === CONST.VIEW && !Object.keys(props.formData).length) return <div className={`tdb__${props.title}__hidden`}/>

	//console.log("props", props)
	var variant="dark"
  let label=props.title  
	let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property, args.fullFrame[CONST.SELECTED_LANGUAGE])
	return  <div className={`${props.className} w-100 tdb__array__holder`}>
		<TDBLabel name={documentation.hasOwnProperty("label") && documentation["label"] ? documentation["label"] : label}  
      comment={documentation.comment} 
      id={`root_Set_${label}`}/> 
		 
		{props.items &&
			props.items.map((element, index) => {
				//let id = `${props.idSchema["$id"]}_${CONST.SET}_${index}`
			
				let id = `${element.children.props.idSchema["$id"]}__${element.index}`
				return <Stack direction="horizontal" key={element.key} className={`${element.className} tdb__array__input align-items-baseline w-100`}>
				
					{<div className="w-100"> 
						{/** display custom elements  */}
						{update && <GetFieldDisplay args={args} 
							props={props} 
							element={element} 
							id={id} 
							update={update} 
							setUpdate={setUpdate}
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
							<FaArrowDown className="text-muted" style={{fontSize: "20px"}}/>
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
						<FaArrowUp className="text-muted" style={{fontSize: "20px"}}/>
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

		{mode === CONST.VIEW && <DisplayExtraElements args={args} property={props.title} props={props}/>}

		{props.canAdd && (
			<div>
					<Button data-cy={`add_${label}`} variant="light" className=" tdb__add__button btn-sm text-dark" type="button" onClick={props.onAddClick}>
						<BiPlus className="mr-2"/> <label>{`Add `} {label}</label>
					</Button> 
			</div>
		)}
  </div>
}


