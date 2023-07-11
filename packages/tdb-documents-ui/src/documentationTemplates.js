import React from "react"
import { FaComment } from "react-icons/fa"
import { Button } from "react-bootstrap"
import * as CONST from "./constants"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { FiHelpCircle } from "react-icons/fi"

/** displays documentation for enum with @comment*/
export function getEnumLabelDescription(item, documentation) {
    if(!documentation) return <div className="control-label">{item}</div>
    if(!documentation.hasOwnProperty(CONST.COMMENT)) return <div className="control-label">{item}</div>
    return <DisplayPropertyNameAndComment comment={documentation[CONST.COMMENT]} label={item}/>
    //return <small className="fst-italic text-muted">{documentation[CONST.COMMENT]}</small>
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
	//if(typeof documentation === CONST.OBJECT_TYPE) return getEnumLabelDescription(item, documentation)
	if(!Array.isArray(documentation)) return enumDocumentation
	let valueArray=[]
	documentation.map(doc => { 
		if (doc.hasOwnProperty(CONST.SELECTED_LANGUAGE)) { // search documentation to display selected language from UI 
			if(doc["@language"] === doc["@selectedLanguge"]) { // language match found
				if(doc.hasOwnProperty("@label")) {
					enumDocumentation["@label"]=doc["@label"] // extract enum property label
				}
				if(doc.hasOwnProperty("@values")) {	// extract enum option labels
					/*for(var val in doc["@values"]){
						if(doc["@values"][val].hasOwnProperty("@label")) valueArray.push(doc["@values"][val]["@label"])
					}*/
					enumDocumentation["@values"]=doc["@values"]
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
 * @param {*} label - property name to be displayed
 * @param {*} comment - documentation comment which will be displayed as a description tool tip in the UI 
 * @returns 
 */
export function DisplayPropertyNameAndComment ({ comment }){
	return <React.Fragment>
		{comment && <OverlayTrigger
			key={comment}
			placement={'right'}
			overlay={
			<Tooltip id={`tooltip-right`}>
				<small className="text-light">{comment}</small>
			</Tooltip>
			}
		> 
			<Button className="btn-sm text-muted bg-transparent border-0" id="tdb__documentation__button">
				<FiHelpCircle className="h5 mb-2"/>
			</Button>
		</OverlayTrigger>}
	</React.Fragment>
}


/**
 * 
 * @param {*} label - property name to be displayed
 * @returns 
 */
 function DisplayPropertyName ({label}){
	return <React.Fragment>
		<span id="tdb__property__name__label" className="h6">{label}</span>
	</React.Fragment>
}


/**
 * 
 * @param {*} doc - documentation info extracted from documentation array
 * @param {*} item - property of interest at this point
 * @returns 
 */
function extractLabelAndComment(doc, item) {
	let label=item, comment=false
	if(doc.hasOwnProperty(CONST.PROPERTY) &&
		doc[CONST.PROPERTY].hasOwnProperty(item)) {

			// extract label
			if(doc[CONST.PROPERTY][item].hasOwnProperty(CONST.LABEL)) {
				label=doc[CONST.PROPERTY][item][CONST.LABEL]
			}
			else label=item

			// extract comment
			if(doc[CONST.PROPERTY][item].hasOwnProperty(CONST.COMMENT)){
				comment=doc[CONST.PROPERTY][item][CONST.COMMENT]
			}
	}
	return {label, comment}
}


/**
* 
* @param {*} documentation - documentation object which contains labels and comments
* @param {*} item - property 
* @returns - returns label extracted from documentation along with comment
* if no documentation provided, the name of property is returned back
*/
export function getPropertyLabelFromDocumentation (item, documentation, displayOnlyLabel) {
   if(!documentation) return <>{item}</>
   if(!Array.isArray(documentation)) return <>{item}</>
   if(!documentation.length) return <>{item}</>
   let extracted={label: item, comment: false}

   documentation.map(doc => {
	    // search documentation to display selected language in UI 
	    if (doc.hasOwnProperty(CONST.SELECTED_LANGUAGE)) {
		   if(doc[CONST.LANGUAGE] === doc[CONST.SELECTED_LANGUAGE]) {
				extracted=extractLabelAndComment(doc, item)
		    }
	    }
	    else {
			// language match found with default language en
			if(doc[CONST.LANGUAGE] === CONST.DEFAULT_LANGUAGE) { 
				extracted=extractLabelAndComment(doc, item)
			}
	    }
    })
	if(displayOnlyLabel) return <DisplayPropertyName label={extracted.label}/>
	else return <DisplayPropertyNameAndComment comment={extracted.comment} label={extracted.label}/>
}
