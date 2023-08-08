import React from 'react';
import { FcKey } from "react-icons/fc"
import { RiDeleteBin5Fill } from "react-icons/ri"
import Button from 'react-bootstrap/Button';

export const ListComponent = (props) =>  {

	const removeItem=(evt)=>{ 
		props.removeItem(evt.target.name);
	}

	const dataProvider= props.dataProvider || [];

	return(<>
		{dataProvider.map((element,index)=>{
			const elementItem = typeof element === 'string' ? {label:element, name:element} : element
				let label = elementItem.name || elementItem.id

		  	return(<div key={'__elementItem__'+index}>		  			
					<div className="tdb__list__item">
							{props.isKey && <FcKey className='mt-1'/>}
							<label className="tdb__list__label">{elementItem.label}</label>
							{props.removeItem && 
								<Button className='bg-transparent text-danger border-dark btn-sm'
									onClick={removeItem}
									title={`Delete ${ label}`}>
									<RiDeleteBin5Fill size={16} />
								</Button>
							}
					</div>			  		
				</div>) 
		})}
		</>
	)	

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