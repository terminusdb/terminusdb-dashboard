
import React, {useState, useEffect} from "react"
import {ListGroup, Container, Card, Row, Col, Button, Stack} from "react-bootstrap"
import {BiPlus, BiNetworkChart} from "react-icons/bi"
import {WOQLClientObj} from '../init-woql-client'
import 'react-accessible-accordion/dist/fancy-example.css'
import {IconBarConfig} from "./constants"
import {Nav} from "react-bootstrap"
import {NavLink as RouterNavLink , useParams, useNavigate} from "react-router-dom"
import {Loading} from "../components/Loading"
import {DocumentControlObj} from "../hooks/DocumentControlContext"

export const DocumentSummary = () => {
    const {dataProduct,organization} = useParams()
    const navigate = useNavigate() 
    const {perDocumentCount,
        totalDocumentCount, 
        loading:documentLoading,
        error}=DocumentControlObj()


    const getUrl = (pageName)=> {
        return  `/${organization}/${dataProduct}/${pageName}`
    }

    function handleCardClick (doc) {
        navigate(doc) 
    }

    const DocumentStats = ({dataProvider}) => {
        let arr=[]
        for (var key in dataProvider[0]) {
            let val = dataProvider[0][key]["@value"]
            let type=key
            arr.push(
                <Col key = {key +"___doc_status"} md={4} className="py-2 doc-summary-card">
                    <Button id={type} className="bg-transparent border-0 p-0 w-100" onClick={(e) => handleCardClick(type)}>
                        <Card bg="dark" style={{maxHeight: "220px", cursor: "pointer"}} >
                            <Card.Header className="bg-transparent border-0 d-flex text-wrap">
                                <div>
                                    <div className="hstack gap-3 minBreakpoint-xs">
                                        <h6 className="fw-bold text-muted text-left">{key}</h6>
                                        <h6 className="text-muted ms-auto text-right">{val}/{totalDocumentCount}</h6>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Row className="ml-3">
                                    <h1>{val}</h1>
                                </Row>
                            </Card.Body>
                            {<Card.Footer className="d-flex">
                                {/*<small className="text-muted col-md-10">{`Number of ${type} ${val}`}</small>*/}
                                <small className="text-muted">{`Total ${totalDocumentCount}`}</small>
                            </Card.Footer>}
                        </Card>
                    </Button>
                </Col>
            )
        }
        return arr
    }

    if(documentLoading) return  <Loading message={`Fetching documents ...`}/>

    return  <main className="content  ml-5 w-100">
        <Container>
            {error && <div className="text-danger" > {error}</div>}
            <Row>
                {perDocumentCount && <DocumentStats dataProvider={perDocumentCount}/>}
                {!perDocumentCount && <Col xs={11} className="d-block ml-5 mr-3">
                    <div className="card card-fil m-3">
                        <div className="card-body w-100 text-center">
                            <h4 className="text-muted mt-3 mb-5">{`No document classes created yet...`}</h4>
                            <Nav.Item className="mb-4">
                                <Nav.Link  as={RouterNavLink}
                                    title={IconBarConfig.dataProductModal.title}
                                    className="btn btn-lg btn-info p-2 d-inline text-white"
                                    to={getUrl(IconBarConfig.dataProductModal.path)}
                                    
                                   // onClick={(e) => setRoute(IconBarConfig.dataProductModal.path)}
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
