import React,{useState,useEffect}from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'; 
import {HelpComponent} from './HelpComponent';
import { FormGroupComponent } from "./FormGroupComponent"

const customStyles = {
	control: (styles) => ({ ...styles, backgroundColor: "transparent", width: "100%", border: "1px solid #666" }),
	menu: (styles) => ({ ...styles, backgroundColor: '#444'}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: "transparent",
		color: state.isSelected ? '#00C08B' : "#f8f8f8", 
	})
}
 
export const BaseMultiSelectReactElement=(props)=>{
	
	const onChange=(selectedValue, actionType)=>{
		// on click of delete
		if(actionType.action === "remove-value") {
			props.onChange(actionType.removedValue.name, actionType.action);
		}
		else if(actionType.action === "select-option") // on adding new option
		props.onChange(actionType.option.name, actionType.action);
	}

	const dataProvider=props.dataProvider || [];	
	const isClearable=props.isClearable===false ? false : true
	const isDisabled=props.isDisabled ? true : false;

	return  <div className="w-100">
		<Select
			defaultValue={props.selectedValues}
			isMulti
			isClearable={isClearable} 
			onChange={onChange} 
			options={dataProvider}
			placeholder={props.placeholder}
			isDisabled={isDisabled}
			styles={customStyles}
		/>
	</div>

}


BaseMultiSelectReactElement.propTypes = {
	  defaultValue :PropTypes.object,
	  groupClassName:PropTypes.string,
	  inputClassName:PropTypes.string,
	  name:PropTypes.string.isRequired,
	  optionChange:PropTypes.func.isRequired,
	  dataProvider:PropTypes.array,
	  placeholder:PropTypes.string
  }

	BaseMultiSelectReactElement.defaultProps = {
      groupClassName:'tdb__form__group',
      labelClassName:'tdb__form__label',
      title:'',
      placeholder:'Select Document',
      dataProvider:[]
}
