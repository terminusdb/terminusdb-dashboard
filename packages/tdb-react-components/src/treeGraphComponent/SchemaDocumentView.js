import React, { useState } from "react"
import {DetailsModelFormComponent} from './detailsComponent/DetailsModelFormComponent'
import { DetailsModelComponent } from './detailsComponent/DetailsModelComponentView'
import {GraphContextObj} from './hook/graphObjectContext'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from "react-bootstrap/Badge"
import Container from 'react-bootstrap/Container';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { SizeMe } from 'react-sizeme'
import SplitPane from "react-split-pane"; 
import Accordion from 'react-bootstrap/Accordion';
import { AiOutlinePlus } from "react-icons/ai"
import {InfoBoxComponent} from './detailsComponent/InfoBoxComponent'
import {InfoObjectComponent} from './detailsComponent/InfoObjectComponent'
import {CLASS_TYPE_NAME} from "./utils/elementsName"
import {ObjectClassModelViewMode} from './detailsComponent/viewMode/ObjectClassModelViewMode'
import { SchemaBuilderList } from "./detailsComponent/SchemaControlAccordian"


export const SchemaDocumentView = (props) => {

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
    getSchemaGraph,isFocusOnNode,mainGraphObj 
    } = GraphContextObj();


    
    const [width, setWidth] = useState("")

	const handleWidthChange = (sz, setWidth) => {
	    const maxWidth = 1000;
	    const padding = 225;
	    const paneWidth = maxWidth - sz - padding;
	    setWidth({ width: paneWidth + "px" });
	}

  if(!mainGraphObj) return <>LOADING ...</>
 
  let showInfoComp=false

	/*if(!selectedNodeObject || !selectedNodeObject.name || 
		selectedNodeObject.type===CLASS_TYPE_NAME.SCHEMA_ROOT ||
		selectedNodeObject.type===CLASS_TYPE_NAME.SCHEMA_GROUP){
		showInfoComp=true;
	}*/
  // if a document is selected by user 
	if(Object.keys(selectedNodeObject).length ||
  //if(!selectedNodeObject.name ||
    selectedNodeObject.type===CLASS_TYPE_NAME.SCHEMA_ROOT ||
		selectedNodeObject.type===CLASS_TYPE_NAME.SCHEMA_GROUP){
		showInfoComp=true;
	}
  
  const saveData=(json, commitMessage)=>{ 
		//const json = getSchemaGraph();
    //console.log(JSON.stringify(json, null, 2))
		if(props.saveGraph) props.saveGraph(json, commitMessage)
		
	}

  return 	<SplitPane split="vertical"
    defaultSize="23%"
    className='mr-3 border-left border-dark rounded view__builder__pane' 
    onChange={size => handleWidthChange(size, setWidth)}>
    <div className='h-100 border-right border-secondary overflow-y-scroll'>
      <SchemaBuilderList canAdd={true}/>
    </div>
    <div>
      <SizeMe monitorHeight={true}>{({ size }) =>
        <div style={{ minHeight:"400px", height: "calc(100vh - 10px)", width: "100%"}}>
          {!showInfoComp && <InfoBoxComponent dbName={props.dbName} custom={props.custom} view={`UI_VIEW`}/>}
          {showInfoComp &&  <>
            {/*<RightBarHeaderTools saveData={saveData} view={`UI_VIEW`}/>*/}
     
            <Card className="bg-transparent border-0">
              <Card.Body> 
                <DetailsModelComponent
                  customClassName="bg-transparent"
                  objPropsRelatedToClass={objPropsRelatedToClass}
                  objectPropertyList={objectPropertyList}
                  removeElement={removeElement}
                  addNewProperty={addNewProperty}
                  nodePropertiesList={nodePropertiesList}
                  currentNodeJson={selectedNodeObject}
                  saveData={saveData}
                  view={`UI_VIEW`}
                  custom={props.custom}
                  tabBg={`transparent`}/>
                </Card.Body>
            </Card>
            
          </>}
        </div>}
      </SizeMe>
    </div>
  </SplitPane>

  return <div style={{height: "100vh"}}>
    <Row className="h-100">
      <Col md={3} className="border-right border-secondary vh-100 overflow-y-scroll">
        <SchemaBuilderList/>
      </Col>
      <Col md={9}>
        {!showInfoComp && <InfoBoxComponent dbName={props.dbName} custom={props.custom} view={`UI_VIEW`}/>}
        {showInfoComp &&  <>
          {/*<RightBarHeaderTools saveData={saveData} view={`UI_VIEW`}/>*/}
          <Card className="bg-transparent">
            <Card.Body>
              <DetailsModelComponent
                customClassName="bg-transparent"
                objPropsRelatedToClass={objPropsRelatedToClass}
                objectPropertyList={objectPropertyList}
                removeElement={removeElement}
                addNewProperty={addNewProperty}
                nodePropertiesList={nodePropertiesList}
                currentNodeJson={selectedNodeObject}
                tabKey={tabKey}
                saveData={saveData}
                setTabKey={setTabKey}
                custom={props.custom}
                tabBg={`transparent`}/>
              </Card.Body>
          </Card>
        </>
        }
      </Col>
    </Row> 
  </div>



}