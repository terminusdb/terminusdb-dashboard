import React, {useEffect, useState}  from "react";
import {Modal, ProgressBar} from 'react-bootstrap'
import * as CONST from "./constants"
import Alert from 'react-bootstrap/Alert'
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import Button from 'react-bootstrap/Button'
import {AiOutlineArrowRight} from "react-icons/ai"
import Card from "react-bootstrap/Card"
import {AiOutlineClose} from "react-icons/ai"
 
/**
 * 
 * @param {*} clicked document clicked by user to traverse
 * @param {*} setClicked function to store which document has been clicked by user
 * this function is only used in DocumentView & for Traversing via documents
 */
export function onTraverse(documentID, setClicked) { 
    if(setClicked) setClicked(documentID)
}


const ShowLinkRoute = ({linkArray, handleTraverse}) => {
	let elements=[]
	linkArray.map((link, index) => {
		elements.push(<span>
			<Button variant="link" onClick={(e) => {handleTraverse(link)}}>{`${link}`}</Button>
			{index !== linkArray.length-1 && <AiOutlineArrowRight className="fw-bold h4 mt-2 "/>}
		</span>
		)
	})

	if(linkArray && linkArray.length > 1) {
		return <Card className="border bg-dark border-secondary mb-4">
			<Card.Header className="small fw-bold text-muted">
				{`Click through below links to traverse through documents ...`}
			</Card.Header>
			<Card.Body>
				{elements}
			</Card.Body>
		</Card>
	}

	return <div/>
}
//__KITTY
export const TraverseDocumentLinks = ({show, onHide, clicked,getDocumentById,frames}) => {
	const [documentID, setDocumentID]=useState(false)
	const [type, setType]=useState(false)
	const [loading, setLoading]=useState(false)
	const [error, setError]=useState(false)
	const [result, setResult]=useState(false) 


	// document tarverse array
	const [linkArray, setLinkArray]=useState([])

	useEffect(() => {
		if(clicked) {
			setDocumentID(clicked)
		}
	}, [clicked])
	
	function removeDocumentIDFromLinkArray(setLinkArray) {
		// clear array on close
		setLinkArray([])
	}

	const getDocument = async (documentID) =>{
		if(!getDocumentById)return 
		try{
			setLoading(true)
			const result = await getDocumentById(documentID)	
			setResult(result) 
		}catch(err){
			setError(err.message)
		}
	}

	useEffect(() => {
        if(documentID) {
			getDocument(documentID)
			let extractedType = documentID.substring(0, documentID.indexOf("/"))
			setType(extractedType)
          	let tempArray=linkArray
			if(tempArray.includes(documentID)) {
				//tempArray.filter(arr => arr !== documentID)
				let elemsToDelete = tempArray.length - 1 - tempArray.indexOf(documentID)
				tempArray.splice(tempArray.length - elemsToDelete, elemsToDelete)
			}
			else tempArray.push(documentID)
			setLinkArray(tempArray)
        }
    }, [documentID])

	function handleClose (e) {
		removeDocumentIDFromLinkArray(setLinkArray) 
		onHide()
	}

	function handleTraverse (documentID) {
        onTraverse(documentID, setDocumentID)
    }

    return <Modal
        show={show}
		onHide={handleClose}
        size="md"
        aria-labelledby="traverse__document__links"
        centered>
        <Modal.Header className=" w-100"> 
			<Modal.Title id="traverse__document__links" className="text-success h6 w-100">
				<strong className="text-success">
					<span className="mr-1 h6 fst-italic">{CONST.VIEW_DOCUMENT}:</span> 
					<span className="fw-bolder h6"> {documentID} </span>
            	</strong>
				<Button className=" ms-auto btn btn-sm bg-transparent text-light border-0 float-right" 
					title="Close"
					onClick={handleClose}>
					<AiOutlineClose/>
				</Button>
			</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height: "500px"}} className="p-4">
			{error && <Alert variant={"danger"} className="mr-3">{error}</Alert>}
			{loading ||  (!frames && !type) && <ProgressBar message={`Fetching ${documentID} ...`}/>}
			<ShowLinkRoute linkArray={linkArray} handleTraverse={handleTraverse}/>
			{type && frames && result && 
			<FrameViewer frame={frames}
				type={type}
				mode={CONST.VIEW_DOCUMENT}
				formData={result}
				hideSubmit={true}
				onTraverse={handleTraverse}/>}
        </Modal.Body>
    </Modal>
}