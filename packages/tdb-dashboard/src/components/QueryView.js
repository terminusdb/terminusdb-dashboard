import React from "react"
import {QueryPane} from "./QueryPane"
import {NEW_PANE_CONFIG} from "./constants"
import {QueryPaneObj} from "../hooks/QueryPanelContext"
import {Button, Row} from "react-bootstrap"

export const QueryView = (props) => {
    const {queryPaneList, addQueryPane} = QueryPaneObj()
    
    // when I do add panel I have to render all the element 
    const QueryPaneBox = (props) => {
        return (
            <div id={props.id}>
                <Button {...NEW_PANE_CONFIG} data-cy={NEW_PANE_CONFIG.label} onClick={() => {addQueryPane()}} >
                    <i className={NEW_PANE_CONFIG.icon}/>
                    <span className="ml-1">{NEW_PANE_CONFIG.label}</span></Button>
               
                <QueryPane queryObj={props.queryObj}/>                
          </div>
        )
    }

    //maybe we can have multi dataproduct name
    //for now i get it from the actual selected
    const NewQueryPane = (props) => {
        const  paneList=[]
        let num = 1; 
        const queryPaneListKeys = queryPaneList ? Object.values(queryPaneList)  : []
        queryPaneListKeys.forEach(function(item) {
            const key = item.id
            paneList.push(<QueryPaneBox key={`panel_${key}`} queryObj={item} 
                name={`Query Pane ${num++}`}/>)

        })
        return paneList       
     }

    return (<React.Fragment>
                <Row className="w-100 justify-content-md-center">
                    <NewQueryPane />
                </Row>
            </React.Fragment>
            )
}