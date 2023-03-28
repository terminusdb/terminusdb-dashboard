import React from "react"
import Container from 'react-bootstrap/Container'
import {Output} from "./Output"
import {Row, Col} from "react-bootstrap"
import {Input} from "./Input"
import {Connect} from "./Connect"

export const View = () => {
    return <React.Fragment>
        <br/><br/>
        <div className="mt-2 container-fluid">
            <Row className="w-100">
                <Connect/>
                <Input/>  
                <Col lg={true} md={10}>
                    <Output/>
                </Col>
            </Row>
        </div> 
    </React.Fragment>
}
