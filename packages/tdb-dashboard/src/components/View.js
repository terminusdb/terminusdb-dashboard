import React, {useState, useEffect} from "react"
import {QueryPane} from "./QueryPane"
import {NEW_PANE_CONFIG} from "./constants"
import {QueryPaneObj} from "../hooks/queryPaneContext"
import { Button, NavItem } from "react-bootstrap"
export const View = (props) => {
    const {queryPaneList,addQueryPane} = QueryPaneObj()

    const QueryPaneBox = (props) => {
        return (
            <div id={props.id}>
                <Button {...NEW_PANE_CONFIG} 
                    onClick={() => {addQueryPane()}} 
                >
                   {NEW_PANE_CONFIG.icon} {NEW_PANE_CONFIG.label} 
                </Button>
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

