import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {MenuItem, SubMenu} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css' 
import {QueryPaneObj} from "../hooks/QueryPanelContext"
import {getPropertyRelation} from '../queries/GeneralQueries'
import {Button, Badge, ButtonGroup} from "react-bootstrap"
import {BiPlus} from "react-icons/bi"
import {SearchBox} from "./SearchBox"
import {useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"
import {Loading} from "./Loading"
import {NEW_DOC} from "../routing/constants"
import { NEW_DOCUMENT_BUTTON_ID } from "../cypress.constants"
import {useParams, useNavigate} from "react-router-dom"
import { ModelBuilderViewControl } from "../pages/ModelBuilder"
import {SCHEMA_MODEL_VIEW, DOCUMENT_TAB, GRAPH_TAB, JSON_TAB, DIAGRAM_TAB} from "../pages/constants"

export const ProductModelView = () => {
    const {dataProduct} = useParams()
    const {
        woqlClient, 
        saveSidebarState,
        sidebarStateObj,
    } = WOQLClientObj()

    if(!woqlClient) return ""

    return <SubMenu title={"Product Model Views"}  
        className="menu-title"
        defaultOpen={sidebarStateObj.sidebarSampleQueriesState}
        onOpenChange={(e) => saveSidebarState("sidebarSampleQueriesState", e)}>
        <label className="m-2 small fst-italic fw-bold text-muted">You can change view to build model using the buttons below</label>
       <ModelBuilderViewControl /> 
    </SubMenu>
    

   
} 
