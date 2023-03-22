import * as CONST from "./constants" 
import * as TYPE from "./dataType.constants"
import { getLabelFromEnumDocumentation } from "./documentationTemplates"

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
	if(field.hasOwnProperty(CONST.TYPE)) {
		if(field[CONST.TYPE] === CONST.OPTIONAL) return false
		if(field[CONST.TYPE] === CONST.SET) return false
		if(field[CONST.TYPE] === CONST.LIST) return false
		if(field[CONST.TYPE] === CONST.ARRAY) {
			// return true if geo json else false
			return isInherritedFromGeoJSONTypes(frame)
		}
	}
	return true
}


/**
 * 
 * @param {*} frame - sub frame of properties
 * @param {*} property - property 
 * @returns true if property is Mandaroty 
 */
 export const isOptional = (frame, property) => { 
	let field=frame[property]
	if(typeof field !== CONST.OBJECT_TYPE) return false 
	if(field.hasOwnProperty(CONST.TYPE) && 
		field[CONST.TYPE] === CONST.OPTIONAL) return true
	return false
}

/**
 * 
 * @param {*} frame - sub frame of properties
 * @param {*} property - property 
 * @returns true if property is SET/ LIST/ ARRAY 
 */
export const isArrayType = (frame, property) => { 
	let field=frame[property]
	if(typeof field !== CONST.OBJECT_TYPE) return false 
	if(field.hasOwnProperty(CONST.TYPE)) {
		// return true for SETs/ LIST
		if(field[CONST.TYPE] === CONST.SET || field[CONST.TYPE] === CONST.LIST ) return true
		if(field[CONST.TYPE] === CONST.ARRAY) {
			// check if frame is inherrited from Geo JSON constants 
			if(frame.hasOwnProperty(CONST.INHERITS)) {
				// return false if not geoJSON types
				if(isInherritedFromGeoJSONTypes(frame)) return false
				else return true
			}
			return true 
		}
	}
	return false
}



/***  ------ util functions to check type of property ------ */

// returns true for properties which are of data types xsd and xdd
const dataTypePrefix = {
	[CONST.XSD_DATA_TYPE_PREFIX]: CONST.XSD_DATA_TYPE_PREFIX,
	[CONST.XDD_DATA_TYPE_PREFIX]: CONST.XDD_DATA_TYPE_PREFIX
} 

/**
 * 
 * @param {*} field - field of a property
 * @returns true if type normal data type xsd/ xdd/ rdf
 */
export const isDataType = (field) => {
	if(!field) return false
	if(typeof field === CONST.OBJECT_TYPE) return false
	return dataTypePrefix[field.substring(0, 4)] || false
}

/**
 * 
 * @param {*} field - field of a property
 * @returns true if type is subdocument
 */
 export const isSubDocumentType = (field) => {
	if(!field) return false
	if(field.hasOwnProperty(CONST.SUBDOCUMENT)) return CONST.SUBDOCUMENT
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
 * @param {*} fullFrame - data product's entire frames
 * @returns true for properties linked to other document classes
 */
 export const isDocumentType = (field, fullFrame) => {
	if(typeof field === CONST.OBJECT_TYPE) return false
	if(!fullFrame) return false 
	let document = `${field}`
	if(fullFrame[document]) {
		// make sure document is a class and not @subdocument class
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
	if(field.substring(0, 8) === TYPE.SYS_JSON_TYPE) return true 
	return false
}

// returns true for properties which are of data types is rdf:langString
export const isRdfLangString = (field) => {
	if(typeof field === CONST.OBJECT_TYPE) return false
	if(field === CONST.RDF_LANG_STRING) return true
	return false
}


/**
 * 
 * @param {*} field - field of a property
 * @returns true if choice sub documenst
 */
 export const isChoiceSubDocumentType = (field) => {
	if(typeof field !== CONST.OBJECT_TYPE) return false
	if(Array.isArray(field) && field.length) {
		let props=field[0]
		if(props.hasOwnProperty(CONST.CLASS) && props.hasOwnProperty(CONST.SUBDOCUMENT))
			return true
		return false
	}
	return false
}

/**
 * 
 * @param {*} field - field of a property
 * @param {*} fullFrame - fullFrame of data product
 * @returns true if choice documents
 */
 export const isChoiceDocumentType = (field, fullFrame) => {
	if(typeof field !== CONST.OBJECT_TYPE) return false
	if(Array.isArray(field) && field.length) {
		// check if fields in array are document classes 
		// just check for first class
		if(fullFrame.hasOwnProperty(field[0]))
			return true
		return false
	}
	return false
}

/**
 * 
 * @param {*} frame - sub frame of properties
 * @param {*} property - property 
 * @returns type of array - if property is SET/ LIST/ ARRAY 
 */
 export const getArrayType = (frame, property) => { 
	let field=frame[property]
	if(typeof field !== CONST.OBJECT_TYPE) {
		throw new Error (`Expected Array Frames to be an object, instead received ${field}`)
	}
	if(!field.hasOwnProperty(CONST.TYPE)) {
		throw new Error (`Expected Array Frames to have @type defined, instead received ${field}`)
	}
	if(field[CONST.TYPE] === CONST.SET) return CONST.SET
	if(field[CONST.TYPE] === CONST.LIST) return CONST.LIST
	if(field[CONST.TYPE] === CONST.ARRAY) return CONST.ARRAY
}


/** choice documents/ sub documents utils */
/**
 * 
 * @param {*} documentFrame document frame
 * @param {*} property property
 * @returns extracts choices from frame to be displayed in select component 
 */
export function getChoices(documentFrame, property) {
  let options = []
  // documentFrame[property] will have choices
  documentFrame[property].map ( docs => {
		// docs[CONST.CLASS] will be defined in the case of choice sub documents 
    let documentChoice=docs.hasOwnProperty(CONST.CLASS) ? docs[CONST.CLASS] : docs
    options.push({ value: documentChoice, label: documentChoice, color: "#adb5bd" })
  })
  return options
}

/***  extract metadata */

/**
 * 
 * @param {*} frame frame of interest
 * @returns metadata json type
 */
 export function getMetaData (frame) { 
	if(frame && frame.hasOwnProperty(CONST.METADATA)) {
			return frame[CONST.METADATA]
	}
	return false
}

/***  extract documentation */
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
			if(Array.isArray(frame[item][CONST.DOCUMENTATION])) {
				// expecting an array with multi language definitions
				frame[item][CONST.DOCUMENTATION].map(doc => {
					let obj={}
					for(var things in doc) {
						obj[things]=doc[things]
					}
					obj[CONST.SELECTED_LANGUAGE]=language
					docArr.push(obj)
				})
			}
			else if (typeof frame[item][CONST.DOCUMENTATION] === CONST.OBJECT_TYPE){
				// expecting an object
				let obj={}
				for(var things in frame[item][CONST.DOCUMENTATION]) {
					obj[things]=frame[item][CONST.DOCUMENTATION][things]
				}
				obj[CONST.SELECTED_LANGUAGE]=language
					docArr.push(obj)
			}
			documentation=docArr
		} 
		else documentation = frame[item][CONST.DOCUMENTATION]
	}
	return documentation
}

/**
 * returns property's documentation from extractedDocumentation frame
 */
export function checkIfPropertyHasDocumentation (extractedDocumentation, property) {
	var label, comment
	if(!extractedDocumentation) return { label, comment }
	if(extractedDocumentation.hasOwnProperty("@properties") && 
		extractedDocumentation["@properties"].hasOwnProperty(property))  {
			// @label
			label = extractedDocumentation["@properties"][property].hasOwnProperty(CONST.LABEL) ? 
				extractedDocumentation["@properties"][property][CONST.LABEL] : null
			// @comment
			comment = extractedDocumentation["@properties"][property].hasOwnProperty(CONST.COMMENT) ?
				extractedDocumentation["@properties"][property][CONST.COMMENT] : extractedDocumentation["@properties"][property]
		}
	return { label, comment }
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

/** checks if document type reference definition is available or not */
export function availableInReference (references, documentType) {
	if(!Object.keys(references).length) return false
	if(references.hasOwnProperty(documentType)) return true
	return false
}


// gets form data per property 
// used to get config form data for subdocuments, documentlinks etc.
export function getFormDataPerProperty (subDocumentData, fieldName) {
  if(subDocumentData.hasOwnProperty(fieldName)) return subDocumentData[fieldName]
  return ""
}

// @unfoldable  - checks if a document class is unfoldable
export const isUnfoldable=(documentFrame) => {
	if(documentFrame.hasOwnProperty(CONST.UNFOLDABLE)) return true
	return false
}


/**** METADATA util functions */
export function fetchMetaData(documentFrame, property) {
	if(!documentFrame.hasOwnProperty(CONST.METADATA)) return false
	if(documentFrame[CONST.METADATA].hasOwnProperty(CONST.RENDER_AS)) {
		// render as info
		if(documentFrame[CONST.METADATA][CONST.RENDER_AS].hasOwnProperty(property)) 
			return documentFrame[CONST.METADATA][CONST.RENDER_AS][property]
		return false
	}
	return false
}

export function checkIfSubDocumentShouldBeExapnded(documentFrame, property) {
	// check for SubDocument MetaData
	let metaDataType=fetchMetaData(documentFrame, property), expanded = false
	if(metaDataType) {
		// expecting JSON at this point
		expanded=metaDataType
	}
	return expanded
}

/** ENUM DOCUMENTATION */
export const extractEnumComment = (fullFrame, enumDocumentClass, options, property) => {
	if(!fullFrame.hasOwnProperty(enumDocumentClass)) {
		throw new Error (`Expected full frames to have ${enumDocumentClass} defined ...`)
	}
	if(!fullFrame[enumDocumentClass].hasOwnProperty(CONST.DOCUMENTATION)) return false
	let language=fullFrame[CONST.SELECTED_LANGUAGE]
	// add chosen language to documentation array
  let extractedDocumentation = extractDocumentation(fullFrame, enumDocumentClass, language)
	return getLabelFromEnumDocumentation(property, extractedDocumentation, options)
}	

/** Geo JSON util functions */

// get min items to display 
export function getMinItems(documentFrame, property) {
	let dimension = documentFrame[property][CONST.DIMENSIONS]
	if(dimension === CONST.POINT_TYPE_DIMENSIONS) {
		//@dimension = 1
		if(property === CONST.B_BOX) return CONST.BBOX_MIN_ITEMS
		return CONST.POINT_MIN_ITEMS
	}
}

// setBounds converts geo json bound to bounds format supported in leaflet 
export function setBounds(data) {
	if(data.length<4) return []
	//[west, south, east, north]
	let westSouth=[data[0], data[1]]
	let eastNorth=[data[2], data[3]]
	let bounds=[westSouth, eastNorth]
	return bounds
}

// get bbox label based on index 
export function getBBoxLabel(index) {
	if(index === 0) return "left"
	else if (index === 1) return "bottom"
	else if (index === 2) return "right"
	else return "top"
}

// sets b_box from tdb to react leaflet b_box
export function checkIfBoundsAvailable(frame, formData) {
	if(frame.hasOwnProperty(CONST.B_BOX) && 
		frame[CONST.B_BOX][CONST.DIMENSIONS] === 1 && 
		formData.hasOwnProperty(CONST.B_BOX))  {
			return setBounds(formData[CONST.B_BOX])
		}
	return []
}

// checks if field is point type
export function isPointType (field) {
	if(field.hasOwnProperty(CONST.TYPE) && 
		field[CONST.TYPE] === CONST.ARRAY && 
		field.hasOwnProperty(CONST.DIMENSIONS) && 
		field[CONST.DIMENSIONS] === CONST.POINT_TYPE_DIMENSIONS) {
			return true
	}
	return false
}


// checks if field is line string type
export function isLineStringType (field) {
	if(field.hasOwnProperty(CONST.TYPE) && 
		field[CONST.TYPE] === CONST.ARRAY && 
		field.hasOwnProperty(CONST.DIMENSIONS) && 
		field[CONST.DIMENSIONS] === CONST.LINE_STRING_TYPE_DIMENSIONS) {
			return true
	}
	return false
}

// checks if field is polygon/ multipolygon type & matches with dimension 3
export function isPolygonType (field) {
	if(field.hasOwnProperty(CONST.TYPE) && 
		field[CONST.TYPE] === CONST.ARRAY && 
		field.hasOwnProperty(CONST.DIMENSIONS) && 
		field[CONST.DIMENSIONS] === CONST.POLYGON_TYPE_DIMENSIONS) {
			return true
	}
	return false
}

// checks if polygon from type 
export function isPolygon(frame) {
	if(frame.hasOwnProperty("type") && 
		frame["type"].hasOwnProperty("@values") && 
    frame["type"]["@values"][0] === CONST.POLYGON) 
			return true
	return false 
}

// checks if MultiPolygon from type 
export function isMultiPolygon(frame) {
	if(frame.hasOwnProperty("type") && 
		frame["type"].hasOwnProperty("@values") && 
    frame["type"]["@values"][0] === CONST.MULTIPOLYGON) 
			return true
	return false 
}

// checks if field is binding box type
export function isBBoxType(field, property) {
	if(property === CONST.B_BOX) {
		return isPointType (field)
	}
	return false
}


/***
 * checks if frame is inherrited from geo json types
 */
export function isInherritedFromGeoJSONTypes(frame) {
	if(!frame.hasOwnProperty(CONST.INHERITS)) return false
	return frame[CONST.INHERITS].every(item => {
		return CONST.GEOJSON_ARRAY_TYPES.includes(item);
	});
}
