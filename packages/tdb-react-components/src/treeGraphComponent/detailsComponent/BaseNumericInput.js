import React,{useState} from 'react';
import PropTypes from 'prop-types'; 
import NumericInput from 'react-numeric-input';

export const BaseNumericInput = (props)=> {
	
	const [value,setValue] = useState(props.defaultValue)

	const onBlur=(evt)=>{
		if(evt.target.value && evt.target.value!==value){
			value=evt.target.value;
			if(typeof this.props.onBlur ==='function')props.onBlur(evt.target.value);			
		}
	}

	const onChange=(size)=>{
		setValue(size)
		if(typeof props.onChange ==='function')props.onChange(props.id,size);
	}

	const title=props.title  || '';
	const format=props.format ? {format:props.format} : {}

	return(
		 <div className="itemViewDetail">
			<label className="itemSmallLabel">{title}</label>
			<div className="itemViewValue">
			    <NumericInput {...format} onBlur={onBlur} min={props.min || 0} max={props.max || 0} step={props.step} value={value} 
			    onChange={onChange}/>
			</div>
    	</div>

	)

}
//pattern="[0-9]{4}" required
BaseNumericInput.propTypes = {
	  title:PropTypes.string,
	  defaultValue :PropTypes.string,
	  groupClassName:PropTypes.string,
	  inputClassName:PropTypes.string,
	  id:PropTypes.string.isRequired,
	  parentClassId:PropTypes.string.isRequired,
	  parentClassType:PropTypes.string.isRequired,
	  onBlur:PropTypes.func
}
