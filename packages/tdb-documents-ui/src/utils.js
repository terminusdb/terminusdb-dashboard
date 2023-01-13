import React from "react"
import * as CONST from "./constants"
import {BiErrorCircle} from "react-icons/bi"
import {FcKey} from "react-icons/fc"

 
/***  ------ util functions to check type of property ------ */

// returns true for properties which are of data types xsd and xdd
const dataTypePrefix = {
	[CONST.XSD_DATA_TYPE_PREFIX]: CONST.DATA_TYPE,
	[CONST.XDD_DATA_TYPE_PREFIX]: CONST.DATA_TYPE
}

/**
 * 
 * @param {*} field - field of a property
 * @returns true if type normal data type xsd/ xdd/ rdf
 */
export const isDataType = (field) => {
	if(typeof field === "object") return false
	return dataTypePrefix[field.substring(0, 4)] || false
}

/**
 * 
 * @param {*} field - field of a property
 * @returns true if type is subdocument
 */
export const isSubDocumentType = (field) => {
	if(field.hasOwnProperty(CONST.SUBDOCUMENT)) return CONST.SUBDOCUMENT_TYPE
	return false
}

/**
 * 
 * @param {*} field - field of a property
 * @returns true if choice sub documenst
 */
export const isChoiceSubDocumentType = (field) => {
	if(typeof field !== CONST.OBJECT_TYPE) return false
	if(Array.isArray(field) && field.length > 0) {
		let props=field[0]
		if(props.hasOwnProperty("@class") && props.hasOwnProperty(CONST.SUBDOCUMENT))
			return true
		return false
	}
	return false
}


/**
 * 
 * @param {*} field - field of a property
 * @param {*} fullFrame - data product's entire frames
 * @returns true for properties linked to other document classes
 */
export const isDocumentType = (field, fullFrame) => {
	if(typeof field === CONST.OBJECT_TYPE) return false
	if(!fullFrame) return false 
	let document = `${field}`
	if(fullFrame[document]) {
		if(fullFrame[document]["@type"] === CONST.DOCUMENT && 
			!fullFrame[document][CONST.SUBDOCUMENT]) return true
	}
	return false
}

/**
 * 
 * @param {*} field - field of a property
 * @returns true if type is sys:JSON
 */
export const isSysJSONDataType = (field) => {
	if(typeof field === CONST.OBJECT_TYPE) return false
	if(field.substring(0, 8) === CONST.SYS_JSON_TYPE) return true 
	return false
}

/**
 * 
 * @param {*} field - field of a property
 * @returns true if type is sys:Unit
 */
 export const isSysUnitDataType = (field) => {
	if(typeof field === CONST.OBJECT_TYPE) return false
	if(field.substring(0, 8) === CONST.SYS_UNIT_DATA_TYPE) return true 
	return false
}

/**
 * 
 * @param {*} field - field of a property
 * @returns true for properties linked to an enum class
 */
export const isEnumType = (field) => {
	if(typeof field !== CONST.OBJECT_TYPE) return false
	if(field["@type"] === CONST.ENUM) return true
}



/**
 * 
 * @param {*} field - field of a property
 * @returns true if choice documents
 */
export const isChoiceDocumentType = (field) => {
	if(typeof field !== CONST.OBJECT_TYPE) return false
	if(Array.isArray(field) && field.length) {
		// check if array has string in it 
		if(typeof field[0] === CONST.STRING_TYPE) 
			return true
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

/**
 * 
 * @param {*} frame - frame 
 * @param {*} item - property name
 * @param {*} mode - mode create, edit or view
 * @returns true if property is a geometry collection matching values of CONST.GEOMETRY_ARRAY
 */
export const checkIfGeoArray = (frame, item, mode) => {
	if(Array.isArray(frame[item])) {
		return arrayEquals(frame[item], CONST.GEOMETRY_ARRAY)
	}
	return false
}

// returns true if frame is a feature collection type 
export const isFeatureCollection = (property, mode) => {
	if(mode !== CONST.VIEW) return false
	if(typeof property !== CONST.OBJECT_TYPE) return false 
	if(property.hasOwnProperty("@class") && property["@class"] === "Feature") return true
	return false
}

// returns true for properties which are of data types is rdf:langString
export const isRdfLangString = (property) => {
	if(typeof property === "object") return false
	if(property === CONST.RDF_LANG_STRING) return true
	return false
}


/***  util functions to check Mandatory/ Optional/ Set/ List property */
/**
 * 
 * @param {*} frame - sub frame of properties
 * @param {*} property - property 
 * @returns true if property is Mandaroty 
 */
export const isMandatory = (frame, property) => { 
	let field=frame[property]
	if(typeof field !== CONST.OBJECT_TYPE) return true 
	if(typeof field === CONST.OBJECT_TYPE) {
		// subdocument 
		if(field.hasOwnProperty(CONST.SUBDOCUMENT)) return true 
		// choice subdocument 
		if(Array.isArray(field)) return true
		// enums
		if(field.hasOwnProperty("@type") && field["@type"] === CONST.ENUM) return true
	} 
	return false
}

/**
 * 
 * @param {*} frame - sub frame of properties
 * @param {*} property - property 
 * @returns true if property is Optional 
 */
 export const isOptional = (frame, property) => {
	let field=frame[property]
	if(typeof field !== CONST.OBJECT_TYPE) return false
	if(field.hasOwnProperty("@type") && field["@type"] === CONST.OPTIONAL)  return true
	return false
}

/**
 * 
 * @param {*} frame - sub frame of properties
 * @param {*} property - property 
 * @returns true if property is Set 
 */
 export const isSet = (frame, property) => {
	let field=frame[property]
	if(typeof field !== CONST.OBJECT_TYPE) return false
	if(field.hasOwnProperty("@type") && field["@type"] === CONST.SET)  return true
	return false
}

// returns true for properties which is an array type and has one dimension only
// there is no support for 2D and 3D for properties other than geo properties
export const isArrayType = (frame, item) => {
	if(typeof frame[item] !== CONST.OBJECT_TYPE) return false
	if(frame[item]["@type"] === CONST.ARRAY && frame[item].hasOwnProperty(CONST.DIMENSION)) return true
	return false
}

/**
 * 
 * @param {*} frame - sub frame of properties
 * @param {*} property - property 
 * @returns true if property is List 
 */
 export const isList = (frame, property) => {
	let field=frame[property]
	if(typeof field !== CONST.OBJECT_TYPE) return false
	if(field.hasOwnProperty("@type") && field["@type"] === CONST.LIST)  return true
	return false
}


/***  util functions to extract frame from Optional/ Set/ List */
export const extractFrames = (frame, item, language) => {
	if(!frame.hasOwnProperty(item)) { 
		throw new Error (`Extracted frame does not have ${item} defined ... `)
	}
	if(!frame[item].hasOwnProperty("@class")) { 
		throw new Error (`Extracted frame does not have @class defined ... `)
	}
	let extracted = {[item]: frame[item]["@class"]}
	// extract documentation to append to optional/set or list frmaes
	let documentation=extractDocumentation(frame, item)
	if(documentation){
		extracted[CONST.DOCUMENTATION]=documentation
	}
    //if(getMetaData(frame[item])) {
	let metadata=getMetaData(frame)
	if(metadata) {
        // extract metaData and append to optional/set or list frmaes
        extracted[CONST.METADATA]=metadata
    }
    return extracted
}


/** ------ meta data functions ------ */

/**
 * 
 * @param {*} frame frame of interest
 * @returns metadata json type
 */
 export function getMetaData (frame) { 
    if(frame.hasOwnProperty(CONST.METADATA)) {
        return frame[CONST.METADATA]
    }
    return false
}

/**
 * 
 * @param {*} frame frame of interest
 * @param {*} property field name
 * @returns true if property has been defined in @metadata and is set to render as markdown
 */
export function checkIfRenderedAsMarkdown(frame, property, diffPatch) {
	if(frame.hasOwnProperty(CONST.METADATA) && 
		frame[CONST.METADATA].hasOwnProperty(CONST.RENDER_AS) && 
		frame[CONST.METADATA][CONST.RENDER_AS].hasOwnProperty(property) && 
		frame[CONST.METADATA][CONST.RENDER_AS][property] === CONST.MARKDOWN && 
		diffPatch.hasOwnProperty(property)) {
			// check if any fields have been rendered as markdown 
			// if rendered as markdown display diffViewer a bit differently 
			return true
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
	if(metaDataFrame.hasOwnProperty(CONST.ORDER_BY)) {
		const orderArray = [CONST.DOCUMENTATION].concat(metaDataFrame[CONST.ORDER_BY]) 
		return orderArray
	}
	return false
}

/**
 * 
 * @param {*} frame - property frame
 * @param {*} property - property name
 */
export function isOneOfDataType (frame, property) {
	if(property === CONST.ONEOFVALUES && Array.isArray(frame[property])) return true
	return false
}

/** ------ ui util functions ------ */

// widget to hide filed from ui in View mode
export const hidden = (props) => {
	//console.log("props", props); 
	return <div className="tdb__hidden_from_view_mode"/>
}



/** checks weather to display layout title if form data dosent have item in view mode for array type frames*/
export function generateTitle (item, formData, mode, documentation) {
    if(mode === CONST.VIEW && formData && !formData.hasOwnProperty(item)) {
        return ""
    }
    return getLabelFromDocumentation(item, documentation)
}

/**
 * 
 * @param {*} uiFrame - uiFrame to alter look and feel of sub document 
 * @returns  custom subDocument_styles style defined in uiFrame
 */
 export function extractUIFrameSubDocumentTemplate (uiFrame) {
	if(!uiFrame) return null
	if(Object.keys(uiFrame).length===0) return null
	if(uiFrame.hasOwnProperty(CONST.UI_FRAME_SUBDOCUMENT_STYLE)){
		return uiFrame[CONST.UI_FRAME_SUBDOCUMENT_STYLE]
	}
	return null
}


/**
 * 
 * @param {*} uiFrame - custom ui Frame to alter look and feel
 * @returns check's if custom uiFrame has select_style defined
 */
export function extractUIFrameSelectTemplate (uiFrame) {
	if(!uiFrame) return null
	if(Object.keys(uiFrame).length===0) return null
	if(uiFrame.hasOwnProperty(CONST.UI_FRAME_SELECT_STYLE)){
		return uiFrame[CONST.UI_FRAME_SELECT_STYLE]
	}
	return null
}

/**
 * 
 * @param {*} generatedUILayout default property UI
 * @param {*} ui "classNames" key in uiFrames
 * @returns adds custom classNames from uiFrame to a property 
 */
export function addCustomClassNames(generatedUILayout, ui) {
	if(generatedUILayout.hasOwnProperty(CONST.CLASSNAME)) {
		return generatedUILayout[CONST.CLASSNAME] + " " + ui[CONST.CLASSNAME]
	}
	return ui[CONST.CLASSNAME]
}

/**
 * 
 * @param {*} ui "placeholder" key in uiFrames
 * @returns adds custom placeholder from uiFrame to a property 
 */
export function addPlaceholder(ui) {
	return ui[CONST.PLACEHOLDER]
}

/**
 * 
 * @param {*} ui "title" key in uiFrames
 * @returns adds custom title from uiFrame to a property 
 */
export function addTitle(ui) { 
	if(typeof ui[CONST.TITLE] === CONST.STRING_TYPE) {
		return ui[CONST.TITLE]
	}
	return <>{ui[CONST.TITLE]}</>
}

/**
 * 
 * @param {*} ui "description" key in uiFrames
 * @returns adds custom description from uiFrame to a property 
 */
 export function addDescription(ui) { 
	if(typeof ui[CONST.DESCRIPTION] === CONST.DESCRIPTION) {
		return ui[CONST.DESCRIPTION]
	}
	return <>{ui[CONST.DESCRIPTION]}</>
}


/**
 * 
 * @param {*} ui "description" key in uiFrames
 * @returns displays custom widget 
 */
export function displayWidget(ui) {
	return ui[CONST.WIDGET] 
}



/** ------ other util functions ------ */

/**
 * 
 * @param {*} item - property
 * @param {*} formData - filled data to display in form
 * @returns - returns filled data
 */
export function getDefaultValue(item, formData) {
	if(!formData) return false
	if(Object.keys(formData).length === 0) return false
	if(formData.hasOwnProperty(item)) return formData[item]
	return false
}

 
/**
 * 
 * @param {*} formData filled data to display in form
 * @param {*} item property
 * @returns function checks if formData has a filled value for item 
 * used in View mode so as to hide widget from Ui incase data is empty
 */
export function isFilled (item, formData){
	if(!formData) return false
	//if(Array.isArray(formData)) return true 
	if(formData.hasOwnProperty(item) && Array.isArray(formData[item]) && formData[item].length) return true
	if(formData.hasOwnProperty(item) && formData[item]) return true
	if(formData.hasOwnProperty(item) && formData[item] === 0) return true
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
	if(frame.hasOwnProperty(item) && frame[item].hasOwnProperty(CONST.DOCUMENTATION)) {
		let docArr=[]
		if(language) {
			frame[item][CONST.DOCUMENTATION].map(doc => {
				let obj={}
				for(var things in doc) {
					obj[things]=doc[things]
				}
				obj[CONST.SELECTED_LANGUAGE]=language
				docArr.push(obj)
			})
			documentation=docArr
		} 
		else documentation = frame[item][CONST.DOCUMENTATION]
	}
	return documentation
}

/**
 * 
 * @param {*} documentation - documentation object which contains labels and comments
 * @param {*} item - property 
 * @returns - returns label in which item is to be displayed in UI 
 */
 export function getLabelFromDocumentation (item, documentation) { 
	if(!documentation) return item
	if(!Array.isArray(documentation)) return item
	let label=item 
	documentation.map(doc => {
		if (doc.hasOwnProperty(CONST.SELECTED_LANGUAGE)) { // search documentation to display selected language from UI 
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
 * @param {*} item - property
 * @param {*} description - description text for sub document
 * @returns a help text for sub documents 
 */
export function getSubDocumentDescription(item, description) {
	let descr=[]
	if(description) descr.push(<small className="text-muted">{description}</small>)
	else descr.push(
		<small className="text-muted">
			{`${item} is a sub document. If you wish to fill a property of ${item} make sure all mandatory fields are entered.`}
		</small>
	)
	return descr
}

/**  check if field is a key */
/**
 * 
 * @param {*} property - property 
 * @param {*} key - key field 
 * @returns  checks if property is a key of a document
 */
export function checkIfKey(property, key) {
    if(!key) return
	if(!key["@fields"]) return
	var isKey=false
	key["@fields"].map(item => {
		if(item === property) {
			isKey=true
		}
	})
	return isKey
}

/**
 * 
 * @param {*} isKey true if property is lexical key
 * @param {*} label name of the property 
 * @returns a key symbol along with property label in UI - to tell user that this is a lexical field
 */
export function displayIfKeyField(isKey, label) {
	if(isKey) {
		return <span key={label}  
			className="mt-1"
			id="tdb__property__key__icon"
			title={`${label} is a key field. Once created, you will not be able to update this field.`}>
			<FcKey className="mr-2 mb-2"/>
		</span>
	}
	return <div/>
}

 /**
  * 
  * @param {*} frame - document frame
  * @returns true if document has ValueHash type key
  */
 export function isValueHashDocument(frame) {
	if(!frame) return null
	if(frame["@key"] && frame["@key"]["@type"] &&
		frame["@key"]["@type"] ===  CONST.VALUE_HASH_KEY) {
			return true
	}
	return false
}
 
/**
 * 
 * @returns a help message on why value hah field cant be edited
 */
export function getValueHashMessage () {
	return <p className="text-warning">
		<BiErrorCircle className="mr-2"/>
		Edit is disabled for a document with Value Hash key.
		A Value Hash object will change its id and is generated from its properties. Best way would be to
		delete this document and create a new one.
	</p>
}

/**
 * 
 * @param {*} item - property 
 * @param {*} uiDisable - uiDisable will disable edit on a key field
 * @param {*} documentation - documentation
 * @returns title based on if Key field or not
 */
export function getTitle(item, uiDisable, documentation) { 
	let label=getLabelFromDocumentation(item, documentation)
	//let label=getPropertyLabelFromDocumentation(item, documentation)
	if(uiDisable) return <span key={label}  
		title={`${label} is a key field. Once created, you will not be able to update this field.`}>
			<FcKey className="mr-2"/>{label}
		</span>
    else return <span key={label} >{label}</span>
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
            newUI[uiItems]=item//getSubDocumentLabel(item, documentation, false)
        }
        else newUI[uiItems]=uiFrame[uiItems]
    }
    return newUI
}

/**
 * 
 * @param {*} frame frame of interest
 * @param {*} item property of interest
 * @returns metadata render widget type
 */
export function checkForMetaData (frame, item) {
    if(frame.hasOwnProperty(CONST.METADATA) && 
        frame[CONST.METADATA].hasOwnProperty(CONST.RENDER_AS) && 
        frame[CONST.METADATA][CONST.RENDER_AS].hasOwnProperty(item) &&
        frame[CONST.METADATA][CONST.RENDER_AS][item]) {
            return frame[CONST.METADATA][CONST.RENDER_AS][item]
    }
    return false
}

/**
 * 
 * @param {*} frame frame of interest
 * @param {*} item property of interest
 * @returns document class linked to a property
 */
export function getLinkedDocumentClassName (frame, item) {
	return frame[item].hasOwnProperty("@class") ? frame[item]["@class"] : null
}

/**
 * 
 * @param {*} data - filled data of a string field
 * @returns row height to display in textareas for xsd:string datat type field 
 */
export function getRowHeight(data) {
	if(Array.isArray(data)) return 1
    return data.split(/\r\n|\r|\n/).length
}

/**
 * extracts choice type from ID - example extracts type 'Dance' from id, "Dance/312323"
 */
export function extractChoiceTypeFromID (filledData) {
	if (!filledData) return filledData
	let filled=filledData
	if (typeof filledData === CONST.OBJECT_TYPE) {
		return filledData["@type"]
	}
	let choiceType=filled.split("/")
	return choiceType[0]
}

/** --- Geo util functions --- */

// setBounds converts geo json bound to bounds format supported in leaflet 
export function setBounds(formData) {
	if(!formData.hasOwnProperty(CONST.B_BOX)) return []
	if(formData[CONST.B_BOX].length<4) return []
	//[west, south, east, north]
	let westSouth=[formData[CONST.B_BOX][0], formData[CONST.B_BOX][1]]
	let eastNorth=[formData[CONST.B_BOX][2], formData[CONST.B_BOX][3]]
	let bounds=[westSouth, eastNorth]
	return bounds
}



