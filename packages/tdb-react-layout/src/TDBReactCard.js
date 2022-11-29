import React from "react"
import {CardWidget} from "./Card"
import {Col} from 'react-bootstrap';

export const TDBReactCard = (props) =>{
    const config=props.config || {}

    return  <Col className={"flex-grow-1 mr-1"}>
        <CardWidget config={config} dataProvider={props.dataProvider}/>
    </Col>
}
