import React from "react"
import {Row, Col, Card} from "react-bootstrap"

export const Loading = (props) => {

    return <Row className="mr-5 ml-2">
        <Col>
            <Card className="shadow-sm m-4">
                <div>LOADING .......</div>
            </Card>
        </Col>
        </Row>
}