import React, {useEffect} from 'react'
import {Button} from "react-bootstrap"
import { Layout } from './Layout'
import Card from "react-bootstrap/Card"
import {useParams} from 'react-router-dom'
import {WOQLClientObj} from "../init-woql-client"
import Stack from 'react-bootstrap/Stack'
import {ChangeRequest} from "../hooks/ChangeRequest"
import {Loading} from "../components/Loading"
import { ChangeDiffComponent, BranchCRMessage } from '../components/ChangeDiffComponent'
import * as CONST from "../components/constants"
import {FiAlertTriangle} from "react-icons/fi"
import Spinner from 'react-bootstrap/Spinner';
import {extractID} from "../components/utils"
import { Alerts } from "../components/Alerts"

const CRAction = ({}) => {
    const {
        currentCRObject,
        setCurrentCRObject
    } = WOQLClientObj() 

    const {
        rebaseChangeRequestBranch,
        loading,
        errorMessage,
        setError
    } = ChangeRequest()

    const rebaseHandler = async ()=>{ 
        const changeRequestDoc = await rebaseChangeRequestBranch(extractID(currentCRObject["@id"]))
        if(changeRequestDoc && setCurrentCRObject){
            setCurrentCRObject(changeRequestDoc)
        }
    }

    // loading while waiting for currentCRObject 
    if(!currentCRObject.hasOwnProperty(CONST.NEED_REBASE)) return <Loading message={`Loading Change Request ...`}/>


    //{currentCRObject.needRebase && currentCRObject.status !== "Merged" && <div>
    if (currentCRObject.needRebase === false || currentCRObject.status === CONST.MERGED) 
        return <ChangeDiffComponent/>

    // if needRebase  
    return <React.Fragment>  
        {errorMessage && <Alerts message={errorMessage} type={CONST.TERMINUS_DANGER} onCancel={setError}/>}
        <Card className="update__change__request__card">
            <Card.Header className="w-100"> 
                {`You are in Change Request `}<BranchCRMessage branch={currentCRObject.tracking_branch} css={"primary"}/>
            </Card.Header>
            <Card.Body>
                <Stack direction="vertical" gap={3}>
                    <div className='d-flex'>
                        <FiAlertTriangle className="text-warning h2 mr-3"/>
                        <h3>This Change Request is out of date</h3>
                    </div>
                    <div className='d-flex'>
                        <h4 className="mr-3">Merge latest changes from </h4>
                        <BranchCRMessage branch={"main"} css={"success"}/>
                        <h4>into this Change Request</h4> 
                    </div>
                </Stack>
            </Card.Body>
            <Button onClick={rebaseHandler}
                className="btn btn-lg bg-light text-dark mb-5">
                    {loading && <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        className="mr-1 mt-1"
                        aria-hidden="true"
                    />}
                    {CONST.UPDATE_BRANCH}
            </Button>
        </Card>
    </React.Fragment>
}


export const ChangeDiff = () => { 
    const {id} = useParams()
    const {
        woqlClient:client,
        setCurrentCRObject,
        currentCRObject
    } = WOQLClientObj() 

    const {
        getChangeRequestByID,
        rebaseChangeRequestBranch,
        loading,
        errorMessage
    } = ChangeRequest()
    
    

    useEffect(() => {
        async function getCRID() {
            const changeRequestDoc = await getChangeRequestByID(id,true)
            if(changeRequestDoc){
                setCurrentCRObject(changeRequestDoc)
            }
        }
        if(id, client) getCRID()
    }, [id, client])
   
    if(!client) return <div/>


    return <Layout>
        <div className='d-flex ml-5 mt-4 mr-5'>
            <div className='w-100'>
                {currentCRObject && <CRAction/>}
            </div>
        </div>         
    </Layout>
}

     /*<small className="fw-bold mr-2 h6">You are in change request mode</small>
                                    <span className="float-right fw-bold mr-2 text-dark badge bg-primary mb-1">
                                        {currentCRObject[TRACKING_BRANCH]}
                                    </span>*/

/**
 * 
                                <Row className="w-100 mt-5">
                                    <Col md={6}>
                                        {result && <DocumentModifiedCount documentModifiedCount={documentModifiedCount}/>}
                                    </Col>
                                    <Col md={6}>
                                        <BranchCRMessage trackingBranch={currentCRObject.tracking_branch} originBranch={"main"}/>
                                    </Col>
                                </Row> 
 */
