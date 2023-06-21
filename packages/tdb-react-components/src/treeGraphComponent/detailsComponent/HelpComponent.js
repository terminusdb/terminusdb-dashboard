import React from 'react';
import ReactTooltip from 'react-tooltip';
import { BsInfoCircle } from "react-icons/bs";

export const HelpComponent = (props) =>{

	const helpText=props.text || 'tooltip test';
    
	return(
	  <div className="icon-help">
	  	<BsInfoCircle className="text-muted" data-tip data-for={props.text} ></BsInfoCircle>
	  	<ReactTooltip textColor="#24292e" id={props.text} type="warning" effect="solid" html={true}>
	  	   {helpText}
	  	</ReactTooltip>
	  </div>
	)
}