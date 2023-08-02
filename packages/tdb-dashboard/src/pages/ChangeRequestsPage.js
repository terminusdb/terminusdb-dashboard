import React, {useEffect, useState} from "react";
import {Container , Card, Button, ListGroup,Badge} from "react-bootstrap"
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {WOQLClientObj} from '../init-woql-client'
import {ChangeRequest} from "../hooks/ChangeRequest"
import {BiGitPullRequest} from "react-icons/bi"
import Stack from 'react-bootstrap/Stack'
import {Loading} from "../components/Loading" 
import {AiOutlineCheck} from "react-icons/ai"
import {SubmitChangeRequestModal} from "../components/SubmitChangeRequestModal"
import {
	OPEN,
	REJECTED,
	MERGED, 
	SUBMITTED,
	CLOSE
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

export const ChangeRequestsPage = () => {
	const {organization,dataProduct} = useParams()
	let [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate()

	const [updateChangeRequestID,setShowUpdateChangeRequestID] = useState(false)
	const [updateOperation,setUpdateOperation] = useState(SUBMITTED)

	const startStatus = searchParams.get("status") || OPEN

    const {
		woqlClient,
        setCurrentCRObject,
		currentCRObject,
		setChangeRequestBranch,
		exitChangeRequestBranch
	} = WOQLClientObj()
    
    const {
		loading,
		getChangeRequestList,
		changeRequestList
    } =  ChangeRequest() 

	const [filter, setFilter]=useState(startStatus)

	// const [refresh, setRefersh]=useState(Date.now())
	
  
    useEffect(() => { 
        if(woqlClient) getChangeRequestList()
    }, [woqlClient, dataProduct])

    const goToDiffPage = (changeRequestObject) => {  
		//set currentObje for diff
		setCurrentCRObject(changeRequestObject)
		let id=extractID(changeRequestObject["@id"]) 
		navigate(`${id}`) 
    }
	
  
    const countType = {[OPEN] : 0 , [SUBMITTED]:0, [REJECTED]:0, [MERGED]:0, [CLOSE]:0 }
	const activeClassNameType = { 
		[OPEN] : "text-decoration-underline text-light" , 
		[SUBMITTED]: "text-decoration-underline text-warning",  
		[REJECTED]: "text-decoration-underline text-danger", 
		[MERGED]: "text-decoration-underline success__color",
		[CLOSE]: "text-decoration-underline text-danger",
	}

	function getActiveClassName (filter, status) {
		let className = filter === status ? `p-1 rounded ${activeClassNameType[status]}` : ""
		return className
	}


    const getHeader = (filter) =>{
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
						<span className={`${getActiveClassName (filter, OPEN)}`}>{countType[OPEN]} {OPEN}</span> 
					</small>  
				</Button>  
				<Button variant="dark" onClick={(e) => displayCRs(SUBMITTED)} className="btn bg-transparent border-0 text-gray">       
					<small className="text-gray fw-bold">
						{iconTypes[SUBMITTED]} 
						<span className={`${getActiveClassName (filter, SUBMITTED)}`} >{countType[SUBMITTED]} Review</span> 
					</small>
				</Button>  
				<Button variant="dark" onClick={(e) => displayCRs(MERGED)} className="btn bg-transparent border-0 text-gray">   
					<small className="text-gray fw-bold">
						{iconTypes[MERGED]} 
						<span className={`${getActiveClassName (filter, MERGED)}`}>{countType[MERGED]} {MERGED}</span> 
					</small>
				</Button>  
				<Button variant="dark" onClick={(e) => displayCRs(REJECTED)} className="btn bg-transparent border-0 text-gray">   
					<small className="text-gray fw-bold">
						{iconTypes[REJECTED]} 
						<span className={`${getActiveClassName (filter, REJECTED)}`}>{countType[REJECTED]} {REJECTED}</span>
					</small>
				</Button>
				<Button variant="dark" onClick={(e) => displayCRs(CLOSE)} className="btn bg-transparent border-0 text-gray">   
					<small className="text-gray fw-bold">
						{iconTypes[CLOSE]} 
						<span className={`${getActiveClassName (filter, CLOSE)}`}>{countType[CLOSE]} {CLOSE}</span>
					</small>
				</Button>
			</Stack>
		</React.Fragment>
   }

   const updateParent = () =>{
		exitChangeRequestBranch(currentCRObject.original_branch)
		getChangeRequestList()
		setFilter(updateOperation)
	}

    const setChangeRequest = (item)=>{
		const id = extractID(item["@id"]) 
		const name = item.name || item.messages[0].text
		setChangeRequestBranch(item.tracking_branch,id,name)
		navigate(`/${organization}/${dataProduct}`)
	}

	const submitCR = (id)=>{
		setUpdateOperation(SUBMITTED)
		setShowUpdateChangeRequestID(id)
	}

	const closeCR = (id)=>{
		setUpdateOperation(CLOSE)
		setShowUpdateChangeRequestID(id)
	}

	const reopenCR = (id)=>{
		setUpdateOperation(OPEN)
		setShowUpdateChangeRequestID(id)
	}

	function buttonstatus (item, actions) {
		const id = extractID(item["@id"]) 
		switch (item.status) {
			case OPEN :
				return <React.Fragment>
						<Button className='btn btn-light btn-sm text-dark mr-4' 
							title = "Keep Editing in this Change Request"
							onClick={()=>setChangeRequest(item)}>
								Keep Editing  
						</Button>
						<Button className="btn btn-warning mr-2 btn-sm text-dark" 
							title="Submit Change Request for Review"
							onClick={()=>submitCR(id)}>
							<AiOutlineCheck className="mr-1"/><small className="fw-bold"></small>
								Ready for Review
						</Button>
						<Button className="bg-success text-dark mr-4 btn btn-sm" onClick={()=>goToDiffPage(item)}>
							View Diff</Button>
						<Button className="bg-danger text-dark mr-4 btn btn-sm" title="you are closing your CR" onClick={()=>closeCR(id)}>Close</Button>
						
					</React.Fragment> 
			case SUBMITTED: 
				return <React.Fragment>
					<Button title="go to diff page to review" className="btn btn-warning mr-2 btn-sm text-dark"  onClick={()=>goToDiffPage(item)} >Review</Button>
					<Button className="bg-light text-dark mr-4 btn btn-sm" onClick={()=>reopenCR(id)}>Reopen</Button>
					<Button className="bg-danger text-dark mr-4 btn btn-sm" title="you are closing your CR"  onClick={()=>closeCR(id)}>Close</Button>
				</React.Fragment>
			case REJECTED: 
				return <React.Fragment>
					   		{/*<Badge bg="danger text-dark mr-4" >{REJECTED}</Badge>*/}
					   		<Button className="bg-light text-dark mr-4 btn btn-sm" onClick={()=>reopenCR(id)}>Reopen</Button>
					   </React.Fragment>
			case MERGED : 
				return <React.Fragment>
							<Button className="bg-success text-dark mr-4 btn btn-sm" onClick={()=>goToDiffPage(item)}>View Approved Diff</Button>
							<Button className="bg-light text-dark mr-4 btn btn-sm" onClick={()=>reopenCR(id)}>Reopen</Button>
					  </React.Fragment>
			case CLOSE :
				return ""
		}
	}
 
	
	const formatListItem=()=>{
		if(!changeRequestList) return ""
		let statusCount=0
        let display=changeRequestList.slice(0).reverse().map((item,index)=>{
			if(item.status === filter) {
				statusCount+=1
				const name  = item.name || ''
				const message  = item.messages[0].text || '' //item[tracking_branch]
				return  <ListGroup.Item  key={`item___${index}`}  className="d-flex justify-content-between align-items-start">
					{iconTypes[item.status]}
					<div className="ms-2 me-auto">
						<div className="fw-bold text-success">
							{name}
							<span class="text-dark ml-1 badge bg-light mr-1">{item.tracking_branch}</span>
						 		from branch 
							<span class="text-dark ml-1 badge bg-success">{item.original_branch}</span>
						
						</div>					
						<div className="text-gray font-italic">
							{message}
						</div>
						<small className="text-light text-small fw-bold">
							opened {getDays(item.creation_time)} days ago by {item['creator_email'] || item['creator']}
						</small>
					</div>
					{buttonstatus(item)}
				</ListGroup.Item>
			}
        })
		if(!statusCount) {
			return <Card>
				<Card.Body>
					{`No ${filter} Change Requests to display ...`}
				</Card.Body>
			</Card>
		}
		else return display
    }

	return <Layout showLeftSideBar={true}>  
		<div className="content mr-3 ml-5">  
		{updateChangeRequestID && <SubmitChangeRequestModal operation={updateOperation} updateChangeRequestID={updateChangeRequestID} showModal={updateChangeRequestID!==false} setShowModal={setShowUpdateChangeRequestID} updateParent={updateParent}/>}            
			<div className="mt-5 mb-5 mr-5">
				<Card>
					<Card.Header>
						{changeRequestList && getHeader(filter)}
					</Card.Header>
					<Card.Body className="p-0">
						<ListGroup as="ol" key={"ListGroup"}> 
							{loading && <Loading message={`Fetching Change Requests ...`}/>}
							{changeRequestList && formatListItem()}
						</ListGroup>
					</Card.Body>
				</Card>
			</div>
		</div>
	</Layout>
}