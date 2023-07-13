import React,{useState,useEffect,Fragment} from 'react';
import PropTypes from "prop-types";
import {BiNetworkChart} from "react-icons/bi"
import {RemoveElementComponent} from './RemoveElementComponent';
import SplitPane from "react-split-pane";
/*
* remove and use react-bootstrap
*/
import Card from "react-bootstrap/Card"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Stack from "react-bootstrap/Stack"
import Tabs from 'react-responsive-tabs';
import {BaseElement} from './BaseElement';
import 'react-responsive-tabs/styles.css';
import {ConstraintsComponent} from './ConstraintsComponent';
import {ParentsFilter} from './ParentsFilter';
import {PropertiesComponent} from './PropertiesComponent';
import {ELEMENT_ICONS} from '../../constants/details-labels';
import {ChoiceList} from './ChoiceList';
import {getLabelByName} from '../utils/elementsName'
import {GraphContextObj} from '../hook/graphObjectContext'
import {JsonMode} from './JsonMode'
import ListGroup from 'react-bootstrap/ListGroup';

/** displays clicked Document/ Enum or SubDocument Header */
const Header = (props) => {
	return <Stack direction="horizontal">
		<h5> <BiNetworkChart/> {props.label}</h5>
		<div className='ms-auto'>
			<RemoveElementComponent 
				hasConstraints={props.hasConstraints} 
				elementId={props.nodeData.name}
				elementType={props.nodeData.type}
				displayAsIcon={props.view === `UI_VIEW` ?false : true}
				removeElement={props.removeElement}/>
		</div>
	</Stack>
}

/** pops up the menu tabs */
function getMenuList(type) {
	let menu = []
	const tabList = [
		"Overview",
		type==="ChoiceClass" ? "Values" : "Properties",
		"Relationships",
		"JSON"
	]

	tabList.map(list => {
		menu.push(
			<ListGroup.Item action eventKey={list}>
				{list}
			</ListGroup.Item>
		)
	})

	return menu
}

const OverviewTabPane = (props) => {
	return <Tab.Pane eventKey={"Overview"}>
		<Card>
			<Card.Body>
				<BaseElement key={`base__${props.nodeData.name}`}
					removeElement={props.removeElement}
					hasConstraints={props.hasConstraints}
					nodeJsonData={props.nodeData}
					view={props.view}
					nodeSchemaData={props.nodeSchemaData}
					updateValue={props.updateBaseValue}/>
			</Card.Body>
		</Card>
	</Tab.Pane>
}

const InternalPane = (props) => {
	// ENUMS
	let key = props.nodeData.type==='ChoiceClass' ? 'Values' : 'Properties'
	if(key === "ChoiceClass") {
		return <Tab.Pane eventKey={key}>
			<ChoiceList key={`choice__${props.nodeData.name}`}
				choices={props.nodeData.choices} />
		</Tab.Pane>
	}

	return <Tab.Pane eventKey={key}>
		<ConstraintsComponent key={`const__${props.nodeData.name}`}/>
		<ParentsFilter key={`parent__${ props.nodeData.name}`} />
	</Tab.Pane>
}

const RelationshipsPane = (props) => {
	return <Tab.Pane eventKey={"Relationships"}>
		<ConstraintsComponent key={`const__${props.nodeData.name}`}/>
		{props.nodeData.type!=='ChoiceClass' &&
			<ParentsFilter key={`parent__${props.nodeData.name}`} />}
	</Tab.Pane>
}

const ListTab = (props) => {
	
	const menu = getMenuList(props.nodeData.type)

	return <Tab.Container id="model__list" defaultActiveKey={"Overview"}>		
		<Row>
			<Col sm={4}>
				<ListGroup>
					{menu}
				</ListGroup>
			</Col>
			<Col sm={8}>
				<Tab.Content>
					<OverviewTabPane {...props}/>
					<InternalPane {...props}/>
					<RelationshipsPane {...props}/>
					<Tab.Pane eventKey={"JSON"}><Fragment>
			<JsonMode nodeData={props.nodeData}/>
		</Fragment></Tab.Pane>
				
				</Tab.Content>
			</Col>
		</Row>
	</Tab.Container>
}

export const DetailsModelFormComponent = (props)=>{
	const {mainGraphObj,updateGraphNode} = GraphContextObj()
	
	const [tabKey,setTabKey]=useState(1)
	const nodeData = props.currentNodeJson ? props.currentNodeJson : {}
	const objPropsRelatedToClass = props.objPropsRelatedToClass || []
	const childrenArr = nodeData.allChildren || []
	const hasConstraints = (childrenArr.length>0 || objPropsRelatedToClass.length >0) ? true : false;
	const title=getLabelByName(nodeData.type);
	const [activeListTab, setActiveListTab]=useState(title)
	const nodeSchemaData = mainGraphObj.getNodeData() 

	const updateBaseValue = (name,value) =>{
		switch(name){
			case 'id':
				mainGraphObj.setId(value)
        		updateGraphNode()
				break
			case 'abstract':
				mainGraphObj.setAbstract(value)
        		updateGraphNode()
				break
			case 'comment':
				mainGraphObj.setComment(value)
		}
	}


	const [width, setWidth] = useState("")

	const handleWidthChange = (sz, setWidth) => {
	    const maxWidth = 1000;
	    const padding = 225;
	    const paneWidth = maxWidth - sz - padding;
	    setWidth({ width: paneWidth + "px" });
	}


	
	const label=nodeData.label || nodeData.id

	//const tabsElement = getTabs()
	return <div>
			<Header label={label}
				hasConstraints={hasConstraints}
				nodeData={nodeData}
				view={props.view}
				removeElement={props.removeElement}/>
			<SplitPane split="vertical"
				defaultSize="65%"
				className='h-auto mt-3' 
				onChange={size => handleWidthChange(size, setWidth)}>
					<ListTab nodeData={nodeData} updateBaseValue={updateBaseValue}/>
					<JsonMode nodeData={nodeData}/>
			</SplitPane>
	</div>
}

DetailsModelFormComponent.propTypes = {
    currentNodeJson:PropTypes.object,
}

DetailsModelFormComponent.defaultProps = {
    currentNodeJson: {}
};
