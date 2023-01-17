import React, {useEffect, useState} from "react";
import {Container , Card, Button, ListGroup,Badge} from "react-bootstrap"
import {useNavigate, useParams} from "react-router-dom";
import {WOQLClientObj} from '../init-woql-client'
import {ChangeRequest} from "../hooks/ChangeRequest"
import {BiGitPullRequest} from "react-icons/bi"
import Stack from 'react-bootstrap/Stack'
import {Loading} from "../components/Loading" 
import {
	OPEN,
	REJECTED,
	MERGED, 
	SUBMITTED
} from "../components/constants"
import ProgressBar from 'react-bootstrap/ProgressBar'
import {extractID, status, iconTypes, getDays} from "../components/utils"
import { Layout } from "./Layout";

const GetChangeRequestSummary = ({changeRequestList}) => {
	if(!changeRequestList) return <div/>
	let openCRCount=0
	changeRequestList.map(crs => {
		if(crs.hasOwnProperty("status") && crs["status"] === OPEN) openCRCount+=1
	})
	return <h6 className="text-muted fw-bold">
		<BiGitPullRequest className="mr-2 mb-1"/>
		{`${openCRCount} Open`}
	</h6>
}

export const ChangeRequests = () => {
	const {dataProduct} = useParams()
	const navigate = useNavigate() 
    const {
		woqlClient,
        setCurrentCRObject,
		setCurrentChangeRequest,
		setChangeRequestBranch
	} = WOQLClientObj()
    
    const {
		loading,
		getChangeRequestList,
		changeRequestList
    } =  ChangeRequest() 

	const [refresh, setRefersh]=useState(Date.now())
	const [filter, setFilter]=useState(false)
  
    useEffect(() => { 
        if(woqlClient) getChangeRequestList()
    }, [woqlClient, dataProduct])

    const goToDiffPage = (changeRequestObject) => {  
		setCurrentCRObject(changeRequestObject)
		let id=extractID(changeRequestObject["@id"]) 
        setCurrentChangeRequest(id)
		navigate(`${id}`) 
    }
	
  
    const countType = {[OPEN] : 0 , [SUBMITTED]:0, [REJECTED]:0, [MERGED]:0 }

    const getHeader = () =>{
      	changeRequestList.forEach(item=> {
        	countType[item.status] = countType[item.status]+1
    	})

		function displayCRs (status) {
			setFilter(status)
		}

		return  <React.Fragment>
			<Stack direction="horizontal" gap={3}>
				<Button variant="dark" onClick={(e) => displayCRs(OPEN)} className="btn bg-transparent border-0 text-gray">
					<small className="text-gray fw-bold">
						{iconTypes[OPEN]} 
						<span className="mr-5">{countType[OPEN]} {OPEN}</span> 
					</small>  
				</Button>  
				<Button variant="dark" onClick={(e) => displayCRs(SUBMITTED)} className="btn bg-transparent border-0 text-gray">       
					<small className="text-gray fw-bold">
						{iconTypes[SUBMITTED]} 
						<span className="mr-5" >{countType[SUBMITTED]} {SUBMITTED}</span> 
					</small>
				</Button>  
				<Button variant="dark" onClick={(e) => displayCRs(MERGED)} className="btn bg-transparent border-0 text-gray">   
					<small className="text-gray fw-bold">
						{iconTypes[MERGED]} 
						<span className="mr-5">{countType[MERGED]} {MERGED}</span> 
					</small>
				</Button>  
				<Button variant="dark" onClick={(e) => displayCRs(REJECTED)} className="btn bg-transparent border-0 text-gray">   
					<small className="text-gray fw-bold">
						{iconTypes[REJECTED]} 
						<span className="mr-5">{countType[REJECTED]} {REJECTED}</span>
					</small>
				</Button>
			</Stack>
		</React.Fragment>
   }

    const setChangeRequest = (item)=>{
		const id = extractID(item["@id"]) 
		setChangeRequestBranch(item.tracking_branch,id)
		navigate(-1)
	}

    function getActionObject(item){
		const actions = {"Submitted" :  {action:true, onClick:()=>goToDiffPage(item)},
						"Merged" :{action:true, onClick:()=>goToDiffPage(item)},
						"Open" : {action:true, onClick:()=>setChangeRequest(item)}}

		return  actions[item.status] || {}
	}
 
	const formatListItem=()=>{
		if(!changeRequestList) return ""
        return changeRequestList.slice(0).reverse().map((item,index)=>{
			// do not display Merged and Rejected CRs
           // if(item.status === "Merged") return ""
			if(item.status === "Rejected") return ""
            //let actions = (item.status === "Submitted" || item.status === "Merged") ?  {action:true, onClick:()=>goToDiffPage(item)} : {}
             const actions = getActionObject(item) 
			return  <ListGroup.Item {...actions}  key={`item___${index}`}   
                className="d-flex justify-content-between align-items-start">

                {iconTypes[item.status]}
              	<div className="ms-2 me-auto">
					<div className="fw-bold text-gray">
						{item['tracking_branch']}
					</div>
					<small className="text-light text-small fw-bold">
						opened {getDays(item.creation_time)} days ago by {item['creator']}
					</small>
				</div>
              	{status[item.status]}
            </ListGroup.Item>
        })
    }

	const formatFilteredListItem=()=>{
		if(!filter) return ""
        return changeRequestList.slice(0).reverse().map((item, index)=>{

			const actions = (item.status === "Submitted" || item.status === "Merged")?  {action:true, onClick:()=>goToDiffPage(item)} : {}
			if(item.status === filter) {
				return  <ListGroup.Item  
					{...actions} 
					key={`item___${index}`}   
					className="d-flex justify-content-between align-items-start">
						{iconTypes[item.status]}
						<div className="ms-2 me-auto">
							<div className="fw-bold text-gray">
								{item['tracking_branch']}
							</div>
							<small className="text-light text-small fw-bold">
								opened {getDays(item.creation_time)} days ago by {item['creator']}
							</small>
						</div>
						{status[item.status]}
				</ListGroup.Item>
			}
			return <div/>
        })
    }

	return <Layout>
		<div className="content mr-3 ml-5"> 
			<div className="mt-5 mb-5 mr-5">
				<Card>
					<Card.Header>
						{changeRequestList && getHeader()}
					</Card.Header>
					<Card.Body className="p-0">
						<ListGroup as="ol" key={"ListGroup"}> 
							{loading && <Loading message={`Fetching Change Reuqests ...`}/>}
							{changeRequestList && !filter && formatListItem()}
							{changeRequestList && filter && formatFilteredListItem()}
						</ListGroup>
					</Card.Body>
				</Card>
			</div>
		</div>
	</Layout>
}