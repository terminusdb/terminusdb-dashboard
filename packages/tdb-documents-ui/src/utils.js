import * as CONST from "./constants" 


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
	return false
}


/**
 * 
 * @param {*} frame - sub frame of properties
 * @param {*} property - property 
 * @returns true if property is Mandaroty 
 */
 export const isOptional = (frame, property) => { 
	let field=frame[property]
	console.log("field", field)
	if(typeof field !== CONST.OBJECT_TYPE) return false 
	if(field.hasOwnProperty(CONST.TYPE) && 
		field[CONST.TYPE] === CONST.OPTIONAL) return true
	return false
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