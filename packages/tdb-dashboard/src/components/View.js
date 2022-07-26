import React, {useState, useEffect} from "react"
import {QueryPane} from "./QueryPane"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {NEW_PANE_CONFIG} from "./constants"
import {QueryPaneObj} from "../hooks/queryPaneContext"
import { NavItem } from "react-bootstrap"
export const View = (props) => {
    const {queryPaneList,addQueryPane} = QueryPaneObj()

    const QueryPaneBox = (props) => {
        return (
            <div id={props.id}>
                <TDBReactButton config={NEW_PANE_CONFIG} 
                    onClick={() => {addQueryPane()}} 
                />
                <QueryPane id={props.id} queryObj={props.queryObj} name={props.name}/>                
          </div>
        )
    }

    const NewQueryPane = (props) => {
        const  paneList=[]
         queryPaneList.forEach(function(item, key) {
            paneList.push(<QueryPaneBox key={key} id={key} queryObj={item} name={`Query Pane ${key}`}/>)

        })
        return paneList       
     }

    return (<React.Fragment>
                <NewQueryPane />
            </React.Fragment>
            )
}

