import React from 'react';
import ReactTooltip from 'react-tooltip';
import { FaInfoCircle } from "react-icons/fa";

export const HelpComponent = (props) =>{

	const helpText=props.text || 'tooltip test';
    
	return(
	  <div className="icon-help">
	  	<FaInfoCircle data-tip data-for={props.text} ></FaInfoCircle>
	  	<ReactTooltip textColor="#24292e" id={props.text} type="warning" effect="solid" html={true}>
	  	   {helpText}
	  	</ReactTooltip>
	  </div>
	)
}