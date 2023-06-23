import React from 'react';
import Button from "react-bootstrap/Button"
import { RiDeleteBin5Fill } from "react-icons/ri"
  
export const RemoveElementComponent = (props) =>{

  const tooltip=props.hasConstraints ? "This node cannot be removed" : `Remove the current ${props.elementType}`;

  const removeElement=()=>{
      if(props.removeElement){
          props.removeElement(props.elementId,props.elementType)
          ;
      }
  }

  const onClick= props.hasConstraints === true ? {disabled:true} : {onClick:removeElement} 

  if(props.displayAsIcon) {
    return <div className="tdb__panel__row">                                      
        <button {...onClick} className='tdb__button__base tdb__panel__button tdb__panel__button--red fas fa-trash-alt' title={props.tooltip}>{props.children}</button>                     
    </div>
  }

  let label = "Document"

  if(props.elementType === "Object") label="SubDocument"
  if(props.elementType === "ChoiceClass") label="Enum"


  return <Button className='bg-secondary text-danger border-0 btn-sm'
    onClick={onClick}
    title={`Delete ${ label}`}>
      <RiDeleteBin5Fill size={16} />

    </Button>
  
} 