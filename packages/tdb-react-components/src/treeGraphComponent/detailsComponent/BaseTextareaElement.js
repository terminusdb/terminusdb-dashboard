import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types'; 
import {HelpComponent} from './HelpComponent';
import { FormGroupComponent } from "./FormGroupComponent"

export const BaseTextareaElement = (props) => {

	const [value,setInputValue] = useState(props.defaultValue)

	useEffect(() => {
        if(props.defaultValue!==value){
        	setInputValue(props.defaultValue)
        }
    },[props.defaultValue])
	
	const onBlur = (evt)=>{
		if(typeof props.onBlur ==='function')props.onBlur(props.name,value);
	}

	const onChange = (evt) =>{
		setInputValue(evt.currentTarget.value)
	}

	const disabled= props.disabled === true ? {disabled:true} : {}

	if(props.view === `UI_VIEW`) {
		return  <FormGroupComponent groupClassName={props.groupClassName}
			labelComponent = {<label className={`${props.labelClassName} mr-3`} >{props.title}</label>}
			helpComponent = {<HelpComponent text={props.help}/>}
			fieldComponent = {<textarea rows="5" onBlur={onBlur} {...disabled} onChange={onChange} value={value} name={props.name} className={props.inputClassName}></textarea>       
		}
			/>
	}

	return(
			<div className={props.groupClassName}>
			 	<div className="tdb__form__help">
	                 <label className={props.labelClassName} htmlFor={props.name}>{props.title}</label>
	                 <HelpComponent text={props.help}/>
                </div>
                <textarea rows="5" onBlur={onBlur} {...disabled} onChange={onChange} value={value} name={props.name} className={props.inputClassName}></textarea>       
            </div>

	)
}
//pattern="[0-9]{4}" required
BaseTextareaElement.propTypes = {
	  title:PropTypes.string,
	  defaultValue :PropTypes.string,
	  groupClassName:PropTypes.string,
	  inputClassName:PropTypes.string,
	  labelClassName:PropTypes.string,
	  name:PropTypes.string.isRequired,
	  onBlur:PropTypes.func,
	  disabled:PropTypes.bool
}

BaseTextareaElement.defaultProps = {
	  title:'',
	  defaultValue: '',
	  groupClassName:'form-group',
	  inputClassName:"form-control",
	  labelClassName:'tdb__form__label',
	  disabled:false
}
