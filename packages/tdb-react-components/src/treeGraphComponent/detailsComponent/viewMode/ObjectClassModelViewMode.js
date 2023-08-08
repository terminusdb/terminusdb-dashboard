import React,{Fragment} from 'react';
import {BaseSchemaElementViewMode} from './BaseSchemaElementViewMode'
import {PropertiesComponentViewMode} from './PropertiesComponentViewMode'
import {ParentsElementViewMode} from './ParentsElementViewMode'
import {CLASS_TYPE_NAME} from '../../utils/elementsName'
import {ListComponent} from'../ListComponent'
import {GraphContextObj} from '../../hook/graphObjectContext'
import {ConstraintsComponent} from '../ConstraintsComponent'
import {BiNetworkChart} from "react-icons/bi"

export const ObjectClassModelViewMode = (props) => {

	const {selectedNodeObject,
		   nodePropertiesList,
		   changeCurrentNode,mainGraphObj} = GraphContextObj();

	const  currentNodeJson = selectedNodeObject || {};
	const label = currentNodeJson.id;

	return(<div className="col-12  h-100 pt-4 overflow-auto">
			<div>
				<div className="d-flex mb-3">
					{<BiNetworkChart className="schema-summary-icons"/>}
					<h5 className="ml-3" title={label}>{label}</h5>
				</div>
			<div className="tdb__panel">
			<BaseSchemaElementViewMode  currentNodeJson={currentNodeJson}  />
			{currentNodeJson.type===CLASS_TYPE_NAME.CHOICE_CLASS &&
			  <Fragment>
			  <span className="tdb__panel__title tdb__panel__title--parent">Values</span>
			  <div className="tdb__panel__box">
			  	<ListComponent dataProvider={currentNodeJson.choices} />
			  </div>
			  </Fragment>
		    }
		    {nodePropertiesList && nodePropertiesList.length>0 &&
			    <Fragment>
				    <div className="tdb__panel__title tdb__panel__title--prop">
			  	 		Properties
			  	 	</div>
					<PropertiesComponentViewMode mainGraphObj={mainGraphObj} changeCurrentNode={changeCurrentNode} dataProvider={nodePropertiesList || []} />
				</Fragment>
			}
			{currentNodeJson.parents && currentNodeJson.parents.length>0 &&
				<Fragment>
					<div className="tdb__panel__title tdb__panel__title--parent">
		  	 			Parent List
		  	 		</div>
					<ParentsElementViewMode  id={props.id} title={'Parents'} />
				</Fragment>}
			<Fragment>
				<div className="tdb__panel__title tdb__panel__title--prop">
	  	 		   Relationships
	  	 		</div>
				<ConstraintsComponent/>
			</Fragment>
		</div>
		</div>
		</div>
		
	)
}