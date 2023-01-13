
import React from "react"
import {Button, Form} from "react-bootstrap"
import {
	XSD_DATA_TYPE_PREFIX, 
	XDD_DATA_TYPE_PREFIX,
	RDF_DATA_TYPE_PREFIX, 
	POINT_TYPE, 
	UI_FRAME_SELECT_STYLE, 
	UI_FRAME_SUBDOCUMENT_STYLE, 
	VIEW,
	DIMENSION, 
	B_BOX, 
	OPTIONAL, 
	SET, 
	ONEOFCLASSES, 
	DOCUMENT, 
	ENUM, 
	VALUE_HASH_KEY, 
	LIST, 
	GEOMETRY_ARRAY, 
	SUBDOCUMENT, 
	ARRAY, 
	COORDINATES, 
	SUBDOCUMENT_TYPE,
	FEATURE_COLLECTION,
	SYS_UNIT_TYPE_PREFIX,
	DOCUMENTATION,
	SELECTED_LANGUAGE,
	DEFAULT_LANGUAGE,
	RDF_LANG_STRING	,
	FEATURE,
	METADATA,
	RENDER_AS,
	WIDGET,
	ORDER_AS
} from "./constants"
import {BiKey, BiPlus} from "react-icons/bi"
import {RiDeleteBin5Fill} from "react-icons/ri"
import {FcKey} from "react-icons/fc"
import {BiErrorCircle} from "react-icons/bi"
import {FaArrowDown, FaArrowUp, FaComment} from "react-icons/fa"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

// returns true for properties which are of data types xsd and xdd
const dataTypePrefix = {[XSD_DATA_TYPE_PREFIX]:true,
						[XDD_DATA_TYPE_PREFIX]:true,
						[RDF_DATA_TYPE_PREFIX]:true}
export const isDataType = (property) => {
	if(typeof property === "object") return false
	return dataTypePrefix[ property.substring(0, 4)] || false
}

// returns true for properties which are of data types is rdf:langString
export const isRdfLangString = (property) => {
	if(typeof property === "object") return false
	if(property === RDF_LANG_STRING) return true
	return false
}

export const isSysDataType = (property) => {
	if(typeof property === "object") return false
	if(property.substring(0, 4) === SYS_UNIT_TYPE_PREFIX) return true 
}

// returns true for properties which are subdocuments
export const isSubDocumentType = (property) => {
	if(property.hasOwnProperty(SUBDOCUMENT)) return true
	return false
}


// to identify if choice sub documenst
export const isChoiceSubDocumentType = (property) => {
	if(typeof property !== "object") return false
	if(Array.isArray(property) && property.length > 0) {
		let props=property[0]
		if(props.hasOwnProperty("@class") && props.hasOwnProperty(SUBDOCUMENT))
			return true
		return false
	}
	return false
}

// to identify if choice documenst
export const isChoiceDocumentType = (property) => {
	if(typeof property !== "object") return false
	if(Array.isArray(property)) {
		let props=property[0]
		if(typeof props === "string")
			return true
		return false
	}
	return false
}

// returns true for optional
export const isOptionalType = (property) => {
	if(typeof property !== "object") return false
	if(property["@type"] === OPTIONAL) return true
	return false
}


// returns true for set
export const isSetType = (property) => {
	if(typeof property !== "object") return false
	if(property["@type"] === SET) return true
	return false
}

// display geo json in view mode in a different way 
export const isGeoJSONTypeSet = (frame, mode) => {
	if(mode !== VIEW) return false 
	if(frame.hasOwnProperty("type") && 
		frame["type"].hasOwnProperty("@type") && 
		frame["type"]["@type"] === ENUM){ 
			if(frame["type"]["@values"][0] === FEATURE_COLLECTION) return true
			else return false
		}
	return false 
}

// returns true for List
export const isListType = (property) => {
	if(typeof property !== "object") return false
	if(property["@type"] === LIST) return true
	return false
}

// returns true for properties pointing to other documents or enums
export const isDocumentType = (property, frame) => {
	if(typeof property === "object") return false
	if(!frame) return false 
	let document = `${property}`
	if(frame[document]) {
		if(frame[document]["@type"] === DOCUMENT && !frame[document]["@subdocument"]) return true
	}
	return false
}

//returns true if @class is POINT type
export const isPointType = (property, frame) => {
	if(typeof property !== "object") return false
	if(property.hasOwnProperty("@class")
		&& property["@class"] === POINT_TYPE) {
			let pointProperty=`${property["@class"]}`
			if(frame.hasOwnProperty(pointProperty)) {
				return frame[pointProperty]
			}
		return false
	}
	return false
}

// function to check if both arrays are identical
function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
}

// returns true if frame is a geometry collection type 
export const isGeometryCollection = (property, mode) => {
	if(mode !== VIEW) return
	if(typeof property !== "object") return false
	if(!property.hasOwnProperty("@class"))  return false
	if(Array.isArray(property["@class"])) {
		return arrayEquals(property["@class"], GEOMETRY_ARRAY)
	}
	return false
}

// returns true if frame is a feature collection type 
export const isFeatureCollection = (property, mode) => {
	if(mode !== VIEW) return
	if(typeof property !== "object") return false
	if(!property.hasOwnProperty("@class"))  return false
	if(!property.hasOwnProperty("@type"))  return false
	if(property["@class"] === "Feature") { // feature collection 
		return true
	}
	return false
}

// returns true if frame is a geometry type 
export const isGeometry = (property, mode) => {
	if(mode !== VIEW) return
	if(Array.isArray(property)) {
		return arrayEquals(property, GEOMETRY_ARRAY) 
	}
	if(typeof property === "object") {
		if(property.hasOwnProperty("@class")) {
			if(Array.isArray(property["@class"])) {
				return arrayEquals(property, GEOMETRY_ARRAY) 
			}
		}
	}
	return false
}
 

// returns true if @subdocuments and type class
export const isSubDocumentAndClassType = (property, frame) => {
	if(typeof property === "object") return false
	if(!frame) return false
	let document = `${property}`
	if(frame[document]) {
		if(frame[document]["@type"] === DOCUMENT && frame[document]["@subdocument"]) return frame[document]
	}
	return false
}

// returns true if @type is Array and item is coordinates
export const isDocumentClassArrayType = (frame) => {
	if(typeof frame !== "object") return false
	if(frame.hasOwnProperty("@type") && frame["@type"] === ARRAY) return true
	return false
}


// returns modified frames for coordinates with type as well to differntiate between polygon/ multipolygon
export const getModifiedGeoFrame = (frame) => {
	let newFrame={}
	newFrame=frame[COORDINATES]
	if(frame.hasOwnProperty("type") && 
		frame["type"].hasOwnProperty("@type") && 
		frame["type"]["@type"] === ENUM && 
		frame["type"].hasOwnProperty("@values")) {
			newFrame["info"]=frame["type"]["@values"][0]
	}
	if(frame.hasOwnProperty(B_BOX)) {
		newFrame[B_BOX]=frame[B_BOX]
	}
	return newFrame
}

// setBounds converts geo json bound to bounds format supported in leaflet 
export function setBounds(formData) {
	if(!formData.hasOwnProperty(B_BOX)) return []
	if(formData[B_BOX].length<4) return []
	//[west,south,east,north]
	let westSouth=[formData[B_BOX][0], formData[B_BOX][1]]
	let eastNorth=[formData[B_BOX][2], formData[B_BOX][3]]
	let bounds=[westSouth, eastNorth]
	return bounds
}

// returns true for properties ponting to an enum class
export const isEnumType = (property) => {
	if(typeof property !== "object") return false
	if(property["@type"] === ENUM) return true
}

// returns true for properties which is an array type and has one dimension only
// there is no support for 2D and 3D for properties other than geo properties
export const isArrayType = (frame) => {
	if(typeof frame !== "object") return false
	if(frame["@type"] === ARRAY && frame[DIMENSION] === 1) return true
	return false
}

// field array to display field titles
export function getSubDocumentLabel(item, documentation, required, color) {
	let title=[]
	let label=getLabelFromDocumentation(item, documentation)
	title.push(<>
		<h6 className={color} style={{display: "contents"}}>{label}</h6>
		{required && <span className="required">*</span>}
	</>)
	//<GoFileSubmodule className="mr-2"/>
	return title
}

/**
 * 
 * @param {*} uiFrame - extracted frames
 * This function removes the * astericks symbol from title to let user know its optional
*/
export function removeRequired (item, documentation, uiFrame) {
    let newUI={}
    for(var uiItems in uiFrame){
        if(uiItems === "ui:title") {
            newUI[uiItems]=getSubDocumentLabel(item, documentation, false)
        }
        else newUI[uiItems]=uiFrame[uiItems]
    }
    return newUI
}


// field array to display field titles
export function getSubDocumentTitle(item, documentation, color) {
	let title=[]
	let label=getLabelFromDocumentation(item, documentation)
	title.push(<h6 className={color} style={{display: "contents"}}>{label}</h6>)
	//<GoFileSubmodule className="mr-2"/>
	return title
} 

export function getSubDocumentDescription(item, description) {
	let descr=[]
	if(description) descr.push(<small className="text-muted">{description}</small>)
	else descr.push(<small className="text-muted">{`${item} is a sub document. If you wish to fill a property of ${item} make sure all mandatory fields are entered.`}</small>)
	return descr
}

export function getTitle(item, uiDisable, documentation) {
	let label=getLabelFromDocumentation(item, documentation)
	if(uiDisable) return <span key={label}  title={`${label} is a key field. Once created, you will not be able to update this field.`}><FcKey className="mr-2"/>{label}</span>
    else return <span key={label} >{label}</span>
}

export function getEnumTitle(item, uiDisable, label) {
	if(uiDisable) return <span key={label}  title={`${label} is a key field. Once created, you will not be able to update this field.`}><FcKey className="mr-2"/>{label}</span>
    else return <span key={label} >{label}</span>
}

export function getSetTitle(item, documentation) {
	let label=getLabelFromDocumentation(item, documentation)
	return label
}


// field array to display key fields
export function getFieldTitle(item, uiDisable) {
	if(uiDisable) return <span key={item} title={`${item} is a key field. Once created, you will not be able to update this field.`}>
	<FcKey className="mr-2"/>{item}</span>
}

// get default values to document/ enum types
export function getDefaultValue(item, formData) {
	if(!formData) return false
	if(Object.keys(formData).length === 0) return false
	if(formData.hasOwnProperty(item)) return formData[item]
	return false
}

// List required min 1 item in it so forthe first subdocument we make all its fields mandatory
export function getRequiredForListSubDocs(properties){
	let required=[]
	for(var key in properties){
		if(key !== "@type") required.push(key)
	}
	return required
}

export function HideArrayFieldTemplate(props) {
	return <div/>
}


export function ArrayFieldTemplate(props) {
	//console.log("props", props.title, props.className, props.canAdd)
	var variant="dark"
	if(props.schema.info==="SUBDOCUMENT") variant="secondary"

	return  (
			<div className={`${props.className} w-100`}>
				<span className="control-label">{props.title}</span>
				{/*<p className="text-muted fw-bold">{`${props.title} is a Set. To add ${props.title} click on the Add button`}</p>*/}
				{props.items &&
					props.items.map(element => (
						<div key={element.key} className={`${element.className} align-items-baseline`}>
							{<div>{element.children}</div>}
							{element.hasMoveDown && (
									<Button variant={variant} className="mb-3 tdb__array__item__list bg-transparent border-0" title="Move Down"  onClick={element.onReorderClick(
											element.index,
											element.index + 1
										)}>
										<FaArrowDown className="text-light" style={{fontSize: "20px"}}/>
									</Button>
							)}
							{element.hasMoveUp && (
									<Button variant={variant} title="Move Up"  className="mb-3 tdb__array__item__list bg-transparent border-0" onClick={element.onReorderClick(
											element.index,
											element.index - 1
										)}>
									<FaArrowUp className="text-light" style={{fontSize: "20px"}}/>
							</Button>
							)}

							{element.hasRemove && <Button  variant={variant} className="mb-3 tdb__array__item__list bg-transparent border-0" title="Delete" onClick={element.onDropIndexClick(element.index)}>
									<RiDeleteBin5Fill className="text-danger" style={{fontSize: "25px"}}/>
							</Button>}

						</div>
				))}

				{props.canAdd && (
					<div className="row">
						<p className="col-xs-3 col-xs-offset-9 array-item-add text-right">
							<Button data-cy={`add_${props.title}`} variant="light" className="text-dark" type="button" onClick={props.onAddClick}>
									<BiPlus className="mr-2"/> <label>{`Add ${props.title}`}</label>
							</Button> 
						</p>
					</div>
				)}
			</div>
		)

}


// hide a field
export const hidden = () => <div/>

// function checks if formData has a filled value for item
export function isFilled (formData, item){
	if(!formData) return false
	if(Array.isArray(formData)) return true
	if(formData.hasOwnProperty(item) && Array.isArray(formData[item]) && formData[item].length) return true
	if(formData.hasOwnProperty(item) && formData[item]) return true
	if(formData.hasOwnProperty(item) && formData[item] === 0) return true
	return false
}

// function checks in property is key of a document
export function checkIfKey(property, key) {
    if(!key) return
	if(!key["@fields"]) return
	var isKey=false
	key["@fields"].map(item => {
		if(item === property) {
			isKey=true
			return
		}
	})
	return isKey
}


 // check if document has ValueHash type key
export function isValueHashDocument(frame) {
	if(!frame) return null
	if(frame["@key"] && frame["@key"]["@type"] &&
		frame["@key"]["@type"] === VALUE_HASH_KEY) {
			return true
	}
	return false
}

export function getValueHashMessage () {
	return <p className="text-muted fw-bold">
		<BiErrorCircle className="mr-2"/>
		Edit is disabled for a document with Value Hash key.
		A Value Hash object will change its id and is generated from its properties. Best way would be to
		delete this document and create a new one.
	</p>
}


// function for set subdocuments to make fields mandatory only if one field is enterred
function getOtherProperties(property, properties)  {
    let other = []
    for (var props in properties) {
        if(props === "@type") continue
        if(props !== property) {
            other.push(props)
        }
    }
    return other
}

export function getDependencies(properties) {
    let dependencies = {}
    for (var props in properties) {
        if(props === "@type") continue
        dependencies[props] = getOtherProperties(props, properties)
    }
    return dependencies
}

// get select options to display
function getSelectOptions(placeholder, defaultValue, enums) {
	let opts=[]
	opts.push(<option value="">{placeholder}</option>)
	if(Array.isArray(enums)) {
		enums.map(enu => {
			if(enu === defaultValue) opts.push(<option value={enu} selected>{enu}</option>)
			else opts.push(<option value={enu}>{enu}</option>)
		})
	}
	return opts
}

// get select component with required
export function getRequiredSelect_ol(item, selectDocument, defaultValue, enums) {
	const handleSelect= (e, props) => { //create or edit
		if(props.onChange) props.onChange(e.target.value)
	}

	let opts=getSelectOptions(`Select ${selectDocument} ...`, defaultValue, enums)
	return <React.Fragment>
		<Form.Label>{item}</Form.Label>
		<span class="required">*</span>
		<select className="d-block form-control"
			defaultValue={defaultValue}
			required
			onChange={(e) => handleSelect(e, props)}>
			{opts}
		</select>
	</React.Fragment>
}

// get select component with required
export function getRequiredSelect(props) {
	const handleSelect= (e, props) => { //create or edit
		if(props.onChange) props.onChange(e.target.value)
	}

	let opts=getSelectOptions(props.uiSchema["ui:placeholder"], props.formData, props.schema.enum)
	return <React.Fragment>
		{/*<Form.Label>{props.name}<span class="required">*</span></Form.Label>*/}
		<select className="d-block form-control"
			required
			onChange={(e) => handleSelect(e, props)}>
			{opts}
		</select>
	</React.Fragment>
}

// get select component with no required
export function getOptionalSelect_OLD (props) {
	const handleSelect= (e, props) => { //create or edit
		if(props.onChange) props.onChange(e.target.value)
	}
	let opts=getSelectOptions(props.uiSchema["ui:placeholder"], props.formData, props.schema.enum)
	return <React.Fragment>
		<Form.Label>{props.name}</Form.Label>
		<select className="d-block form-control"
			onChange={(e) => handleSelect(e, props)}>
			{opts}
		</select>
	</React.Fragment>
}

// get select component with no required
export function getOptionalSelect (props) {
	const handleSelect= (e, props) => { //create or edit
		if(props.onChange) props.onChange(e.target.value)
	}
	let opts=getSelectOptions(props.uiSchema["ui:placeholder"], props.formData, props.schema.enum)
	return <React.Fragment>
		<Form.Label>{props.name}</Form.Label>
		<select className="d-block form-control"
			onChange={(e) => handleSelect(e, props)}>
			{opts}
		</select>
	</React.Fragment>
}

// remove defaults from set/ list - filled frames of subdocuments
export function removeDefaultsFromSubDocumentFrame (json) {
    // remove default values and get them from form Data
    var newJson=json
    for(var key in newJson){
        for (var item in newJson[key]){
            if(item === "default") delete newJson[key][item]
        }
    }
    return newJson
}

// remove defaults from set/ list - filled frames of data
export function removeDefaultsFromDataFrame (json) {
    // remove default values and get them from form Data
    var newJson=json
    for(var key in newJson){
        if(key === "default") delete newJson[key]
    }
    return newJson
}


// extract document class name from link documents
export function extractClassName(document, fullFrame) {
    let str = document
    let splits = str.split('/')
    let documentClass = splits[0]
    if(fullFrame.hasOwnProperty( `${documentClass}`)) {
        return splits[0] // if definition available in full frame
    }
    return false
}

// function to remove @ids from filled frames - we use this function during edit mode so we do not re send id
export function removeIds(dataArray){
	if(!Array.isArray(dataArray)) return []
	let newDataArray = []
	dataArray.map(da => {
		let newJson = {}
		for(var thing in da){
			if(thing === "@id") continue
			newJson[thing] = da[thing]
		}
		newDataArray.push(newJson)
	})
	return newDataArray
}

// add custom ui layout to existing default ui layout
export function addCustomUI (item, uiFrame, uiLayout) {
	if(!uiFrame) return uiLayout
	if(!Object.keys(uiFrame).length) return uiLayout

	let defaultUILayout = uiLayout
	if(uiFrame && uiFrame.hasOwnProperty(item)) {
        for (var uiItems in uiFrame[item]) {
            if(defaultUILayout.hasOwnProperty(uiItems) 
				&& uiItems !== "ui:widget"
				&& uiItems !== "ui:placeholder"
				&& uiItems !== "ui:description"
				&& uiItems !== "ui:title"
				&& uiItems !== "ui:field"
				&& uiItems !== "classNames") {
                let uiDefault = defaultUILayout[uiItems]
				defaultUILayout[uiItems] = `${uiDefault} ${uiFrame[item][uiItems]}`
            }
            else defaultUILayout[uiItems] = uiFrame[item][uiItems]
        }
    }
	
	if(defaultUILayout && defaultUILayout.hasOwnProperty("ui:widget") && defaultUILayout["ui:widget"] === "hidden") {
		if(defaultUILayout.hasOwnProperty("ui:ArrayFieldTemplate")){
			// array type - set or list
			defaultUILayout={
				"ui:widget": 'hidden',
				"ui:ArrayFieldTemplate": HideArrayFieldTemplate
			}
		}
		else defaultUILayout={"ui:widget": 'hidden'}
	}
	
	return defaultUILayout
}

// add custom ui layout to existing default ui layout for subdocuments
export function addCustomUISubDocuments(item, uiFrame, uiLayout) {
	if(!uiFrame) return uiLayout
	if(!Object.keys(uiFrame).length) return uiLayout

	let newUILayout = uiLayout
    
	if(uiFrame && uiFrame.hasOwnProperty(item)) {
        for (var keys in uiFrame[item]) {
            if(uiLayout.hasOwnProperty(keys)) {
                for(var ui in uiLayout[keys]) {
                    if(uiFrame[item][keys].hasOwnProperty(ui)){
                        let newUI = `${uiLayout[keys][ui]} ${uiFrame[item][keys][ui]}`
						console.log("newUI", newUI)
                        newUILayout[keys][ui]=newUI
                    }
                    else {
                        newUILayout[keys][ui]=uiLayout[keys][ui]
                    }
                }
            }
        }
        
        for(var keys in uiFrame[item]) {
            if(newUILayout.hasOwnProperty(keys)) {
                for(var otherItems in uiFrame[item][keys]) {
                    // stitch custom ui frames to new ui layout
                    if(!newUILayout[keys].hasOwnProperty(otherItems)) {
                        newUILayout[keys][otherItems]=uiFrame[item][keys][otherItems]
                    }
                }
            }
        }
    }
    
	return newUILayout
}

// function to check if custom uiFrame has select_style defined
export function extractUIFrameSelectTemplate (uiFrame) {
	if(!uiFrame) return null
	if(Object.keys(uiFrame).length===0) return null
	if(uiFrame.hasOwnProperty(UI_FRAME_SELECT_STYLE)){
		return uiFrame[UI_FRAME_SELECT_STYLE]
	}
	return null
}

// function to check if custom uiFrame has subDocument_styles style defined
export function extractUIFrameSubDocumentTemplate (uiFrame) {
	if(!uiFrame) return null
	if(Object.keys(uiFrame).length===0) return null
	if(uiFrame.hasOwnProperty(UI_FRAME_SUBDOCUMENT_STYLE)){
		return uiFrame[UI_FRAME_SUBDOCUMENT_STYLE]
	}
	return null
}

// function to extract empty frames from choice any of properties already filled with defaults
export function getSetChoiceEmptyFrames (frame, item) {
	let anyOfFrames = frame.properties[item].anyOf, emptyAnyOfFrames=[]
    if(anyOfFrames && Array.isArray(anyOfFrames)) {
        anyOfFrames.map(choice => {
            let choiceStructure = {}
            for(var chItems in choice) {
                if(chItems === "properties") {
                    let propertyStructure={}
                    for(var props in choice["properties"]) {
                        // remove default values
                        propertyStructure[props]={}
                        // do not remove default of info, since required in extract.js
                        if(props === "info") {
                            propertyStructure[props]=choice["properties"][props]
                        }
                        else {
                            for(var pItem in choice["properties"][props]) {
                                if(pItem !== "default") {
                                    propertyStructure[props][pItem] = choice["properties"][props][pItem]
                                }
                            }
                        }

                    }
                    choiceStructure["properties"]=propertyStructure
                }
                else choiceStructure[chItems] = choice[chItems]
            }
            emptyAnyOfFrames.push(choiceStructure)
        })
    }
	return emptyAnyOfFrames
}

/**
 * 
 * @param {*} documentation - documentation object which contains labels and comments
 * @param {*} language - language selected from UI 
 */
export function addSelectedLanguageToDocumentation(documentation, language) {
	if(!language) return documentation
	let extractedDocumentation=[]
	if(language){
        documentation.map(doc => {
            let modified={}
            for(var ds in doc) {
                modified[ds]=doc[ds]
            }
            modified[SELECTED_LANGUAGE]=language
            extractedDocumentation.push(modified)
        })
    }
	return extractedDocumentation
}

/**
 * 
 * @param {*} documentation - documentation object which contains labels and comments
 * @param {*} item - item 
 * @param {*} subDocument - if true then simply return the extracted comment instead of a rect component
 * @returns - returns comment in which item is to be displayed in UI 
 */
export function getCommentFromDocumentation (item, documentation, subDocument) {
	let comment=false
	if(!documentation) return comment
	if(!Array.isArray(documentation)) return comment
	documentation.map(doc => {
		if (doc.hasOwnProperty(SELECTED_LANGUAGE)) { // search documentation to display selected language from UI 
			if(doc["@language"] === doc["@selectedLanguge"]) { // language match found
				if(doc.hasOwnProperty("@properties") && 
					doc["@properties"].hasOwnProperty(item)) {
						if(doc["@properties"][item].hasOwnProperty("@comment")){
							comment=doc["@properties"][item]["@comment"]
						}
				}
			}
		} 
		else {
			if(doc["@language"] === DEFAULT_LANGUAGE) { // language match found with default language en
				if(doc.hasOwnProperty("@properties") && 
					doc["@properties"].hasOwnProperty(item)) {
						if(doc["@properties"][item].hasOwnProperty("@comment")){
							comment=doc["@properties"][item]["@comment"]
						}
				}
			}
		}
		
	})
	if(!comment) return <div/>
	if(subDocument) return comment //if true then simply return the extracted comment instead of a rect component
	return <OverlayTrigger
		key={comment}
		placement={'left'}
		overlay={
		<Tooltip id={`tooltip-left`}>
			<small className="text-muted">{comment}</small>
		</Tooltip>
		}
	>
		<Button className="btn-sm text-muted comment_overlay_css bg-transparent border-0 float-right"><FaComment/></Button>
	</OverlayTrigger>
}

/**
 * 
 * @param {*} documentation - documentation object which contains labels and comments
 * @param {*} item - item 
 * @returns - returns label in which item is to be displayed in UI 
 */
export function getLabelFromDocumentation (item, documentation) {
	if(!documentation) return item
	if(!Array.isArray(documentation)) return item
	let label=item
	documentation.map(doc => {
		if (doc.hasOwnProperty(SELECTED_LANGUAGE)) { // search documentation to display selected language from UI 
			if(doc["@language"] === doc["@selectedLanguge"]) { // language match found
				if(doc.hasOwnProperty("@properties") && 
					doc["@properties"].hasOwnProperty(item)) {
						if(doc["@properties"][item].hasOwnProperty("@label")){
							label=doc["@properties"][item]["@label"]
						}
						else label=item
						return
				}
			}
		}
		else return label
	})
	return label
}

/**
 * 
 * @param {*} documentation - documentation object which contains labels and comments
 * @param {*} item - item 
 * @param {*} values - choice property value array 
 * @returns - returns label in which item is to be displayed in UI 
 */
 export function getLabelFromEnumDocumentation (item, documentation, values) {
	let enumDocumentation={
		"@label": item,
		"@values": values
	}
	if(!documentation) return enumDocumentation
	if(!Array.isArray(documentation)) return enumDocumentation
	let valueArray=[]
	documentation.map(doc => {
		if (doc.hasOwnProperty(SELECTED_LANGUAGE)) { // search documentation to display selected language from UI 
			if(doc["@language"] === doc["@selectedLanguge"]) { // language match found
				if(doc.hasOwnProperty("@label")) {
					enumDocumentation["@label"]=doc["@label"] // extract enum property label
				}
				if(doc.hasOwnProperty("@values")) {	// extract enum option labels
					for(var val in doc["@values"]){
						if(doc["@values"][val].hasOwnProperty("@label")) valueArray.push(doc["@values"][val]["@label"])
					}
					enumDocumentation["@values"]=valueArray
				}
				else enumDocumentation["@values"]=values
			}
			return enumDocumentation
		}
		else {
			enumDocumentation["@label"]=item
			enumDocumentation["@values"]=values
		}
	})
	return enumDocumentation
}

/**
 * 
 * @param {*} documentation - documentation object from calling sub frame to get selected language from UI 
 * @returns - returns language in which frame viewer will display properties 
 */
export function getLanguage(documentation) {
	let language=false
	if(!documentation) return language
	if (Array.isArray(documentation) && documentation.length > 0) {
		if(documentation[0].hasOwnProperty(SELECTED_LANGUAGE)) { // get selected language from UI 
			language=documentation[0][SELECTED_LANGUAGE]
		}
	}
	return language
}

/**
 * 
 * @param {*} fullframe - full frame from a data product
 * @param {*} item - item 
 * @param {*} documentation - documentation object from calling sub frame to get selected language from UI 
 * @returns - returns documentation of item of interest
 */
export function extractEnumDocumentation (fullframe, item, documentation) {
	if(!fullframe) return false 
	let language=false
	if (Array.isArray(documentation) && documentation.length > 0) {
		if(documentation[0].hasOwnProperty(SELECTED_LANGUAGE)) { // get selected language from UI 
			language=documentation[0][SELECTED_LANGUAGE]
		}
	}
	if(fullframe.hasOwnProperty(item)) { // get enum frame
		let enumDocumentation=extractDocumentation(fullframe, item, language)
		return enumDocumentation
	}
	return false
}

/**
 * 
 * @param {*} frame - full frame from a data product
 * @param {*} item - item 
 * @returns - returns documentation of item of interest
 */
export function extractDocumentation(frame, item, language) {
	let documentation=[]
	if(frame.hasOwnProperty(item) && frame[item].hasOwnProperty(DOCUMENTATION)) {
		let docArr=[]
		if(language) {
			frame[item][DOCUMENTATION].map(doc => {
				let obj={}
				for(var things in doc) {
					obj[things]=doc[things]
				}
				obj[SELECTED_LANGUAGE]=language
				docArr.push(obj)
			})
			documentation=docArr
		} 
		else documentation = frame[item][DOCUMENTATION]
	}
	return documentation
}

/**
 * 
 * @param {*} fullFrame - full frame from a data product
 * @param {*} documentClass - choice document classes 
 */
export function extractChoiceDocumentLabels(frame, choice, language) {
	let extracted={
		"@label":choice
	}
	if(frame.hasOwnProperty(choice) && 
		frame[choice].hasOwnProperty(DOCUMENTATION) &&
		Array.isArray(frame[choice][DOCUMENTATION])){
			frame[choice][DOCUMENTATION].map(doc => {
				if(doc["@language"] === language) {
					if (doc.hasOwnProperty("@label"))  extracted["@label"]=doc["@label"]
					if (doc.hasOwnProperty("@comment")) extracted["@comment"]=doc["@comment"]
					return extracted
				}
			})
		}
	return extracted
}


/**
 * 
 * @param {*} frame frame of interest
 * @param {*} item item of interest
 * @returns metadata render widget type
 */
export function checkForMetaData (frame, item) {
    if(frame.hasOwnProperty(METADATA) && 
        frame[METADATA].hasOwnProperty(RENDER_AS) && 
        frame[METADATA][RENDER_AS].hasOwnProperty(item) &&
        frame[METADATA][RENDER_AS][item].hasOwnProperty(WIDGET)) {
            return frame[METADATA][RENDER_AS][item][WIDGET]
    }
    return false
}


/**
 * 
 * @param {*} frame frame of interest
 * @returns metadata json type
 */
 export function getMetaData (frame) {
    if(frame.hasOwnProperty(METADATA)) {
        return frame[METADATA]
    }
    return false
}

/**
 * 
 * @param {*} frame frame of interest
 * @returns metadata json type
 */
export function getOrderFromMetaData(frame) {
	let metaDataFrame=getMetaData(frame)
	if(!metaDataFrame) return metaDataFrame
	if(metaDataFrame.hasOwnProperty(ORDER_AS)) {
		const orderArray = ["@documentation"].concat(metaDataFrame[ORDER_AS]) 
		return orderArray
	}
	return false
}

/** function to get row height to display in textareas for xsd:string */
export function getRowHeight(data) {
	if(Array.isArray(data)) return 1
    return data.split(/\r\n|\r|\n/).length
}
