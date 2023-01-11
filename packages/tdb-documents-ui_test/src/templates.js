import React from "react"
import * as CONST from "./constants"

/** --- Frame Viewer templates --- */

const DisplayLabel = ({schema, id, label, formData}) => {

	if(schema.hasOwnProperty(CONST.INFO) && 
		schema[CONST.INFO] === CONST.DATA_TYPE) { 
			if(schema.hasOwnProperty(CONST.FORMAT) && 
				schema[CONST.FORMAT]=== CONST.URI) return <div/> 
			return <label className={`control-label display__label__template`} htmlFor={id}>{label}</label>
		}

	if(schema.hasOwnProperty(CONST.INFO) && 
		schema[CONST.INFO] === CONST.ENUM) { 
			return <label className={`control-label display__label__template`} htmlFor={id}>{label}</label>
	}

	if(schema.hasOwnProperty(CONST.INFO) && 
		schema[CONST.INFO] === CONST.DOCUMENT) {
			return <div/>
	}

	return <div/>
}

/**
 * DisplayFieldTemplate is called only in VIEW mode, to hide fields if they are not populated.
 * @param {*} props - props from rjsf form
 * @returns custom field templates
 */
 export function DisplayFieldTemplate(props) {
	const {id, classNames, label, help, required, description, errors, children, formData, schema, uiSchema} = props;
	
	//console.log("props", id, props)
	// return empty div when no data available
	if(!formData && !uiSchema.hasOwnProperty("ui:field")) {
		// check for ui field -  we use custom fields some times to represent null fields
		if(schema.info === CONST.DATA_TYPE && schema.type === CONST.BOOLEAN_TYPE) {
			// display a different widget for bool type 
			// the reason we display it separately is that boolean type when false is not showed in UI 
			// so we force it in ui instead
			let css = uiSchema && uiSchema.hasOwnProperty(CONST.CLASSNAME) ? uiSchema[CONST.CLASSNAME] : `tdb__input mb-3 mt-3 tdb__view`
			return <div className={`form-group field field-boolean ${css}`}>
				<label className="control-label" for="root_transparent">
					<div className="d-flex h6">transparent<div>
				</div></div>
				</label>
				<div className="checkbox disabled">
					<label>
						<input type="checkbox" id="root_transparent" disabled="" checked=""/>
						<span>transparent</span>
					</label>
				</div>
			</div>
		}
		return <div className="empty__field"/>
	}
	
	return (
	  <div className={classNames}>
		<DisplayLabel schema={schema} id={id} label={label} formData={formData}/>
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