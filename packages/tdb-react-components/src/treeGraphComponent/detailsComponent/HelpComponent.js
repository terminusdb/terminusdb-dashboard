import React from 'react';
import ReactTooltip from 'react-tooltip';
import { FiHelpCircle } from "react-icons/fi" 

export const HelpComponent = (props) =>{

	if(!props.text) return <React.Fragment/>

	const helpText=props.text;
    
	return(
	  <div className="icon-help">
	  	<FiHelpCircle className="text-muted" data-tip data-for={props.text} size={20}></FiHelpCircle>
	  	<ReactTooltip textColor="#24292e" id={props.text} type="light" effect="solid" html={true}>
	  	   {helpText}
	  	</ReactTooltip>
	  </div>
	)
}