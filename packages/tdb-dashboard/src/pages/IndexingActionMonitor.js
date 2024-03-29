import React, {useEffect, useState} from "react";
import {Container , Card, Button, ListGroup,Badge} from "react-bootstrap"
import {Loading} from "../components/Loading" 
import {extractID, getDays} from "../components/utils"
import { Layout } from "./Layout";
import Stack from "react-bootstrap/Stack"
import { useOpenAI } from "../hooks/useOpenAI";
import {AiFillCheckCircle, AiFillCloseCircle, AiFillClockCircle,AiOutlineClose} from "react-icons/ai"
import {ImSpinner5} from "react-icons/im"
import { useParams,NavLink } from "react-router-dom";
import { DisplayNoIndexingAction } from "../components/DisplayNoIndexingAction"
import { formatError } from "./utils";

export const IndexingActionMonitor=(props)=>{

    const {loading,error,getSearchableCommit,searchableCommit} = useOpenAI()
    const {dataProduct} = useParams()
    useEffect(()=>{
        getSearchableCommit(10)  
    },[dataProduct])


    const formatListItem=()=>{
        let display= searchableCommit.map((item,index)=>{
			//statusCount+=1
			return  <ItemElement  key={`item___${index}`} item={item}/>
        })
		return display
    }

	return <Layout>  
            <div className="content mr-3 ml-5">  
                <div className="mb-5">
                    {loading && <Loading message={`Fetching Indexing Actions ...`}/>}
                    {searchableCommit.length>0 && <Card>
                        <Card.Header>
                            Indexing Actions
                        </Card.Header>
                        <Card.Body className="p-0">
                            <ListGroup as="ol" key={"ListGroup"}> 
                                
                                {searchableCommit && formatListItem()}
                            </ListGroup>
                        </Card.Body>
                    </Card>}
                    {!loading && !searchableCommit && <DisplayNoIndexingAction helpDescription={`You need to index your data before any index actions appear on this page`}/>}

                </div>
            </div>
        </Layout>
}

const endStatus = {"Assigned":true, "Error":true}

function ItemElement ({item}){
    let { organization,dataProduct } = useParams()
    const startstatus = extractID(item.indexing_status || "")
    const index = extractID(item.index || "")
    const [status , setStatus] = useState(startstatus)
    const {pollingCall,updateIndexStatus} = useOpenAI()


    const changeStatusHandler = async (status)=>{
        setStatus("Progress")
        const result = await updateIndexStatus(index,status)
        if(status === "Sent"){
            pollingCall(index, updateStatus)
        }else{
            updateStatus(result)
        }
    }

    const updateStatus = (doc) =>{
        if(!doc)return 
        item.indexing_status = `@schema:Indexing_Status/${doc.indexing_status}`
        if(doc.error_message){
            item.error_message = {"@type":"xsd:string","@value":doc.error_message}
        }
        if(doc.indexed_documents){
            item.indexed_documents = {"@type":"xsd:string","@value":doc.indexed_documents}
        }
        setStatus(doc.indexing_status)
    }
    useEffect(()=>{
        if(!endStatus[startstatus]){
            pollingCall(index, updateStatus)
        }
    },[item.index])

    const iconTypes = {'Assigned':<AiFillCheckCircle className="text-green" size="20px" style={{minWidth: "20px"}}/>,
                       'Progress':<ImSpinner5 className="text-warning loading-icon" size="20px" style={{minWidth: "20px"}}/>,
                       'Error':<AiFillCloseCircle className="text-danger" size="20px" style={{minWidth: "20px"}}/>,
                       'Close':<AiOutlineClose className="text-danger" size="20px" style={{minWidth: "20px"}}/>,
                       'Complete':<AiFillClockCircle className="text-warning loading-icon" size="20px" style={{minWidth: "20px"}}/>}

                       
    const name  = item.name ? item.name['@value'] : ''
    
    const documentIndexed =(num)=>{
        const message =  `${num} Documents have been indexed` 
        let extraInfo = "" 
        if(num === 0){
            extraInfo =<>
            <div>If not already configured, Go to <NavLink to={`/${organization}/${dataProduct}/openai_configuration`} className={"mr-1"}>Open AI configuration </NavLink> page
            and add a GraphQL query and a Handlebars template for each document you would like to index.</div></>
        }

        return <><div>{message}</div>{extraInfo}</>
						
    }
    
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
                        {status === "Error" && item.error_message && 
                        <div className="text-small fw-bold">Error: {formatError(item.error_message["@value"],organization,dataProduct)}</div>}

                        {(status === "Complete" || status=== "Assigned") && item.indexed_documents && documentIndexed(item.indexed_documents["@value"])}

                       <small className="text-light text-small fw-bold">
							ran {getDays(item.time["@value"])} days ago 
						</small>
                       
                       
					</div>
                    {status === "Close" &&  <small className="text-light text-small fw-bold">
							 This indexing has been stopped
						</small>}
                    {status === "Progress" &&  
                        <Button variant="dark" onClick={(e) => changeStatusHandler("Close")} className="bg-warning text-dark mr-4">   
                            <small className="text-gray fw-bold">
                                <span >Stop</span>
                            </small>
                        </Button>
                    }
                    {(status=== "Assigned" || status=== "Error") &&
                    <Stack direction="horizontal" gap={3}>
                        {status=== "Assigned" && 
                        <span class="text-dark ml-1 badge bg-light mr-1">{item.searchable_commit["@value"]}</span>}
                       
                        <Button variant="dark" onClick={(e) => changeStatusHandler("Sent")} className="bg-success text-dark mr-4">   
                            <small className="text-gray fw-bold">
                                <span >Restart</span>
                            </small>
                        </Button>
                    </Stack>
                    }
		    </ListGroup.Item>
}

