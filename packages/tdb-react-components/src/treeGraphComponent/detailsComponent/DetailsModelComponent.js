import React,{useState,useEffect,Fragment} from 'react';
import PropTypes from "prop-types";
import {BiNetworkChart} from "react-icons/bi"
/*
* remove and use react-bootstrap
*/
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

export const DetailsModelComponent = (props)=>{
	const {mainGraphObj,updateGraphNode} = GraphContextObj()
	const [tabKey,setTabKey]=useState(1)
	const nodeData = props.currentNodeJson ? props.currentNodeJson : {}
	const objPropsRelatedToClass = props.objPropsRelatedToClass || []
	const childrenArr = nodeData.allChildren || []
	const hasConstraints = (childrenArr.length>0 || objPropsRelatedToClass.length >0) ? true : false;
	const title=getLabelByName(nodeData.type);
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

	useEffect(() => {
        setTabKey(1)
    },[props.currentNodeJson])

	const getTabs=()=>{
		const tabsArr=[]
		tabsArr.push({title:title,
	             getContent: () =><BaseElement key={`base__${nodeData.name}`}
	    							removeElement={props.removeElement}
	    							hasConstraints={hasConstraints}
	    							nodeJsonData={nodeData}
									nodeSchemaData={nodeSchemaData}
	    							updateValue={updateBaseValue}
									/>
							 	 	,
							    	key: 1,
							    	tabClassName: 'tab',
							    	panelClassName: 'tdb__panel'
							})
		if(nodeData.type==='ChoiceClass'){
			tabsArr.push({title:'Values',
	             getContent: () =><ChoiceList key={`choice__${nodeData.name}`}
	             					choices={nodeData.choices} />
	             				  ,
						    	key: 2,
						    	tabClassName: 'tab',
						    	panelClassName: 'tdb__panel'
							})
		}else if(nodeData.type!=='ChoiceClass'){
			tabsArr.push({title:'Properties',
	            getContent: () =><PropertiesComponent  custom={props.custom} key={`properties__${nodeData.name}`}/>,
							    	key: 2,
							    	tabClassName: 'tab',
							    	panelClassName: 'tdb__panel'})
		}

		tabsArr.push({title:'Relationships',
	            getContent: () =><Fragment>
	         						<ConstraintsComponent key={`const__${nodeData.name}`}/>
									{nodeData.type!=='ChoiceClass' &&
	         							<ParentsFilter key={`parent__${nodeData.name}`} />
									}
         				  		</Fragment>
         				  	,

				    	key: 3,
				    	tabClassName: 'tab',
				    	panelClassName: 'tdb__panel'
				})
		tabsArr.push({title:'JSON',
		getContent: () =><Fragment>
							<JsonMode nodeData={nodeData}/>
						</Fragment>
					,

				key: 4,
				tabClassName: 'tab',
				panelClassName: 'tdb__panel'
		})

		return tabsArr;
	}

	const changeTab=(key)=>{
		if(!currentNodeJson.id){
			alert('please add a valid ID');
		}else{
			setTabKey(key)
		}
	}
	const label=nodeData.label || nodeData.id

	const tabsElement = getTabs()

	return <div className={`col-12 ${props.customClassName} h-100 pt-4`}>
				<div>
					<div className="d-flex mb-3">
						<BiNetworkChart className="schema-summary-icons"/>
						<h5 className="ml-3" title={label}>{label}</h5>
					</div>
					{tabsElement && <Tabs panelClassName="bg-dark card-header" tabsWrapperClass="bg-dark" tabClassName="bg-dark" items={tabsElement} transform={false} onChange={setTabKey} selectedTabKey={tabKey}/>}
				</div>
			</div>
}

DetailsModelComponent.propTypes = {
    currentNodeJson:PropTypes.object,
}

DetailsModelComponent.defaultProps = {
    currentNodeJson: {}
};
