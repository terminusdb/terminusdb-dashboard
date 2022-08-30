import React from "react"
import {Controllers} from "./Controllers"
import {ModeBar} from "./ModeBar"
import Container from 'react-bootstrap/Container'
import {Output} from "./Output"
import {Row, Col} from "react-bootstrap"
import {MoreInfo} from "./MoreInfoCanvas"
import {InfoMessage} from "./InfoMessage"

export const View = () => {
    return <React.Fragment>
        <br/><br/>
        <Container className="mt-5 mb-5">
            <ModeBar/>
            <InfoMessage/>
            <Row className="w-100">
                <Col md={6}>
                    <Controllers/>
                </Col>
                <Col lg={true} md={6}>
                    <Output/>
                </Col>
            </Row>
            <MoreInfo/>
        </Container> 
    </React.Fragment>
}
