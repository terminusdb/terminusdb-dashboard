import React, {useState, useEffect} from 'react'
import {Button} from "react-bootstrap"
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
import {ChangeRequest} from "../hooks/ChangeRequest"
import {Loading} from "../components/Loading"
import Alert from 'react-bootstrap/Alert'
import { ChangeDiffComponent } from '../components/ChangeDiffComponent'
import {
    DIFFS, 
    MERGED, 
    MESSAGES, 
    TRACKING_BRANCH
} from "../components/constants"
import {Messages} from "../components/Messages"
import {ReviewComponent} from "../components/ReviewComponent"



export const ChangeDiff = () => { 
    const {id} = useParams()
    const {
        woqlClient:client,
        currentCRObject,
        setCurrentCRObject
    } = WOQLClientObj() 

    const {
        getChangeRequestByID,
        rebaseChangeRequestBranch,
        loading,
        error
    } = ChangeRequest()
    
    const rebaseHandler = async ()=>{
        const changeRequestDoc = await rebaseChangeRequestBranch(id)
        if(changeRequestDoc){
            setCurrentCRObject(changeRequestDoc)
        }
    }

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
               {currentCRObject.needRebase && currentCRObject.status !== "Merged" && <div>
                <Button onClick={rebaseHandler}>Rebase</Button></div>}
               {(currentCRObject.needRebase === false || currentCRObject.status === "Merged") && <ChangeDiffComponent/>}
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
