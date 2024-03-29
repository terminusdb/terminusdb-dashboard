import React from 'react';
import Button from "react-bootstrap/Button"
import { RiDeleteBin5Fill } from "react-icons/ri"
  
export const RemoveElementComponent = (props) =>{

  const tooltip=props.hasConstraints ? "This node cannot be removed" : `Remove the current ${props.elementType}`;

  const removeElement=()=>{
      if(props.removeElement){
          props.removeElement(props.elementId, props.elementType)
          ;
      }
  }

  //const onClick= props.hasConstraints === true ? {disabled:true} : {onClick: props.removeElement} 

  // do not display delete icon is property is disabled 
  // used when we display inherited properties 
  if(props.isDisabled) return <div/>

  if(props.displayAsIcon) {
    return <div className="tdb__panel__row">                                      
        <Button 
          disabled={ props.hasConstraints === true ? true : false }
          onClick={(e) => removeElement()}
          className='tdb__button__base tdb__panel__button tdb__panel__button--red fas fa-trash-alt' title={props.tooltip}>{props.children}</Button>                     
    </div>
  }

  let label = "Document"

  if(props.elementType === "Object") label="SubDocument"
  if(props.elementType === "ChoiceClass") label="Enum"


  //return <Button className='bg-secondary text-danger border-0 btn-sm float-right mt-3 fw-bold'
  return <Button className={props.className}
    onClick={(e) => removeElement()}
    disabled={ props.hasConstraints === true ? true : false }
    title={`Delete ${ label}`}>
      <RiDeleteBin5Fill size={props.size} className='text-danger h2'/>
      {/*<RiDeleteBin5Fill size={16} />*/}
      {/*`Delete ${ label}`*/}
    </Button>
  
} 