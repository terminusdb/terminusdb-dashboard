import React from 'react';

export const RelationshipLine = (props)=>{
	return(
		<div className="tdb__rel__linegroup">
			<div className="tdb__rel__line">
				<p className="tdb__rel__label">{props.label}</p>
			</div>
			<i className="tdb__rel__arrow fa fa-caret-right"/>
		</div>
	)
	
}