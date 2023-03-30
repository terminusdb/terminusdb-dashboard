
import React from "react"
import {Container, Card, Row, Col, Button} from "react-bootstrap"
//import 'react-accessible-accordion/dist/fancy-example.css'

export const DocumentSummary = ({Children,totalDocumentCount,perDocumentCount,documentClasses,onClick}) => {

    const DocumentStats = ({dataProvider}) => {
        const dataKey = Object.keys(dataProvider)
        return dataKey.map((type)=>{
            const val = dataProvider[type]["@value"]

            return <Col key = {type +"___doc_status"} md={4} className="py-2 doc-summary-card">
                    <Button id={type} className="bg-transparent border-0 p-0 w-100" onClick={(e) => onClick(type)}>
                        <Card bg="dark" style={{maxHeight: "220px", cursor: "pointer"}} >
                            <Card.Header className="bg-transparent border-0 d-flex text-wrap">
                                <div>
                                    <div className="hstack gap-3 minBreakpoint-xs">
                                        <h6 className="fw-bold text-muted text-left">{type}</h6>
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
        })
    }

    return  <main className="content  ml-5 w-100">
        <Container>
            <Row>
                {perDocumentCount && typeof perDocumentCount === "object" 
                    &&<DocumentStats dataProvider={perDocumentCount}/>
                }
                 {Array.isArray(documentClasses) &&  documentClasses.length===0  &&
                    <Col xs={11} className="d-block ml-5 mr-3">
                    <div className="card card-fil m-3">
                        <div className="card-body w-100 text-center">
                            <h4 className="text-muted mt-3 mb-5">{`No document classes created yet...`}</h4>
                            <Children/>
                        </div>
                    </div>
                </Col>}
            </Row>
        </Container>
    </main>

}
