import React,{useEffect,useState} from "react"
import {modelCallServerHook, ViewBuilder, SchemaDocumentView} from "@terminusdb-live/tdb-react-components"
import {Tabs, Tab,Stack, Row, Badge, Button} from "react-bootstrap"
import {SCHEMA_MODEL_VIEW, DOCUMENT_TAB, GRAPH_TAB, JSON_TAB, DIAGRAM_TAB} from "./constants"
import {WOQLClientObj} from '../init-woql-client'
import {Loading} from "../components/Loading" 
import {PROGRESS_BAR_COMPONENT, TERMINUS_DANGER}  from "../components/constants"
import {JSONModelBuilder} from "../components/JSONModelBuilder" 
import {ErrorMessageReport} from "../components/ErrorMessageReport"
import Nav from 'react-bootstrap/Nav';
import { MODEL_BUILDER_NAV } from "../components/constants" 
import {GraphContextObj} from "@terminusdb-live/tdb-react-components"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { AiOutlineCheckCircle, AiOutlineCheck } from "react-icons/ai"
import ListGroup from 'react-bootstrap/ListGroup';
import { FiHelpCircle } from "react-icons/fi"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'; 
import Tooltip from 'react-bootstrap/Tooltip';
import { Alerts } from "../components/Alerts"
import { FormatErrorMessages } from "../components/ErrorMessageReport"




export const ModelBuilderViewControl = () => {

	const {
		selectedMode, 
		setSelectedMode
} = WOQLClientObj()
	
	function handleSwitch(chosen) {
		setSelectedMode(chosen)
	}

	function getActiveIcon(mode, selectedMode) {
		if(mode === selectedMode) return <AiOutlineCheck className="custom__green float-right ml-3" size={20}/>
		return <></>
	}
	
	function getActive (mode, selectedMode) {
		if(mode === selectedMode) return true
		return false
	}

	function getActiveClassName (mode, selectedMode) {
		if(mode === selectedMode) return "bg-dark text-white tdb__selected__modelUI btn-sm"
		return "border border-dark bg-transparent btn-sm "
	}

	function getHelpLabel(mode, selectedMode, label) {
		if(mode === selectedMode) return label
		return `Switch to ${label}`
	} 

	return <div className="mt-2">
		<Button onClick={(e)=>handleSwitch(DOCUMENT_TAB)}
			active={getActive(DOCUMENT_TAB, selectedMode)}
			className={`${getActiveClassName(DOCUMENT_TAB, selectedMode)} mb-2`}
			title={getHelpLabel(DOCUMENT_TAB, selectedMode, "UI Mode")}>
			{getHelpLabel(DOCUMENT_TAB, selectedMode, "UI Mode")} 
			{getActiveIcon(DOCUMENT_TAB, selectedMode)} 
			
		</Button>
		<Button onClick={(e)=>handleSwitch(GRAPH_TAB)}
			active={getActive(GRAPH_TAB, selectedMode)}
			className={`${getActiveClassName(GRAPH_TAB, selectedMode)} mb-2`}
			title={getHelpLabel(GRAPH_TAB, selectedMode, "Graph UI Mode")}>
			{getHelpLabel(GRAPH_TAB, selectedMode, "Graph UI Mode")} {getActiveIcon(GRAPH_TAB, selectedMode)}
		</Button>
		<Button onClick={(e)=>handleSwitch(JSON_TAB)}
			active={getActive(JSON_TAB, selectedMode)}
			className={`${getActiveClassName(JSON_TAB, selectedMode)} mb-2`}
			title={getHelpLabel(JSON_TAB, selectedMode, "JSON Mode")}>
			{getHelpLabel(JSON_TAB, selectedMode, "JSON Mode")} {getActiveIcon(JSON_TAB, selectedMode)}
		</Button>

	
	</div>


} 
 
export const ModelBuilder = () => { 

  const { woqlClient, branch, ref, accessControlDashboard, currentChangeRequest, collapseSideBar, selectedMode } = WOQLClientObj()
	if(!woqlClient) return "" 
	const dataProduct = woqlClient.db()
	const { callServerLoading, saveGraphChanges, reportMessage } = modelCallServerHook(woqlClient, branch, ref,dataProduct)
	const { selectedNodeObject } = GraphContextObj();
	const [showSavedMsg, setShowSavedMsg] = useState(false);

	const [tab, setTab]=useState(DOCUMENT_TAB)

	//const [selectedMode, setSelectedMode] = useState(DOCUMENT_TAB)

	// check if the user is in view mode or edit mode
	let isEditMode = accessControlDashboard && accessControlDashboard.schemaWrite() || false
	isEditMode = currentChangeRequest ? false : isEditMode

  const saveData=async (jsonObj, commitMessage)=>{
    await saveGraphChanges(jsonObj, commitMessage)
		setShowSavedMsg(Date.now())
  }



	const closeShowSavedMessage = () => setShowSavedMsg(!showSavedMsg);
 
	return   <Row className="w-100">
		{/*<Col md={11}>*/}
			{!reportMessage && <ToastContainer
				className="p-3 mt-4"
				position={'top-end'}
				style={{ zIndex: 1 }}>
				<Toast show={showSavedMsg} 
					//delay={3000} autohide
					onClose={closeShowSavedMessage} 
					bg="secondary">
						<Toast.Header>
							<span className="col-md-11 strong">Success</span>
						</Toast.Header>
						<Toast.Body>
							
							<label className="me-auto">
								<AiOutlineCheck className="mr-2" style={{color: "#00bc8c"}} size="22"/> 
								Your changes have been successfully saved
							</label>

						</Toast.Body>
					</Toast> 
			</ToastContainer>}

			{callServerLoading && <Loading message={`Saving schema ...`}/>} 
			{reportMessage &&  <FormatErrorMessages error={reportMessage}/>}

			{!callServerLoading && selectedMode === DOCUMENT_TAB  && 
				<SchemaDocumentView  	dbName={dataProduct} 
					saveGraph={saveData}
					custom={true}/>}

			{!callServerLoading && selectedMode === GRAPH_TAB  && 
				<ViewBuilder  dbName={dataProduct} 
					custom={true}
					saveGraph={saveData}
					isEditMode={isEditMode}/>}
			
			{!callServerLoading && selectedMode === JSON_TAB && <div className="ml-5 mr-5">
				<div className={collapseSideBar ? "ml-5" : ""}>
					<JSONModelBuilder accessControlEditMode={isEditMode} tab={selectedMode} />
				</div>
			</div>} 
		
			  
		{/*</Col>*/}
	</Row>


}

/**
 * <Col md={1}  className="border-left border-secondary vh-100">
			<ModelBuilderViewControl selectedMode={selectedMode} setSelectedMode={setSelectedMode}/>
		</Col>
 */