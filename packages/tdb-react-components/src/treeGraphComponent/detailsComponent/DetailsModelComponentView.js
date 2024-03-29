import React,{useState,useEffect,Fragment} from 'react';
import PropTypes from "prop-types";
import { SaveBarHeaderTools } from "./SaveBarHeaderTools"
import Tabs from 'react-responsive-tabs';
import {BaseElement} from './BaseElement';
import 'react-responsive-tabs/styles.css';
import {PropertiesComponent} from './PropertiesComponent'; 
import {ELEMENT_ICONS} from '../../constants/details-labels';
import {ChoiceList} from './ChoiceList';
import {getLabelByName} from '../utils/elementsName'
import {GraphContextObj} from '../hook/graphObjectContext'
import {JsonMode} from './JsonMode'
import {RelationShipElement} from './RelationshipElement';


const PROPERTIES_TAB = 'Properties'
const VALUES_TAB = 'Values'
const RELATIONSHIP_TAB = 'Relationships'
const JSON_TAB = 'JSON'

export const DetailsModelComponent = (props)=>{
	const {mainGraphObj,updateGraphNode, getSchemaGraph} = GraphContextObj()
	const [tabKey, setTabKey]=useState(1)
	
	const nodeData = props.currentNodeJson ? props.currentNodeJson : {}
	const objPropsRelatedToClass = props.objPropsRelatedToClass || []
	const childrenArr = nodeData.allChildren || []
	const hasConstraints = (childrenArr.length>0 || objPropsRelatedToClass.length >0) ? true : false;
	const title=getLabelByName(nodeData.type);
	const nodeSchemaData = mainGraphObj.getNodeData() 

	const saveData=(commitMessage)=>{
		const json = getSchemaGraph();
		if(props.saveData) props.saveData(json, commitMessage)
	}

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

	useEffect(() => {
		setTabKey(1)
	},[props.currentNodeJson])

	function getTabDisplay (args) {

		let { currentTab, nodeData, saveData, removeElement, hasConstraints, nodeSchemaData, updateBaseValue } = args

		if(currentTab === PROPERTIES_TAB) {
			return <>
				<SaveBarHeaderTools saveData={args.saveData} 
					hasConstraints={args.hasConstraints} 
					elementId={args.nodeData.name}
					nodeJsonData={args.nodeData}
					displayDelete={true}
					removeElement={args.removeElement}/>
				<PropertiesComponent  view={props.view} custom={props.custom} key={`properties__${nodeData.name}`}/>
			</> 
		}
		else if (currentTab === VALUES_TAB) {
			return <>
				<SaveBarHeaderTools saveData={args.saveData} 
					hasConstraints={args.hasConstraints} 
					elementId={args.nodeData.name}
					nodeJsonData={args.nodeData}
					displayDelete={true}
					removeElement={args.removeElement}/>
				<ChoiceList key={`choice__${nodeData.name}`} view={props.view} choices={nodeData.choices} />
			</> 
		}
		else if(currentTab === RELATIONSHIP_TAB) {  
			return <RelationShipElement  view={props.view} nodeData={nodeData}/>
			
		}
		else if(currentTab === JSON_TAB) { 
			return <JsonMode nodeData={nodeData} saveData={args.saveData}/>
		} 
		else { 
				// selected document/ SubDoument or Enum to be displayed 
			return <>
				<SaveBarHeaderTools saveData={args.saveData} 
					hasConstraints={args.hasConstraints} 
					elementId={args.nodeData.name}
					nodeJsonData={args.nodeData}
					displayDelete={true}
					removeElement={args.removeElement}/>
				<BaseElement key={`base__${nodeData.name}`}
					removeElement={removeElement} 
					hasConstraints={hasConstraints}
					nodeJsonData={nodeData}
					view={props.view}
					nodeSchemaData={nodeSchemaData}
					updateValue={updateBaseValue}/>
			</> 
			
		}
	}

	const TabContent  = (args) => {
		return <>
			{getTabDisplay(args)}
		</>
	}

	const getTabs=()=>{
		const tabsArr=[]
		tabsArr.push({
			title: title,
	    getContent: () => <TabContent currentTab={title} 
				updateBaseValue={updateBaseValue}
				hasConstraints={hasConstraints}
				nodeSchemaData={nodeSchemaData}
				saveData={saveData}
				removeElement={props.removeElement}
				nodeData={nodeData}/>,
			key: 1,
			tabClassName: 'tab',
			panelClassName: 'tdb__panel'
		}) 
		if(nodeData.type==='ChoiceClass'){
			tabsArr.push({
				title:'Values',
				getContent: () => <TabContent currentTab={VALUES_TAB} 
					saveData={saveData}
					nodeData={nodeData}/>,
				key: 2,
				tabClassName: 'tab',
				panelClassName: 'tdb__panel'
			})
		}
		else if(nodeData.type!=='ChoiceClass'){
			tabsArr.push({
				title: PROPERTIES_TAB,
				getContent: () => <TabContent currentTab={PROPERTIES_TAB} 
					saveData={saveData}
					nodeData={nodeData}/>,
				key: 2,
				tabClassName: 'tab',
				panelClassName: 'tdb__panel overflow-auto'
			})
		}
		tabsArr.push({
			title: RELATIONSHIP_TAB, 
	    getContent: () => <TabContent currentTab={RELATIONSHIP_TAB} 
				saveData={saveData}
				nodeData={nodeData}/>,
			key: 3,
			tabClassName: 'tab',
			panelClassName: 'tdb__panel'
		})
		tabsArr.push({
			title: JSON_TAB,
			getContent: () => <TabContent currentTab={JSON_TAB} 
				saveData={saveData}
				nodeData={nodeData}/>,
			key: 6,
			tabClassName: 'tab',
			panelClassName: 'tdb__panel'
		})

	
		return tabsArr;
	}


	const label=nodeData.label || nodeData.id

	const tabsElement = getTabs()


	return <div className={` ${props.customClassName} h-100`} style={{marginTop: "-15px"}}>
		{tabsElement && <Tabs panelClassName={`{bg-${props.tabBg} card-header}`} 
			tabsWrapperClass={`bg-${props.tabBg}`} 
			tabClassName={`bg-${props.tabBg}`}  
			items={tabsElement} 
			transform={false} 
			onChange={(tab) => setTabKey(tab)} 
			selectedTabKey={tabKey}/>}
				
	</div> 
}

DetailsModelComponent.propTypes = {
    currentNodeJson:PropTypes.object,
}

DetailsModelComponent.defaultProps = {
    currentNodeJson: {}
};
