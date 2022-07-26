 require("../src/css/less/terminusdb__style.less"); 
 
import React,{useEffect,useState} from 'react';
import {Tabs, Tab} from 'react-bootstrap';

export const TabTest = (props) =>{

	return(
	<Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
	  <Tab eventKey="home" title="Home">
	   <div >hello hello</div>
	  </Tab>
	  <Tab eventKey="profile" title="Profile">
	      <div >hello01 hello</div>
	  </Tab>
	  <Tab eventKey="contact" title="Contact" disabled>
	      <div >hello02 hello</div>
	  </Tab>
	</Tabs>)

}