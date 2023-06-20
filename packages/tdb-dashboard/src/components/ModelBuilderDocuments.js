import React,{useEffect,useState} from "react"
import {modelCallServerHook, SchemaBuilderList} from "@terminusdb-live/tdb-react-components"
import {Tabs, Tab,Stack, Container, Button} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {Loading} from "../components/Loading" 
import {PROGRESS_BAR_COMPONENT}  from "../components/constants"
import {JSONModelBuilder} from "../components/JSONModelBuilder" 
import {ErrorMessageReport} from "../components/ErrorMessageReport"
import Nav from 'react-bootstrap/Nav';
import { MODEL_BUILDER_NAV } from "../components/constants"
import { MenuItem, SubMenu } from 'react-pro-sidebar'


export const ModelBuilderDocuments = () => {

  const { woqlClient, branch, ref, sidebarStateObj, saveSidebarState } = WOQLClientObj()
	if(!woqlClient) return ""
	const dataProduct = woqlClient.db()
	const { callServerLoading, saveGraphChanges } = modelCallServerHook(woqlClient, branch, ref,dataProduct)



  const saveData=async (jsonObj, commitMessage)=>{
    await saveGraphChanges(jsonObj, commitMessage)
  }

	return  <SubMenu title={"Schema Model"}
		className="menu-title"
		defaultOpen={sidebarStateObj.sidebarDocumentListState}
		onOpenChange={(e) => saveSidebarState("sidebarDocumentListState",e)}>
		 
		{!callServerLoading && 
			<SchemaBuilderList saveData={saveData}
				dbName={dataProduct} 
				custom={true}/>}
	</SubMenu>

}