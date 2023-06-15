import React, {useEffect, useState} from "react";
import {Container , Card, Button, ListGroup,Badge} from "react-bootstrap"
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {WOQLClientObj} from '../init-woql-client'
import {ChangeRequest} from "../hooks/ChangeRequest"
import {BiGitPullRequest} from "react-icons/bi"
import Stack from 'react-bootstrap/Stack'
import {Loading} from "../components/Loading" 
import {AiOutlineCheck} from "react-icons/ai"
import ProgressBar from 'react-bootstrap/ProgressBar'
import {extractID, getDays} from "../components/utils"
import { Layout } from "./Layout";
import { useOpenAI } from "../hooks/useOpenAI";
import {AiFillCheckCircle, AiFillCloseCircle, AiFillClockCircle} from "react-icons/ai"
import {ImSpinner5} from "react-icons/im"

export const IndexingActionMonitor=({dataProduct})=>{

    const {loading,error,getSearchableCommit,searchableCommit} = useOpenAI()

    useEffect(()=>{

        getSearchableCommit(10)  

    },[dataProduct])

    const formatListItem=()=>{
        if(searchableCommit.lenght === 0) return <ListGroup.Item  className="d-flex justify-content-between align-items-start">
            No running actions 
        </ListGroup.Item>
        let display= searchableCommit.map((item,index)=>{
			//statusCount+=1
			return  <ItemElement  key={`item___${index}`} item={item}/>
        })
		return display
    }

	return <Layout>  
            <div className="content mr-3 ml-5">  
                <div className="mt-5 mb-5 mr-5">
                    <Card>
                        <Card.Header>
                            Indexing Actions
                        </Card.Header>
                        <Card.Body className="p-0">
                            <ListGroup as="ol" key={"ListGroup"}> 
                                {loading && <Loading message={`Fetching Change Requests ...`}/>}
                                {searchableCommit && formatListItem()}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Layout>
}

const endStatus = {"Assigned":true, "Error":true}

function ItemElement ({item}){
    const startstatus = extractID(item.indexing_status || "")
    const index = extractID(item.index || "")
    const [status , setStatus] = useState(startstatus)
    const {pollingCall} = useOpenAI()

    const updateStatus = (doc) =>{
        item.indexing_status = `@schema:Indexing_Status/${doc.indexing_status}`
        setStatus(doc.indexing_status)
    }
    useEffect(()=>{
        if(!endStatus[startstatus]){
            pollingCall(index, updateStatus)
        }
    },[item.index])

    const iconTypes = {'Assigned':<AiFillCheckCircle className="text-success" size="20px"/>,
                       'Progress':<ImSpinner5 className="text-warning loading-icon" size="20px"/>,
                       'Error':<AiFillCloseCircle className="text-danger" size="20px"/>,
                       'Complete':<AiFillClockCircle className="text-success" size="20px"/>}

    const name  = item.name ? item.name['@value'] : ''
    
           //"@schema:Indexing_Status/Progress" 
    const message  = "no message" //item.messages[0].text || '' //item[tracking_branch]
		return  <ListGroup.Item  className="d-flex justify-content-between align-items-start">
					{iconTypes[status]}
					<div className="ms-2 me-auto">
						<div className="fw-bold text-success">
							Change request 
							<span class="text-dark ml-1 badge bg-light mr-1">{name || item.tracking_branch["@value"]}</span>
						 		from branch 
							<span class="text-dark ml-1 badge bg-success">{item.branch["@value"]}</span>
						
						</div>					
						<small className="text-light text-small fw-bold">
							runned {getDays(item.time["@value"])} days ago 
						</small>
                       
					</div>
                    {status=== "Assigned" && <span class="text-dark ml-1 badge bg-light mr-1">{item.searchable_commit["@value"]}</span>}
		    </ListGroup.Item>
}