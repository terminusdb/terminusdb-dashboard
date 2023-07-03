import React,{useState,useEffect}from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'; 
import {HelpComponent} from './HelpComponent';
import { FormGroupComponent } from "./FormGroupComponent"

export const BaseSelectReactElement=(props)=>{
	
	const [selectedOption, setSelectedOption]=useState(props.defaultValue)

    const onChange=(selectedValue)=>{
    	if(!selectedOption || (selectedValue && selectedOption.value!==selectedValue.value)){
    		if(props.resetSelection){
    			setSelectedOption(null);
    		}else{
    			setSelectedOption(selectedValue);
    		}
    				
    		props.optionChange(props.name,selectedValue.value);
    	}
    }

    useEffect(() => {
    	const defVal=props.defaultValue
      if(selectedOption && defVal.value!==selectedOption.value){
        setSelectedOption(props.defaultValue)
      }
       
    },[props.defaultValue])

	const dataProvider=props.dataProvider || [];	
	const isClearable=props.isClearable===false ? false : true
	const isDisabled=props.isDisabled ? true : false;
//
  const value = selectedOption!==null ? {value:selectedOption} : {}
  const itemError = selectedOption===null ? props.itemError : ''

  const customStyles = {
		control: (styles) => ({ ...styles, backgroundColor: "transparent", width: "100%", border: "1px solid #666" }),
		menu: (styles) => ({ ...styles, backgroundColor: '#444'}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: "transparent",
			color: state.isSelected ? '#00C08B' : "#f8f8f8", //'#495057'
		// padding: 20,
		})
	}

	if(props.view === `UI_VIEW`) {
		return  <FormGroupComponent groupClassName={props.groupClassName}
			labelComponent = {<label className={`${props.labelClassName} mr-3`} >{props.title}</label>}
			helpComponent = {<HelpComponent text={props.help}/>}
			errorComponent = {<span className="tdb__form__error">{itemError}</span>}
			fieldComponent = {
				<div className="w-100">
					<Select styles={customStyles}
						value={selectedOption}
						isClearable={isClearable} 
						onChange={onChange} 
						options={dataProvider}  
						placeholder={props.placeholder}
						isDisabled={isDisabled}/>
				</div>}
			/>

	}

	return(
		 <div className={props.groupClassName}>
        <div className="tdb__form__help">
          <label className={props.labelClassName} >{props.title}</label>
          <HelpComponent text={props.help}/>
        </div>
		  	<Select styles={customStyles}
          value={selectedOption}
			  	isClearable={isClearable} 
			  	onChange={onChange} 
			  	options={dataProvider}  
			  	placeholder={props.placeholder}
			  	isDisabled={isDisabled}/>
          <span className="tdb__form__error">{itemError}</span>
		 </div>

	)
}


 BaseSelectReactElement.propTypes = {
	  defaultValue :PropTypes.object,
	  groupClassName:PropTypes.string,
	  inputClassName:PropTypes.string,
	  name:PropTypes.string.isRequired,
	  optionChange:PropTypes.func.isRequired,
	  dataProvider:PropTypes.array,
	  placeholder:PropTypes.string
  }

 BaseSelectReactElement.defaultProps = {
      groupClassName:'tdb__form__group',
      labelClassName:'tdb__form__label',
      title:'',
      placeholder:'Select an Item',
      dataProvider:[]
}
