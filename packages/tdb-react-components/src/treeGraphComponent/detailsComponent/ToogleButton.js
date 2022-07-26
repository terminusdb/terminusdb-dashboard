import React from 'react';
import PropTypes from 'prop-types';

export const ToogleButton =(props)=>{

	const isSelected=props.isSelected===true ? true : false;
	
	const baseTooltip=props.baseTooltip || '';
	const selectedTooltip=props.selectedTooltip || baseTooltip;	

	const className=isSelected ? `${props.selectIcon} ${props.selectClassName}` : `${props.baseIcon} ${props.baseClassName}`;
	const tooltip=isSelected? selectedTooltip : baseTooltip;

	const onClick=()=>{
		if(props.onSelectionChange)props.onSelectionChange(!isSelected)
	}

	return(
		<button name={props.name} onClick={onClick} className={className} title={tooltip}>
			{props.children}
		</button>
	)
}

ToogleButton.propTypes = {
  baseTooltip:PropTypes.string,
  selectedTooltip:PropTypes.string,
  baseClassName:PropTypes.string,
  selectClassName:PropTypes.string,
  buttonIsSelected:PropTypes.bool,
  onSelectionChange:PropTypes.func,
  baseIcon:PropTypes.string,
  selectIcon:PropTypes.string,
};

ToogleButton.defaultProps = {
  baseClassName:'tdb__button__base tdb__panel__button',
  selectClassName:'tdb__button__base tdb__panel__button tdb__panel__button--selected',
  buttonIsSelected:false,
  baseIcon:'',
  selectIcon:''
}