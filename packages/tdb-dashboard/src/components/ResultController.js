import React, { useState } from "react"
import {TDBToggleButtonGroup} from './layout/TDBToggleButtonGroup'
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
                <TDBToggleButtonGroup selected={currentView} config={VIEW_SWITCHER_BUTTON_GROUP} onClick={handleClick}/>
                {queryRunTime && <p className="ml-5 mt-1 text-info">{`Query ran in ${queryRunTime}`}</p>}
            </Col>
            
        </Row>
    </React.Fragment>
    
}