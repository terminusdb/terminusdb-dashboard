import React,{useEffect,useState} from "react"
import {modelCallServerHook, GraphObjectProvider, ViewBuilder, SchemaDocumentView} from "@terminusdb-live/tdb-react-components"
import {Tabs, Tab,Alert} from "react-bootstrap"
import {SCHEMA_MODEL_VIEW, DOCUMENT_TAB, GRAPH_TAB, JSON_TAB} from "./constants"
import {WOQLClientObj} from '../init-woql-client'
import {Loading} from "../components/Loading" 
import {PROGRESS_BAR_COMPONENT}  from "../components/constants"
import {JSONModelBuilder} from "../components/JSONModelBuilder" 
import {ErrorMessageReport} from "../components/ErrorMessageReport"
import Nav from 'react-bootstrap/Nav';
import { MODEL_BUILDER_NAV } from "../components/constants"

export const ModelBuilderTabs = () => {

  const { woqlClient, branch, ref, accessControlDashboard, currentChangeRequest } = WOQLClientObj()
	if(!woqlClient) return ""
	const dataProduct = woqlClient.db()
	const { callServerLoading, saveGraphChanges } = modelCallServerHook(woqlClient, branch, ref,dataProduct)

	const [tab, setTab]=useState(DOCUMENT_TAB)

	// check if the user is in view mode or edit mode
	let isEditMode = accessControlDashboard && accessControlDashboard.schemaWrite() || false
	isEditMode = currentChangeRequest ? false : isEditMode

  const saveData=async (jsonObj, commitMessage)=>{
    await saveGraphChanges(jsonObj, commitMessage)
  }

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