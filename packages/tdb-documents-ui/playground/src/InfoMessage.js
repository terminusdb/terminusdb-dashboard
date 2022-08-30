import React from "react" 
import {InitObj} from "./init"
import Card from 'react-bootstrap/Card'
import {Loading} from "./Loading"
import {Row} from "react-bootstrap"

export const InfoMessage = () => {

    const {
		infoMessage
	} = InitObj()

    if(!infoMessage) return <Loading/>

    return <Row className="w-100 p-2 mb-4">
        <Card bg="secondary">
            <Card.Body>
                <small className="text-light">{infoMessage}</small>
            </Card.Body>
        </Card>
    </Row>
}