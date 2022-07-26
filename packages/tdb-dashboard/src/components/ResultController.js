import React, { useState } from "react"
import {TDBReactToggleButtonGroup} from '@terminusdb-live/tdb-react-layout'
import {VIEW_SWITCHER_BUTTON_GROUP, COLLAPSE_BUTTON_GROUP, UNCOLLAPSE_BUTTON_GROUP, GRAPH_VIEW, TABLE_VIEW,
    TABLE_RESULT_CONTROLLER, GRAPH_RESULT_CONTROLLER, JSON_RESULT_CONTROLLER, JSON_VIEW} from "./constants"
import {Row, Col, Toast} from "react-bootstrap"


export const ResultController=({queryRunTime, onClick, currentView}) =>{

    let clickView = onClick
    function handleClick(view){
        if(onClick){
            clickView(view)
        }
    }
  
    
    return  <React.Fragment>
        <Row>
            <Col md={10} className="d-flex">
                <TDBReactToggleButtonGroup selected={currentView} config={VIEW_SWITCHER_BUTTON_GROUP} onClick={handleClick}/>
                {/*(props.currentView==TABLE_VIEW) && 
                    <TDBReactDropDownButtons config={TABLE_RESULT_CONTROLLER}/>
                */}
                {/*(props.currentView==GRAPH_VIEW) && 
                    <TDBReactDropDownButtons config={GRAPH_RESULT_CONTROLLER}/>
                */}
                {queryRunTime && <p className="ml-5 mt-1 text-info">{`Query ran in ${queryRunTime}`}</p>}
            </Col>
            
            {/*<Col md={2} className="d-flex justify-content-end pr-4">
                {props.isExpanded && <TDBReactButton 
                    config={COLLAPSE_BUTTON_GROUP} 
                    onClick={() => props.setExpanded((prevExpanded) => !prevExpanded)}/>}
                
                {!props.isExpanded && <TDBReactButton 
                    config={UNCOLLAPSE_BUTTON_GROUP} 
                    onClick={() => props.setExpanded((prevExpanded) => !prevExpanded)}/>}
            </Col>*/}
        </Row>
    </React.Fragment>
    
}