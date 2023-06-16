import React,{useEffect,useState} from "react"
import {modelCallServerHook, GraphObjectProvider, ViewBuilder} from "@terminusdb-live/tdb-react-components"
import {Tabs, Tab,Alert} from "react-bootstrap"
import {SCHEMA_MODEL_VIEW, DOCUMENT_TAB, GRAPH_TAB, JSON_TAB} from "./constants"
import {WOQLClientObj} from '../init-woql-client'
import {Loading} from "../components/Loading" 
import {PROGRESS_BAR_COMPONENT}  from "../components/constants"
import {JSONModelBuilder} from "../components/JSONModelBuilder" 
import {ErrorMessageReport} from "../components/ErrorMessageReport"
import Nav from 'react-bootstrap/Nav';
import { MODEL_BUILDER_NAV } from "../components/constants"
import { ModelBuilderTabs } from "./ModelBuilderTabs"

export const ModelBuilder = (props) =>{
	const {woqlClient,branch,ref,accessControlDashboard, currentChangeRequest} = WOQLClientObj()
	if(!woqlClient) return ""
	const dataProduct = woqlClient.db()

	const [width, setWidth] = useState("")
	const [schemaView, setSchemaView] = useState(SCHEMA_MODEL_VIEW)

	
	

	

	const {mainGraphDataProvider,
			saveGraphChanges,
			reportMessage,
			setReport,
			callServerLoading,
	} = modelCallServerHook(woqlClient, branch, ref,dataProduct)

	
	if(!dataProduct) return <div>error in loading graph</div>

	return <React.Fragment>
		{reportMessage && <ErrorMessageReport error={reportMessage} setError={setReport}/>}


		{dataProduct &&  
			<GraphObjectProvider currentChangeRequest={currentChangeRequest} setError={setReport} 
				mainGraphDataProvider={mainGraphDataProvider} dbName={dataProduct}>
					<ModelBuilderTabs/>
			</GraphObjectProvider>
		}
	</React.Fragment>
}