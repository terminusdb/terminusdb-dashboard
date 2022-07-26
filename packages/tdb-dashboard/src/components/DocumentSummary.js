
import React, {useState, useEffect} from "react"
import {ListGroup, Container, Card, Row, Col, Button} from "react-bootstrap"
import {BiPlus, BiNetworkChart} from "react-icons/bi"
import {WOQLClientObj} from '../init-woql-client'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import {IconBarConfig} from "./constants"
import {handleCreate} from "./documents.utils"
import {Nav} from "react-bootstrap"
import {NavLink as RouterNavLink} from "react-router-dom"
import {DocumentControlObj} from '../hooks/DocumentControlContext'


export const DocumentSummary = () => {

    const {
        perDocumentCount,
        totalDocumentCount,
        setRoute
    } = WOQLClientObj()

    const {
        setDocumentObject,
        documentObject
    } = DocumentControlObj()

    function handleCardClick (doc) {
        let docObj = {
            type: doc,
            action: false,
            view: documentObject.view,
            submit: false,
            currentDocument: false,
            frames: {},
            filledFrame: {},
            message: false,
            loading: false,
            update:false
        }
        setDocumentObject(docObj)
    }

    const DocumentStats = ({dataProvider}) => {

        let arr=[]
        for (var key in dataProvider[0]) {
            let val = dataProvider[0][key]["@value"]
            let type=key
            arr.push(
                <Col md={4} className="py-2 doc-summary-card">
                    <Button id={type} className="bg-transparent border-0 p-0 w-100" onClick={(e) => handleCardClick(type)}>
                        <Card bg="dark" style={{maxHeight: "220px", cursor: "pointer"}} >
                            <Card.Header className="bg-transparent border-0 d-flex text-wrap">
                                <h4 className="col-md-8 text-muted text-left">{key}</h4>
                                <h4 className="text-muted col-md-4 text-right">{val}/{getTotalNumberOfDocuments(totalDocumentCount)}</h4>
                            </Card.Header>
                            <Card.Body>
                                <Row className="ml-3">
                                    <h1>{val}</h1>
                                </Row>
                            </Card.Body>
                            {<Card.Footer className="d-flex">
                                {/*<small className="text-muted col-md-10">{`Number of ${type} ${val}`}</small>*/}
                                <small className="text-muted">{`Total ${getTotalNumberOfDocuments(totalDocumentCount)}`}</small>
                            </Card.Footer>}
                        </Card>
                    </Button>
                </Col>
            )
        }
        return arr
    }

    function getTotalNumberOfDocuments (dataProviderCount) {
        var count =0
        if(!dataProviderCount) return
        for (var key in dataProviderCount[0]) {
            if(key == "Count") {
                count = dataProviderCount[0][key]["@value"]
            }
        }

        return count
    }


    return  <main className="content  ml-5 w-100">
        <Container>
            <Row>
                {perDocumentCount && <DocumentStats dataProvider={perDocumentCount}/>}
                {!perDocumentCount && <Col xs={11} className="d-block ml-5 mr-3">
                    <div className="card card-fil m-3">
                        <div className="card-body w-100 text-center">
                            <h4 className="text-muted mt-3 mb-5">{`No document classes created yet...`}</h4>
                            <Nav.Item className="mb-4">
                                <Nav.Link  as={RouterNavLink}
                                    title={IconBarConfig.dataProductModal.title}
                                    className="btn btn-lg  btn-info d-inline text-white"
                                    to={IconBarConfig.dataProductModal.path}
                                    exact
                                    onClick={(e) => setRoute(IconBarConfig.dataProductModal.path)}
                                    id={IconBarConfig.dataProductModal.key}>
                                        <BiPlus className="mr-1"/>Create a document
                                </Nav.Link>
                            </Nav.Item>
                        </div>
                    </div>
                </Col>}
            </Row>
        </Container>
    </main>

}
