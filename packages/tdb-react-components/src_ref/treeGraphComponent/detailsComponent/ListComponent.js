import React from 'react';

export const ListComponent = (props) =>  {

	const removeItem=(evt)=>{
		props.removeItem(evt.target.name);
	}

	const dataProvider= props.dataProvider || [];

	return(<>
		{dataProvider.map((element,index)=>{
			const elementItem = typeof element === 'string' ? {label:element, name:element} : element

		  	return(<div key={'__elementItem__'+index}>		  			
		  			  <div className="tdb__list__item">
		  			  		<label className="tdb__list__label">{elementItem.label}</label>
		  			  		{props.removeItem && <button className="tdb__button__base tdb__panel__button tdb__panel__button--orange fa fa-minus"  name={elementItem.name || elementItem.id} onClick={removeItem}></button>}
		  			  </div>			  		
		  		  </div>)
		})}
		</>
	)	
}