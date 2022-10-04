import React,{useState,useEffect,Fragment} from 'react';
import { SizeMe } from 'react-sizeme'
import SplitPane from "react-split-pane";
import {CLASS_TYPE_NAME} from "./utils/elementsName";
import {ModelTreeComponent} from './ModelTreeComponent';
import {DetailsModelComponent} from './detailsComponent/DetailsModelComponent';
import {GraphContextObj} from './hook/graphObjectContext';
import {DEFAULT_SCHEMA_VIEW} from '../constants/details-labels';
import {ModelMainHeaderComponent} from './detailsComponent/ModelMainHeaderComponent';
import {InfoBoxComponent} from './detailsComponent/InfoBoxComponent'
import {InfoObjectComponent} from './detailsComponent/InfoObjectComponent'
import {RightBarHeaderTools} from './detailsComponent/RightBarHeaderTools';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
//import {EDITOR_OPTIONS} from './detailsComponent/JsonMode'
import {ObjectClassModelViewMode} from './detailsComponent/viewMode/ObjectClassModelViewMode'


export const ViewBuilder = (props)=>{

	const {graphDataProvider,
		  setNodeAction,
		  graphUpdateLabel,
		  selectedNodeObject,
		  changeCurrentNode,
		  nodePropertiesList,
		  objectPropertyToRange,
		  addNewProperty,
		  removeElement,
		  objectPropertyList,
		  objPropsRelatedToClass,
		  getSchemaGraph,isFocusOnNode,mainGraphObj,
		  } = GraphContextObj();

	
	const isEditMode = props.isEditMode === false ? false : true

	const [panelIsOpen,setOpenClosePanel]=useState(true)
	const [zoomEvent,setZoomEvent]=useState(undefined)
	const [view, setView]=useState(DEFAULT_SCHEMA_VIEW)

	//const schema = mainGraphObj ? mainGraphObj.getSchema() : '{}'
	//const [editMode, setEditMode]=useState(true)

	//const [value, setValue]=useState(JSON.stringify(schema, null, 2)) 

    //EDITOR_OPTIONS.readOnly=!editMode

	useEffect(() => {
		if(!props.view) setView(DEFAULT_SCHEMA_VIEW)
		else setView(props.view)
	}, [props.view]) 

	const saveData=(commitMessage)=>{
		const json = getSchemaGraph();
		if(props.saveGraph) props.saveGraph(json, commitMessage)
		
	}

	const [width, setWidth] = useState("")

	const handleWidthChange = (sz, setWidth) => {
	    const maxWidth = 1000;
	    const padding = 225;
	    const paneWidth = maxWidth - sz - padding;
	    setWidth({ width: paneWidth + "px" });
	}

	/*
	* Edit mode when model is empty, so it has only the group type
	*/
	/*useEffect(() => {
         //startDataProsition();
        if(graphDataProvider && graphDataProvider.size===4){
			setIsEditMode(true);
		}//else{
			//setIsEditMode(false);
		//}
    }, [graphDataProvider])*/

	//const panelIsOpen=props.panelIsOpen || true;

	const mainPanelSize=panelIsOpen ? "calc(100% - 450px)" : "100%";
 
	let showInfoComp=false
	if(!selectedNodeObject || !selectedNodeObject.name ||
		selectedNodeObject.type===CLASS_TYPE_NAME.SCHEMA_ROOT ||
		selectedNodeObject.type===CLASS_TYPE_NAME.SCHEMA_GROUP){
		showInfoComp=true;
	}


	return (<React.Fragment>		
			<SplitPane split="vertical"
				defaultSize="70%"
				onChange={size => handleWidthChange(size, setWidth)}>
				<div>
					<ModelMainHeaderComponent
						setNodeAction={setNodeAction}
						extraTools={props.extraTools}
						setZoomEvent={setZoomEvent}
					/>
					<SizeMe monitorHeight={true}>{({ size }) =>
						<div style={{ minHeight:"400px", height: "calc(100vh - 10px)", width: "100%"}}>
							{graphDataProvider && <>
								<ModelTreeComponent 
									objectPropertyToRange={objectPropertyToRange}
									zoomEvent={zoomEvent}
									isEditMode={isEditMode}
									setNodeAction={setNodeAction}
									selectedNodeObject={selectedNodeObject}
									changeCurrentNode={changeCurrentNode}
									width={size.width} height={size.height}
									addedNewNode={selectedNodeObject.newNode}
									graphUpdateLabel={graphUpdateLabel}
									graphDataProvider={graphDataProvider}
									isFocusOnNode={isFocusOnNode}/>
							</>}
						</div>
						}
					</SizeMe>
				</div>
					<div className='h-100'>
					{isEditMode===true &&
						<RightBarHeaderTools saveData={saveData} />
					}		
					{showInfoComp && selectedNodeObject.type!==CLASS_TYPE_NAME.SCHEMA_GROUP &&
						<InfoBoxComponent dbName={props.dbName} custom={props.custom}/>
					}
					{showInfoComp && selectedNodeObject.type===CLASS_TYPE_NAME.SCHEMA_GROUP &&
						<InfoObjectComponent panelType={selectedNodeObject.name} custom={props.custom}/>
					}
					{!showInfoComp && isEditMode===false &&
						<ObjectClassModelViewMode custom={props.custom}/>}
					{!showInfoComp && isEditMode===true &&
						<DetailsModelComponent
							objPropsRelatedToClass={objPropsRelatedToClass}
							objectPropertyList={objectPropertyList}
							removeElement={removeElement}
							addNewProperty={addNewProperty}
							nodePropertiesList={nodePropertiesList}
							currentNodeJson={selectedNodeObject}
							custom={props.custom}
							/>	}					
				</div>
			</SplitPane>
			</React.Fragment>
	)
}
