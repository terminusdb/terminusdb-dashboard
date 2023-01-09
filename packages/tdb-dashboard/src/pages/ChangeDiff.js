import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Card} from "react-bootstrap"
import { Layout } from './Layout'
import {useParams} from 'react-router-dom'
import {GetDiffList} from "../hooks/DocumentHook"
import {WOQLClientObj} from "../init-woql-client"
import {DiffView} from "../components/DiffView"
import Badge from 'react-bootstrap/Badge'
import {BiGitBranch} from "react-icons/bi"
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Stack from 'react-bootstrap/Stack'
import {status} from "../components/utils"
import {ChangeRequest} from "../hooks/ChangeRequest"
import {
    DIFFS, 
    MESSAGES, 
    TRACKING_BRANCH
} from "../components/constants"
import {Messages} from "../components/Messages"
import {ReviewComponent} from "../components/ReviewComponent"

const DocumentModifiedCount = ({documentModifiedCount}) => { 
    if(documentModifiedCount > 0) return <h6 className="text-muted fw-bold mt-1 mb-3">
        {`${documentModifiedCount} documents changed`}
    </h6>

    return <h6 className="text-muted fw-bold mt-3 mb-3">
        {`No documents changed`}
    </h6>
}

const BranchCRMessage = ({trackingBranch, originBranch}) => {
    return <React.Fragment>
        <Badge bg="success" className="float-right fw-bold mr-2 text-dark">{trackingBranch}</Badge>
        <BiGitBranch className="text-muted float-right mr-2"/>
        <strong className="text-muted fw-bold float-right mr-2">|</strong>
        <Badge bg="danger" className="float-right fw-bold mr-2 text-dark" >{originBranch}</Badge>
        <BiGitBranch className="text-muted float-right mr-2"/>
    </React.Fragment>
}

export const ChangeDiff = () => {

    const {
        woqlClient:client,
        currentCRObject
    } = WOQLClientObj() 

    const {
        getChangeRequestByID,
    } = ChangeRequest()
    const {id} = useParams()

    const [key, setKey] = useState(DIFFS)
    const [action, setAction]=useState(false) 

    useEffect(() => {
        async function getCRID() {
            await getChangeRequestByID(id)
        }
        if(id, client) getCRID()
    }, [id, client])

    //let changeRequestID=localStorage.getItem("TERMINUSCMS_CHANGE_REQUEST_ID")
    const result = GetDiffList(client, id)      
    //const result = GetDiffList(client, currentCRObject["@id"])   

    useEffect(() => {
        if(key === DIFFS) setAction(false)
    }, [key])

    if(!client) return <div/>

    let documentModifiedCount = result ? result.length : 0
 
    return <Layout>
            <br/><br/>
            <div className='d-flex w-100 overflow-auto'>
                <div className='w-100'>
                    <Tabs
                        id="change_request_tabs"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3">
                        <Tab eventKey={DIFFS} title={DIFFS}>
                            <Card bg="transparent" className="border-secondary mt-5 mb-5">
                                <Card.Header>
                                    <Stack direction="horizontal" gap={2} className="mt-1">
                                        <h6 className='text-gray fw-bold'>You are in Change Request</h6>
                                        <span className="float-right fw-bold mr-2 text-dark badge bg-success mb-1">{currentCRObject[TRACKING_BRANCH]}</span>
                                        <div className="ms-auto">{status[currentCRObject.status]}</div>
                                    </Stack>
                                </Card.Header>
                                <Card.Body> 
                                    <ReviewComponent setKey={setKey} action={action} setAction={setAction}/> 
                                    <Row className="w-100 mt-5">
                                        <Col md={6}>
                                            {result && <DocumentModifiedCount documentModifiedCount={documentModifiedCount}/>}
                                        </Col>
                                        <Col md={6}>
                                            <BranchCRMessage trackingBranch={currentCRObject.tracking_branch} originBranch={"main"}/>
                                        </Col>
                                    </Row> 
                                    <DiffView diffs={result} CRObject={currentCRObject}/> 
                                </Card.Body> 
                            </Card>
                        </Tab>
                        <Tab eventKey={MESSAGES} title={MESSAGES}>
                            <Messages/>
                        </Tab>
                    </Tabs>
                </div>
            </div>         
    </Layout>
}
