import React from 'react';

export const NodeRel =(props)=>{

	const onClick=()=>{
		props.onClick(props.name,true)
	}

	const onClickEvent=props.onClick ? {onClick:onClick, title:`Go to ${props.label}`} : {}
	const className = props.onClick ? 'tdb__rel__element tdb__rel__element--active': 'tdb__rel__element'

	return (
		<div {...onClickEvent} className={className} >
			<p className="tdb__rel__label">{props.label}</p>
		</div>
	)
}