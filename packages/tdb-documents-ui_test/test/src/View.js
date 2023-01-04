import React from "react"
import {Controllers} from "./Controllers"
import Container from 'react-bootstrap/Container'
import {Output} from "./Output"
import {Row, Col} from "react-bootstrap"

export const View = () => {
    return <React.Fragment>
        <br/><br/>
        <Container className="mt-5">
            <Row className="w-100">
                <Col md={6}>
                    <Controllers/>
                </Col>
                <Col lg={true} md={6}>
                    <Output/>
                </Col>
            </Row>
        </Container> 
    </React.Fragment>
}
