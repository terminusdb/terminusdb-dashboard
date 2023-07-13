import React,{useEffect,useState} from "react"
import {modelCallServerHook, ViewBuilder, SchemaDocumentView} from "@terminusdb-live/tdb-react-components"
import {Tabs, Tab,Stack, Row, Col, Button} from "react-bootstrap"
import {SCHEMA_MODEL_VIEW, DOCUMENT_TAB, GRAPH_TAB, JSON_TAB, DIAGRAM_TAB} from "./constants"
import {WOQLClientObj} from '../init-woql-client'
import {Loading} from "../components/Loading" 
import {PROGRESS_BAR_COMPONENT}  from "../components/constants"
import {JSONModelBuilder} from "../components/JSONModelBuilder" 
import {ErrorMessageReport} from "../components/ErrorMessageReport"
import Nav from 'react-bootstrap/Nav';
import { MODEL_BUILDER_NAV } from "../components/constants" 
import {GraphContextObj} from "@terminusdb-live/tdb-react-components"
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { AiOutlineCheckCircle } from "react-icons/ai"
import ListGroup from 'react-bootstrap/ListGroup';
import { FiHelpCircle } from "react-icons/fi"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const renderTooltip = (helpText) => (
	<Tooltip id="help-tooltip" >
		<label className="text-light">{helpText}</label>
	</Tooltip>
);

const Help = ({ helpText }) => {
	return <OverlayTrigger
		placement="top"
		overlay={renderTooltip(helpText)}
		>
			<Button variant="transparent" className="btn btn-sm"><FiHelpCircle className="text-muted"/></Button>
	</OverlayTrigger>
}

const ModelBuilderViewControl = ({ selectedMode, setSelectedMode }) => {
	
	function handleSwitch(chosen) {
		setSelectedMode(chosen)
	}

	function getVariant(mode, selectedMode) {
		if(mode === selectedMode) return "light"
		return "dark"
	}

	function getActiveClassName (mode, selectedMode) {
		if(mode === selectedMode) return true
		return false
	}

	function getModeLabel(mode, selectedMode, label) {
		if(mode === selectedMode) return label
		return `Switch to ${label}`
	}

	return <ListGroup variant="flush">
		<ListGroup.Item onClick={(e)=>handleSwitch(DOCUMENT_TAB)} 
			action
			active={getActiveClassName(DOCUMENT_TAB, selectedMode)}
			className="bg-transparent">
			{getModeLabel(DOCUMENT_TAB, selectedMode, "UI Mode")}
			<Help helpText="Create or View Schema Builder in Form UI View"/>
		</ListGroup.Item>
		<ListGroup.Item onClick={(e)=>handleSwitch(GRAPH_TAB)}
			action
			active={getActiveClassName(GRAPH_TAB, selectedMode)}
			className="bg-transparent">
			{getModeLabel(GRAPH_TAB, selectedMode, "Graph UI Mode")}
			<Help helpText="Create or View Schema Builder in Graphical UI View"/>
		</ListGroup.Item>
		<ListGroup.Item onClick={(e)=>handleSwitch(JSON_TAB)}
			active={getActiveClassName(JSON_TAB, selectedMode)}
			action
			className="bg-transparent">
			{getModeLabel(JSON_TAB, selectedMode, "JSON Mode")}
			<Help helpText="Create or View Schema in JSON View mode"/>
		</ListGroup.Item>
	</ListGroup>


} 

export const ModelBuilderTabs = () => {

  const { woqlClient, branch, ref, accessControlDashboard, currentChangeRequest } = WOQLClientObj()
	if(!woqlClient) return ""
	const dataProduct = woqlClient.db()
	const { callServerLoading, saveGraphChanges } = modelCallServerHook(woqlClient, branch, ref,dataProduct)
	const { selectedNodeObject } = GraphContextObj();
	const [showSavedMsg, setShowSavedMsg] = useState(false);
	const [selectedKey, setSelectedKey] = useState(1)

	const [tab, setTab]=useState(DOCUMENT_TAB)

	const [selectedMode, setSelectedMode] = useState(DOCUMENT_TAB)

	// check if the user is in view mode or edit mode
	let isEditMode = accessControlDashboard && accessControlDashboard.schemaWrite() || false
	isEditMode = currentChangeRequest ? false : isEditMode

  const saveData=async (jsonObj, commitMessage)=>{
    await saveGraphChanges(jsonObj, commitMessage)
		setShowSavedMsg(Date.now())
  }

	const closeShowSavedMessage = () => setShowSavedMsg(!showSavedMsg);

	return <Row className="w-100">
		<Col md={10}>
			{!callServerLoading && selectedMode === DOCUMENT_TAB  && 
				<SchemaDocumentView  	dbName={dataProduct} 
					saveGraph={saveData}
					custom={true}/>}


			{!callServerLoading && selectedMode === GRAPH_TAB  && 
				<ViewBuilder  dbName={dataProduct} 
					custom={true}
					saveGraph={saveData}
					isEditMode={isEditMode}/>}
			
			{!callServerLoading && selectedMode === JSON_TAB && 
				<JSONModelBuilder accessControlEditMode={isEditMode} tab={tab} />}
				<ToastContainer
						className="p-3 mt-4"
						position={'bottom-end'}
						style={{ zIndex: 1 }}
					>
						<Toast show={showSavedMsg} 
							delay={3000} autohide
							onClose={closeShowSavedMessage} 
							bg="success">
								<Toast.Header>
									<AiOutlineCheckCircle className="text-success mr-2" size="20"/> <span>Success</span>
									</Toast.Header>
								<Toast.Body>
									
									<strong className="me-auto">Your changes have been successfully saved</strong>
		
								</Toast.Body>
							</Toast>
							
							
					</ToastContainer>
		</Col>
		<Col md={2}  className="border-left border-secondary vh-100">
			<ModelBuilderViewControl selectedMode={selectedMode} setSelectedMode={setSelectedMode}/>
		</Col>
	</Row>


}