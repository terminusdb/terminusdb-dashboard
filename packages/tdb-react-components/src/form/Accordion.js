import React,{useState} from 'react';
import PropTypes from "prop-types";
import {FaCaretUp, FaCaretDown} from "react-icons/fa";

export const Accordion = (props) => {
  	   
    const [showBody,setShowBody] = useState(props.showBody || false);

    const openBody = ()=>{setShowBody(!showBody)};

    const itemClassName=`tdb__accordion ${props.className} w-100`;
      
    const arrowClassName=`tdb__accordion__arrow ${props.arrowClassName}`;
     		
    const bodyClassName=!showBody || props.isDisabled===true ? "tdb__accordion__body tdb__accordion__body--hidden" : "tdb__accordion__body"

    const openIconClass=showBody ? <FaCaretUp className={arrowClassName}/> : <FaCaretDown className={arrowClassName}/>

    const titleClassName=`tdb__accordion__head ${props.titleClassName}`;
    const tooltip = props.tooltip ? {title:props.tooltip} :{}

    let onClick=props.isDisabled===true ? {style:{color:'#e0e0e0'}}: {onClick:openBody}      


		return (
	     <div className={itemClassName}>
            <div className={titleClassName} {...onClick} {...tooltip}>
               <div className="tdb__accordion__title">
                    {/*props.leftIconClassName && 
                      <i className={`tdb__accordion__icon ${props.leftIconClassName}`}></i>*/}
                    <div>{props.title}</div> 
                </div>
                {openIconClass}            
            </div>
            <div className={bodyClassName}>
               {props.children}
            </div>
        </div>
		)
}

// <span className={openIconClass} role="presentation"></span> 
Accordion.propTypes = {
    className:PropTypes.string,
    arrowClassName:PropTypes.string,
    titleClassName:PropTypes.string,
    title:PropTypes.string,
    leftIconClassName:PropTypes.string
}

Accordion.defaultProps = {
    title:'----',
    className:'',
    arrowClassName:'',
    titleClassName:'',
    leftIconClassName:''
};