import React from "react"
import { ModelBuilder } from "./ModelBuilder"
import { Layout } from "./Layout"
import { modelCallServerHook, GraphObjectProvider } from "@terminusdb-live/tdb-react-components"
import { WOQLClientObj } from '../init-woql-client'

export const ModelProductPage = () => {

	const {woqlClient,branch,ref,accessControlDashboard, currentChangeRequest} = WOQLClientObj()
	if(!woqlClient) return ""
	const dataProduct = woqlClient.db()

	const {
		mainGraphDataProvider,
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
					<Layout showLeftSideBar={true}>
						<main className="content mr-3 ml-5">
							<ModelBuilder/>
						</main> 
					</Layout> 
			</GraphObjectProvider>
		}
	</React.Fragment>
     
}