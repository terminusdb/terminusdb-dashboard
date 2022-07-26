import React from "react"
import {QueryPane} from "./QueryPane"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {NEW_PANE_CONFIG} from "./constants"
import {QueryPaneObj} from "../hooks/queryPaneContext"
import {Row} from "react-bootstrap"

export const QueryView = (props) => {
    const {queryPaneList, addQueryPane} = QueryPaneObj()
    
    // when I do add panel I have to render all the element 
    const QueryPaneBox = (props) => {
        return (
            <div id={props.id}>
                <TDBReactButton config={NEW_PANE_CONFIG} 
                    onClick={() => {addQueryPane()}} 
                />
               
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
                <Row className="mt-5 w-100 justify-content-md-center">
                    <NewQueryPane />
                </Row>
            </React.Fragment>
            )
}