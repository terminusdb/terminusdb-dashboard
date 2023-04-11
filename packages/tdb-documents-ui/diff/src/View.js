import React from "react"
import Container from 'react-bootstrap/Container'
import {Output} from "./Output"
import {Row, Col} from "react-bootstrap"
import {Input} from "./Input"
import {Connect} from "./Connect"

export const View = () => {
    return <React.Fragment>
        <br/><br/>
        <Container fluid className="mt-2 ml-5">
            <Row className="w-100">
                <Connect/>
                <Input/>  
                <Col lg={true} md={10}>
                    <Output/>
                </Col>
            </Row>
        </Container> 
    </React.Fragment>
}
