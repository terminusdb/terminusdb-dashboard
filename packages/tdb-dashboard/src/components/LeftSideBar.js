import React, {useEffect} from "react"
import {ProSidebar, Menu, SidebarContent} from 'react-pro-sidebar'
//import 'react-pro-sidebar/dist/css/styles.css'
import {WOQLClientObj} from '../init-woql-client'
import {PRODUCT_EXPLORER, DOCUMENT_EXPLORER, PRODUCT_MODELS} from "../routing/constants"
import {DataProductItems} from "../components/DatabaseList"
//import {ConnectedDataProduct} from "../components/CurrentDataProductState"
import {DataProductDocuments, DocumentExplorerDocuments} from "../components/DataProductDocuments"
import { CollpaseButton } from "../components/CollapseButton"
import { ProductModelView } from "../components/ProductModelView"

export const LeftSideBar = (props) => { 
    const { 
        getLocation,
        collapseSideBar,
        setCollapseSideBar
    } = WOQLClientObj()


    const {page,dataProduct} = getLocation()


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
                        {dataProduct && page==DOCUMENT_EXPLORER && <DocumentExplorerDocuments/>}
                        {dataProduct && page==PRODUCT_EXPLORER && <DataProductDocuments/>}
                        {dataProduct && page==PRODUCT_MODELS && <ProductModelView/>}
                        {/* dataProduct && getLocation()==PRODUCT_EXPLORER && <SampleQueries/> */}
                    </Menu>
                </SidebarContent>
            </ProSidebar>
            
        </div>
        <CollpaseButton setCollapseSideBar={setCollapseSideBar} collapseSideBar={collapseSideBar}/>
    </div>
}
