import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types'; 
import {HelpComponent} from './HelpComponent' 
import { FormGroupComponent } from "./FormGroupComponent"

export const BaseSelectComponent = (props) => {

	const [value,setValue]=useState(props.defaultValue)

	useEffect(() => {
      if(value!==props.defaultValue){
        setValue(props.defaultValue)
      }
       
    },[props.defaultValue])

	const getDisabledOptions=(allowedValue,value)=>{
		if(!allowedValue || allowedValue==="ALL" || value==="")return {}
		if(allowedValue==="NONE") return {disabled:true};
		if(allowedValue && allowedValue===value)return {}
		return {disabled:true};
	}

	const getOptions=(dataProvider,comboId,defaultValue,allowedValue)=>{
		return dataProvider.map((comboData,index) =>{
			 const value=(typeof comboData ==='object') ? comboData.value : comboData //|| index;
			 const label=(typeof comboData ==='object') ? comboData.label : comboData //|| index;
			// const selected=defaultValue === value ? {'selected':true} : {} ;
			 const disabled=getDisabledOptions(allowedValue,value);
			// const 
       		 return( <option className={props.selectClassName} {...disabled} value={value} key={value +'__' + comboId + '__'+index}>{label}</option>)
      	})
	}

	const onChange=(evt)=>{
		const value=evt.currentTarget.value;
		setValue(value)
		props.optionChange(props.name,value);
	}

	const dataProvider=props.dataProvider || [];
	const comboId=props.name;
	const options=getOptions(dataProvider,comboId,props.defaultValue,props.allowedValue);
	
	const title=props.title || ''
	const isDisabled=props.isDisabled ? {disabled:true} : {}


	if(props.view === `UI_VIEW`) { 
		return <FormGroupComponent groupClassName={props.groupClassName}
			labelComponent = {<label className={`${props.labelClassName} mr-3`} htmlFor={comboId}>{title}</label>}
			helpComponent = {props.addHelpComponent ? <HelpComponent text={props.help}/> : <div/>}
			errorComponent = {<div className="hideEmpty">{props.selErrorReporting}</div>}
			fieldComponent = {<select value={value} {...isDisabled} name={comboId} className={props.selectClassName} onChange={onChange}>
				{options}
			</select>}/>
	}


	return(
		<div className={props.groupClassName}>
			<div className="tdb__form__help">
            	<label className={`${props.labelClassName} mr-3`} htmlFor={comboId}>{title}</label>
	        	{props.addHelpComponent && <HelpComponent text={props.help}/> }
	        </div>
	        <div className="hideEmpty">
	        {props.selErrorReporting}
	        </div>
	        <select value={value} {...isDisabled} name={comboId} className={props.selectClassName} onChange={onChange}>
			  {options}
			</select>
        </div>
	)
}


BaseSelectComponent.propTypes = {
    defaultValue :PropTypes.string,
    groupClassName:PropTypes.string,
    selectClassName:PropTypes.string,
    labelClassName:PropTypes.string,
    name:PropTypes.string.isRequired,
    optionChange:PropTypes.func.isRequired,
    title:PropTypes.string,
    showLabel:PropTypes.bool,
    selErrorReporting:PropTypes.string,
    addHelpComponent:PropTypes.bool,
    dataProvider:PropTypes.array
}


BaseSelectComponent.defaultProps = {
   defaultValue :'',
   groupClassName:"form-group",//'tdb__form__group',
   selectClassName:"form-control",//'tdb__form__element',
   labelClassName:'tdb__form__label',
   title:'',
   showLabel:true,
   addHelpComponent:true,
   selErrorReporting:'',
   dataProvider:[]
}