import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types'; 
import {HelpComponent} from './HelpComponent';
export const BaseCheckboxElement = (props) => {

	const [value,setInputValue] = useState(props.defaultValue)

	useEffect(() => {
        if(props.defaultValue!==value){
        	setInputValue(props.defaultValue)
        }
    },[props.defaultValue])

	const onChange = (evt) =>{
		const checked = evt.currentTarget.checked
		setInputValue(checked)
		if(typeof props.onBlur ==='function')props.onBlur(props.name,checked);
	}

	const disabled= props.disabled === true ? {disabled:true} : {}

	if(props.view === `UI_VIEW`) {
		return <div className={`${props.groupClassName} d-flex`}>
			<span className="tdb__form__span mr-3">
			 	<input  type="checkbox" onChange={onChange} checked={value || false}  {...disabled} onChange={onChange} name={props.name} className={props.inputClassName}></input>            
				<label className={props.labelClassName} htmlFor={props.name}>{props.title}</label>
			</span>
			<span className="mt-1"><HelpComponent text={props.help}/></span>
			
		</div>
	}

	return(
			<div className={props.groupClassName}>
			 	<div className="tdb__form__help">
			 		 <span className="tdb__form__span">
			 		 	<input  type="checkbox" onChange={onChange} checked={value || false}  {...disabled} onChange={onChange} name={props.name} className={props.inputClassName}></input>            
	                 	<label className={props.labelClassName} htmlFor={props.name}>{props.title}</label>
	                 </span>
	                 <HelpComponent text={props.help}/>
                </div>
            </div>

	)
}

//pattern="[0-9]{4}" required
BaseCheckboxElement.propTypes = {
	  title:PropTypes.string,
	  defaultValue :PropTypes.bool,
	  groupClassName:PropTypes.string,
	  inputClassName:PropTypes.string,
	  labelClassName:PropTypes.string,
	  name:PropTypes.string.isRequired,
	  onBlur:PropTypes.func,
	  disabled:PropTypes.bool
}

BaseCheckboxElement.defaultProps = {
	  title:'',
	  defaultValue: false,
	  groupClassName:'tdb__form__group',
	  inputClassName:'tdb__form__check',
	  labelClassName:'tdb__form__label',
	  disabled:false
}
