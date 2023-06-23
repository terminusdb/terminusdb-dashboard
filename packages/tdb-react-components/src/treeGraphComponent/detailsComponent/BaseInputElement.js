import React, {useState,useEffect,useRef} from 'react';
import PropTypes from 'prop-types'; 
import {HelpComponent} from './HelpComponent';
import { FormGroupComponent } from "./FormGroupComponent"

export const BaseInputElement = (props) => {

	const [value,setInputValue] = useState('')
	//const [autoFocus,setAutoFocus] = useState({})
	const inputElement = useRef(null);
 
	useEffect(() => {
        if(props.defaultValue!==value){
        	setInputValue(props.defaultValue)
        }
       
    },[props.defaultValue])

    useEffect(()=>{
       if(inputElement.current && props.defaultValue==="" && props.autoFocus===true && props.disabled!==true){
        	inputElement.current.focus();
        }
    },[inputElement.current,props.panelName])
	
	const onBlur = (evt)=>{
		let valueChecked=true
		if(typeof props.checkValue ==='function' ){
			valueChecked=props.checkValue(props.name,value)
		}
		if(typeof props.onBlur ==='function' && valueChecked)props.onBlur(props.name,value);
	}

	const onChange = (evt) =>{
		setInputValue(evt.currentTarget.value)
	}

	const disabled = props.disabled === true ? {disabled:true} : {}
	//const autoFocus= props.disabled!==true && props.autoFocus === true ? {autoFocus:true} :{}

	
	if(props.view === `UI_VIEW`) {
		return  <FormGroupComponent groupClassName={props.groupClassName}
			labelComponent = {props.name ? <label className={`${props.labelClassName} mr-3`} htmlFor={props.name}>{props.title}</label> : <></>}
			helpComponent = {<HelpComponent text={props.help}/>}
			errorComponent = {<span className="tdb__form__error">{props.itemError}</span>}
			fieldComponent = {
				<input ref={inputElement}
				placeholder={props.placeholder} 
				onBlur={onBlur} 
				{...disabled} onChange={onChange} 
				value={value} name={props.name} id={props.name}
				className={props.inputClassName}></input>}
			/>

	}

	return <div className={props.groupClassName}>
		<div className="tdb__form__help">
			<label className={props.labelClassName} htmlFor={props.name}>{props.title}</label>
			<HelpComponent text={props.help}/>
		</div>
		<input ref={inputElement}
			placeholder={props.placeholder} 
			onBlur={onBlur} 
			{...disabled} onChange={onChange} 
			value={value} name={props.name} id={props.name}
			className={props.inputClassName}></input>       
		<span className="tdb__form__error">{props.itemError}</span>
	</div>

}
//pattern="[0-9]{4}" required
BaseInputElement.propTypes = {
	  title:PropTypes.string,
	  defaultValue :PropTypes.string,
	  groupClassName:PropTypes.string,
	  inputClassName:PropTypes.string,
	  labelClassName:PropTypes.string,
	  name:PropTypes.string.isRequired,
	  onBlur:PropTypes.func,
	  disabled:PropTypes.bool,
	  placeholder:PropTypes.string
}

BaseInputElement.defaultProps = {
	  title:'',
	  defaultValue: '',
	  groupClassName:'form-group mb-3',//'tdb__form__group',
	  inputClassName:'form-control',//'tdb__form__element',
	  labelClassName:'tdb__form__label',
	  disabled:false,
	  placeholder:''
}
