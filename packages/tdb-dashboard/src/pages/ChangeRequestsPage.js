import React, {useEffect, useState} from "react";
import {Container , Card, Button, ListGroup,Badge} from "react-bootstrap"
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {WOQLClientObj} from '../init-woql-client'
import {ChangeRequest} from "../hooks/ChangeRequest"
import {BiGitPullRequest} from "react-icons/bi"
import Stack from 'react-bootstrap/Stack'
import {Loading} from "../components/Loading" 
import {BiCheck} from "react-icons/bi"
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
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Layout } from "./Layout";
import { FiMoreHorizontal } from "react-icons/fi"
import * as cyCONST from "../cypress.constants"
import { CopyButton } from "../components/utils"
import { AiOutlineArrowLeft, AiOutlineSearch} from "react-icons/ai"
import { BiUndo } from "react-icons/bi"
import { TbArrowsDiff } from "react-icons/tb"
import { IoMdClose } from "react-icons/io"
import { BranchBadge } from "../components/BranchBadge"

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
				<Button variant="dark" data-cy={cyCONST.MERGED_CR} onClick={(e) => displayCRs(MERGED)} className="btn bg-transparent border-0 text-gray">   
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


	const OtherActions = ({item}) => {
		if(item.status === REJECTED || item.status === CLOSE) return <div/>
		return <DropdownButton
			as={ButtonGroup}
			key={cyCONST.MORE_CR_ACTIONS}
			id={cyCONST.MORE_CR_ACTIONS}
			data-cy={cyCONST.MORE_CR_ACTIONS}
			variant={"Secondary"}
			title={<FiMoreHorizontal	className="mb-1"/>}>
				{actions(item)}
		</DropdownButton>
	}


	const actions = (item) => {
		const id = extractID(item["@id"]) 
		switch (item.status) { 
			case OPEN :
				return <React.Fragment>
					<Dropdown.Item eventKey={cyCONST.CR_KEEP_EDITING} 
						onClick={()=>setChangeRequest(item)}
						title = "Continue Editing in this Change Request">
							<AiOutlineArrowLeft className="mr-1 text-light"/> <label>Continue Editing</label>
					</Dropdown.Item>
					<Dropdown.Item eventKey={cyCONST.CR_VIEW_DIFF}
						onClick={()=>goToDiffPage(item)}>
							<TbArrowsDiff className="mr-1 text-success"/> <label>View Diff</label>
					</Dropdown.Item>
					<Dropdown.Item eventKey={cyCONST.CR_CLOSE}
						title="you are closing your CR"
						onClick={()=>closeCR(id)}> 
							<IoMdClose className="mr-1 text-danger"/> <label>Close Change Request </label>
					</Dropdown.Item>
				</React.Fragment> 
			case SUBMITTED: 
				return <React.Fragment>
					<Dropdown.Item eventKey={cyCONST.CR_REOPEN} 
						onClick={()=>reopenCR(id)}
						title = "Reopen this Change Request">
							<BiUndo className="mr-1 text-light"/> <label>Reopen</label>
					</Dropdown.Item>
					<Dropdown.Item eventKey={cyCONST.CR_CLOSE} 
						onClick={()=>closeCR(id)}
						title = "Close this Change Request">
							<IoMdClose className="mr-1 text-danger"/>  <label>Close</label>
					</Dropdown.Item>
				</React.Fragment>
		
			case MERGED : 
				return <React.Fragment>
					<Dropdown.Item eventKey={cyCONST.CR_VIEW_DIFF} 
						onClick={()=>goToDiffPage(item)}
						title = "View Approved Diff">
							<TbArrowsDiff className="mr-1 text-success"/> <label>View Approved Diff</label>
					</Dropdown.Item>
					<Dropdown.Item eventKey={cyCONST.CR_CLOSE} 
						onClick={()=>reopenCR(id)}
						title = "Reopen this Change Request">
							<BiUndo className="mr-1 text-light"/>  <label>Reopen</label>
					</Dropdown.Item>
				</React.Fragment>

			case CLOSE :
				return ""
		}
	}

	function buttonstatus (item, actions) {
		const id = extractID(item["@id"]) 
		switch (item.status) { 
			case OPEN :
				return <React.Fragment>
						<Button className="btn btn-sm border border-secondary  bg-secondary" 
							title="Submit Change Request for Review"
							data-cy={cyCONST.CR_READY_FOR_REVIEW}
							onClick={()=>submitCR(id)}>
							<BiCheck className="mr-1 text-warning" size={24}/>
							<span className="text-gray">Ready for review</span>
						</Button>
					</React.Fragment> 
			case SUBMITTED: 
				return <React.Fragment>
					<Button data-cy={cyCONST.CHANGE_REQUEST_SUBMIT_REVIEW_FOR_DIFF} 
						title="Review CR after viewing Diffs" 
						className="btn btn-sm border border-secondary  bg-secondary" 
						onClick={()=>goToDiffPage(item)} >
							<AiOutlineSearch className="mr-1 text-warning" size={20}/>
							<span className="text-gray">Review</span>
					</Button>
				</React.Fragment>
			case REJECTED: 
				return <React.Fragment>
					<Button className="btn btn-sm border border-secondary  bg-secondary" 
						data-cy={cyCONST.CR_REOPEN}
						onClick={()=>reopenCR(id)}>
							<BiUndo className="mr-1 text-light" size={24}/>
							<span className="text-gray">Reopen</span>
					</Button>
				</React.Fragment>
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
					<Stack>
						<Stack direction="horizontal" gap={3} className="w-100">
							{iconTypes[item.status]}
							<div>
								<h6>{message}</h6> 
								<label className="text-light fst-italic">
									opened {getDays(item.creation_time)} days ago by {item['creator_email'] || item['creator']}
								</label>
							</div>
							<BranchBadge branchName={item.original_branch} 
							 className="ms-auto" variant={"success"}/>
							{buttonstatus(item)}
							<OtherActions item={item}/>
						</Stack>
					</Stack>
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