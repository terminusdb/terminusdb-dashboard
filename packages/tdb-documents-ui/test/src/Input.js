import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import {ModeBar} from "./ModeBar"
import Card from "react-bootstrap/Card"
import Stack from 'react-bootstrap/Stack'
import {InitObj} from "./init"

const SelectList = () => {
	const {
        documentClasses,
		setType
	} = InitObj()

	let options=[]

	if(documentClasses) {
		documentClasses.map(doc => {
			options.push(
				<option value={doc["@id"]}>{doc["@id"]}</option>
			)
		})
	}

	function handleOptions (e) {
		//console.log("e.target.value", e.target.value)
		setType(e.target.value)
	}

	return <Form.Select aria-label="select_documents" onChange={handleOptions} className="mb-3">
		{options}
	</Form.Select>
}

export const Input = () => {
	const {
        setDocumentID,
		dataProduct
	} = InitObj()

	const [validated, setValidated] = useState(false)

	const handleSubmit = (event) => {
		event.preventDefault()
		const form = event.currentTarget
		if (form.checkValidity() === false) {
			event.stopPropagation()
		}
		setValidated(true)
	}

	function handleDocumentID(e) {
		if(setDocumentID) setDocumentID(e.target.value)
	}

	return <Card className="mb-5">
		<Card.Header className="bg-light text-dark">
			<Stack direction="horizontal" gap={1}>
				<span>{`Connected to `}</span>
				<span className="fw-bold">{` ${dataProduct}`}</span>
			</Stack>
		</Card.Header>
		<Card.Body>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<SelectList/>
			
				<Form.Group as={Col} md="12" controlId="data_product_id" className="tdb__input mb-3">
					<Form.Control type="text" placeholder="Enter Document ID" required onChange={handleDocumentID}/>
					<Form.Control.Feedback type="invalid">
						Please enter document ID to display 
					</Form.Control.Feedback>
				</Form.Group>
				<ModeBar/>
				<Button type="submit" className="text-dark" variant="light">Go</Button>
			</Form>
		</Card.Body>
	</Card>
}