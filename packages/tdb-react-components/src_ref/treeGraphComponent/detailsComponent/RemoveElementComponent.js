import React from 'react';

export const RemoveElementComponent = (props) =>{

  const tooltip=props.hasConstraints ? "This node cannot be removed" : `Remove the current ${props.elementType}`;

  const removeElement=()=>{
      if(props.removeElement){
          props.removeElement(props.elementId,props.elementType)
          ;
      }
  }

  const onClick= props.hasConstraints === true ? {disabled:true} : {onClick:removeElement} 
		
  return(
         <div className="tdb__panel__row">                                      
            <button {...onClick} className='tdb__button__base tdb__panel__button tdb__panel__button--red fas fa-trash-alt' title={props.tooltip}>{props.children}</button>                     
         </div>
	)    
} 