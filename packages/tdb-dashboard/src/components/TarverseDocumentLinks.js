import React, {useEffect, useState}  from "react";
import Modal from 'react-bootstrap/Modal'
import {WOQLClientObj} from '../init-woql-client'
import * as CONST from "./constants"
import {onTraverse} from "./DocumentComponents"
import {GetDocumentHook} from "../hooks/DocumentHook"
import Alert from 'react-bootstrap/Alert'
import {Loading} from "../components/Loading"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import Button from 'react-bootstrap/Button'
import {AiOutlineArrowRight} from "react-icons/ai"
import Card from "react-bootstrap/Card"
import {AiOutlineClose} from "react-icons/ai"
 
const ShowLinkRoute = ({linkArray, handleTraverse}) => {
	let elements=[]

	console.log("linkArray", linkArray)

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

export const TarverseDocumentLinks = ({show, onHide, clicked, setClicked}) => {

	const { 
        woqlClient,
		frames
    } = WOQLClientObj()

	// constants to store document data 
    const [data, setData]=useState(false)
	const [documentID, setDocumentID]=useState(false)
	const [type, setType]=useState(false)

	// document tarverse array
	const [linkArray, setLinkArray]=useState([])

	const [loading, setLoading]=useState(false)
    const [errorMsg, setErrorMsg]=useState(false)


	useEffect(() => {
		if(clicked) setDocumentID(clicked)
	}, [clicked])
	
	function removeDocumentIDFromLinkArray(setLinkArray) {
		// clear array on close
		setLinkArray([])
	}

	useEffect(() => {
        if(documentID) {
			let extractedType = documentID.substring(0, documentID.indexOf("/"))
			setType(extractedType)
            setDocumentID(documentID)
			let tempArray=linkArray
			if(tempArray.includes(documentID)) {
				//tempArray.filter(arr => arr !== documentID)
				let elemsToDelete = tempArray.length - 1 - tempArray.indexOf(documentID)
				tempArray.splice(tempArray.length - elemsToDelete, elemsToDelete)
			}
			else tempArray.push(documentID)
			setLinkArray(tempArray)
			//setLinkArray(arr => [...arr, documentID])
        }
    }, [documentID])

	//loading and error message
	// hook to view a document 
    const viewResult = GetDocumentHook(woqlClient, documentID, setData, setLoading, setErrorMsg) || null

	function handleClose (e) {
		removeDocumentIDFromLinkArray(setLinkArray) 
		if(setClicked) setClicked(false)
		setDocumentID(false)
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
			{errorMsg && <Alert variant={"danger"} className="mr-3">
				{errorMsg}
			</Alert>}
			{loading && <Loading message={`Fetching ${documentID} ...`}/>}
			{!frames && !type && <Loading message={`Fetching ${documentID} ...`}/>}
			<ShowLinkRoute linkArray={linkArray} handleTraverse={handleTraverse}/>
			{type && <FrameViewer frame={frames}
				type={type}
				mode={CONST.VIEW_DOCUMENT}
				formData={data}
				hideSubmit={true}
				onTraverse={handleTraverse}/>}
        </Modal.Body>
    </Modal>
}