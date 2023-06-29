import React,{useEffect,useState} from "react"
import {modelCallServerHook, SchemaDiagram, ViewBuilder, SchemaDocumentView} from "@terminusdb-live/tdb-react-components"
import {Tabs, Tab,Stack, Container, Button} from "react-bootstrap"
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

const ModelBuilderViewControl = ({ selectedMode, setSelectedMode }) => {
	

	function handleSwitch(chosen) {
		setSelectedMode(chosen)
	}

	function getVariant(mode, selectedMode) {
		if(mode === selectedMode) return "light"
		return "dark"
	}

	function getModeLabel(mode, selectedMode, label) {
		if(mode === selectedMode) return label
		return `Switch to ${label}`
	}

//
	return <Stack direction="horizontal" className="border-secondary border-bottom" gap={3}>
		<Button variant={getVariant(DOCUMENT_TAB, selectedMode)} 
			onClick={(e)=>handleSwitch(DOCUMENT_TAB)}>
				{getModeLabel(DOCUMENT_TAB, selectedMode, "UI Mode")}
		</Button>
		<Button variant={getVariant(DIAGRAM_TAB, selectedMode)} 
			onClick={(e)=>handleSwitch(DIAGRAM_TAB)}>
				{getModeLabel(DIAGRAM_TAB, selectedMode, "Diagram Mode")}
		</Button>
		<Button variant={getVariant(GRAPH_TAB, selectedMode)}  
			onClick={(e)=>handleSwitch(GRAPH_TAB)}>
				{getModeLabel(GRAPH_TAB, selectedMode, "Graph UI Mode")}
		</Button>
		<Button variant={getVariant(JSON_TAB, selectedMode)}  
			onClick={(e)=>handleSwitch(JSON_TAB)}>
				{getModeLabel(JSON_TAB, selectedMode, "JSON Mode")}
		</Button>
	</Stack>
} 

export const ModelBuilderTabs = () => {

  const { woqlClient, branch, ref, accessControlDashboard, currentChangeRequest } = WOQLClientObj()
	if(!woqlClient) return ""
	const dataProduct = woqlClient.db()
	const { callServerLoading, saveGraphChanges } = modelCallServerHook(woqlClient, branch, ref,dataProduct)
	const { selectedNodeObject } = GraphContextObj();
	const [showSavedMsg, setShowSavedMsg] = useState(false);

	const [tab, setTab]=useState(DOCUMENT_TAB)

	const [selectedMode, setSelectedMode] = useState(DOCUMENT_TAB)

	// check if the user is in view mode or edit mode
	let isEditMode = accessControlDashboard && accessControlDashboard.schemaWrite() || false
	isEditMode = currentChangeRequest ? false : isEditMode

  const saveData=async (jsonObj, commitMessage)=>{
    await saveGraphChanges(jsonObj, commitMessage)
		setShowSavedMsg(Date.now())
  }

	/*return <SchemaDocumentView saveData={saveData}
		dbName={dataProduct} 
		custom={true}/>*/

	const closeShowSavedMessage = () => setShowSavedMsg(!showSavedMsg);

	return <>
		
		<ModelBuilderViewControl selectedMode={selectedMode} setSelectedMode={setSelectedMode}/>
		{!callServerLoading && selectedMode === DOCUMENT_TAB  && 
			<SchemaDocumentView  	dbName={dataProduct} 
				saveGraph={saveData}
				custom={true}/>}

		{!callServerLoading && selectedMode === DIAGRAM_TAB  && 
			<SchemaDiagram  dbName={dataProduct} 
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
	</>

	return <Tabs defaultActiveKey={DOCUMENT_TAB} 
		id="model-builder-tab" 
		className="mt-3" 
		onSelect={(k) => setTab(k)} >   
		<Tab eventKey={DOCUMENT_TAB} title="Schema">
			{callServerLoading &&  <Loading message={`Fetching schema of ${dataProduct}...`}/>}                  
										
			{!callServerLoading && tab === DOCUMENT_TAB  && 
				<SchemaDocumentView saveData={saveData}
          dbName={dataProduct} 
          custom={true}/>}
		</Tab>              
		<Tab eventKey={GRAPH_TAB} title="Graph View">
			{callServerLoading &&  <Loading message={`Fetching schema of ${dataProduct}...`}/>}                  
										
			{!callServerLoading && tab === GRAPH_TAB  && 
				<ViewBuilder 
						dbName={dataProduct} 
						custom={true}
						saveGraph={saveData}
						isEditMode={isEditMode}/>}
		</Tab>
		<Tab eventKey={JSON_TAB} title="JSON View">
			{callServerLoading &&  <Loading message={`Fetching schema of ${dataProduct}...`}/>}                   
																			
			{/*!callServerLoading && dataProduct && 
					<JSONModelBuilder accessControlEditMode={isEditMode} tab={tab} />*/}
		</Tab>

	</Tabs>
}