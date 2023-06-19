import React, {useEffect} from "react"
import {ProSidebar, Menu, SidebarContent} from 'react-pro-sidebar'
import { GraphObjectProvider, modelCallServerHook } from "@terminusdb-live/tdb-react-components"
//import 'react-pro-sidebar/dist/css/styles.css'
import {WOQLClientObj} from '../init-woql-client'
import {PRODUCT_EXPLORER, DOCUMENT_EXPLORER, PRODUCT_MODELS} from "../routing/constants"
import {DataProductItems} from "../components/DatabaseList"
//import {ConnectedDataProduct} from "../components/CurrentDataProductState"
import {DataProductDocuments, DocumentExplorerDocuments} from "../components/DataProductDocuments"
import { CollpaseButton } from "../components/CollapseButton"
import { ModelBuilderDocuments } from "../components/ModelBuilderDocuments"

export const LeftSideBar = (props) => { 
    const { 
        getLocation,
        collapseSideBar,
        setCollapseSideBar,
        woqlClient,
        branch,
        ref,
        currentChangeRequest
    } = WOQLClientObj()

	if(!woqlClient) return ""


    const { mainGraphDataProvider, setReport } = modelCallServerHook(woqlClient, branch, ref,dataProduct)


    const { page, dataProduct } = getLocation()


    function getSideNavClassName(collapseSideBar) {
        if(collapseSideBar) return `hide__sideNav`
        return ``
    }

    return <div className="d-flex">
        <div className={`${getSideNavClassName(collapseSideBar)}`}>
        
            <ProSidebar>
                <SidebarContent>
                    <Menu> 
                        <DataProductItems/>
                        {/*dataProduct && <ConnectedDataProduct/>*/}
                        {dataProduct && page===PRODUCT_MODELS  &&  
			                <GraphObjectProvider currentChangeRequest={currentChangeRequest} 
                                setError={setReport} 
				                mainGraphDataProvider={mainGraphDataProvider} dbName={dataProduct}>
					            <ModelBuilderDocuments/>
			                </GraphObjectProvider>
		                }
                        {dataProduct && page===DOCUMENT_EXPLORER && <DocumentExplorerDocuments/>}
                        {dataProduct && page===PRODUCT_EXPLORER && <DataProductDocuments/>}
                        {/* dataProduct && getLocation()==PRODUCT_EXPLORER && <SampleQueries/> */}
                    </Menu>
                </SidebarContent>
            </ProSidebar>
            
        </div>
        <CollpaseButton setCollapseSideBar={setCollapseSideBar} collapseSideBar={collapseSideBar}/>
    </div>
}
