import React, {useEffect} from "react"
import {ProSidebar, Menu, SidebarContent} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {WOQLClientObj} from '../init-woql-client'
import {PRODUCT_EXPLORER, DOCUMENT_EXPLORER} from "../routing/constants"
import {DataProductItems} from "../components/DatabaseList"
import {ConnectedDataProduct} from "../components/CurrentDataProductState"
import {DataProductDocuments, DocumentExplorerDocuments} from "../components/DataProductDocuments"
import {SampleQueries} from "../components/SampleQueries"

export const LeftSideBar = (props) => { 
    const { 
        getLocation
    } = WOQLClientObj()


    const {page,dataProduct} = getLocation()

    return <ProSidebar>
        <SidebarContent>
            <Menu> 
                <DataProductItems/>
                {dataProduct && <ConnectedDataProduct/>}
                {dataProduct && page==DOCUMENT_EXPLORER && <DocumentExplorerDocuments/>}
                {dataProduct && page==PRODUCT_EXPLORER && <DataProductDocuments/>}
                {/* dataProduct && getLocation()==PRODUCT_EXPLORER && <SampleQueries/> */}
            </Menu>
        </SidebarContent>
    </ProSidebar>
}
