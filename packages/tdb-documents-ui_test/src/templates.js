import React from "react"
import * as CONST from "./constants"

/** --- Frame Viewer templates --- */

const DisplayLabel = ({schema, id, label}) => {

	if(!schema.hasOwnProperty(CONST.INFO)) return <div/>
	if(schema[CONST.INFO] === undefined) return <div/>
	if(schema.info === CONST.CHOICESUBCLASSES) return <div/>
	if(schema.info === CONST.SUBDOCUMENT_TYPE) return <div/>
	if(schema.info === CONST.LIST) return <div/>
	if(schema.info === CONST.SET) return <div/>

	return <label className={`control-label`} htmlFor={id}>{label}</label>
}

/**
 * DisplayFieldTemplate is called only in VIEW mode, to hide fields if they are not populated.
 * @param {*} props - props from rjsf form
 * @returns custom field templates
 */
 export function DisplayFieldTemplate(props) {
	const {id, classNames, label, help, required, description, errors, children, formData, schema} = props;
	
	console.log("props", id, props)
	// return empty div when no data available
	if(!formData) return <div className="empty__field"/>
	
	return (
	  <div className={classNames}>
		<DisplayLabel schema={schema} id={id} label={label}/>
		{description}
		{children}
		{errors}
		{help}
	  </div> 
	)
}

/** 
* 
* @param {*} documentation - extracted documentation from frames
* @returns displays document's comment
*/
export const DisplayDocumentation = ({documentation}) => {
 if(documentation && documentation.hasOwnProperty(CONST.COMMENT)) {
   return <p className="text-muted fw-bold ml-3 text-left">{documentation[CONST.COMMENT]}</p>
 }
 return <div/>
}