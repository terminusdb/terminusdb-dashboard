import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import {InitObj} from "./init"

const SelectList = () => {
	const {
        documentClasses,
		setType,
        clear
	} = InitObj()

	let options=[]

	if(documentClasses) {
		documentClasses.map(doc => {
			options.push(
				<option value={doc["@id"]} key={doc["@id"]}>{doc["@id"]}</option>
			)
		})
	}

	function handleOptions (e) {
		if(clear) clear()
		setType(e.target.value)
	}

	return <Form.Select aria-label="select_documents" onChange={handleOptions} className="mt-1">
		{options}
	</Form.Select>
}

export const Input = () => { 
	const {
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

	return <React.Fragment>
		<Stack direction="horizontal" gap={1} className="mb-3 h5">
			<span>{`Connected to `}</span>
			<span className="fw-bold text-success">{dataProduct}</span>
		</Stack>
		{/*<span className="text-muted">{`Select a document type`}</span> 
		<Form noValidate validated={validated} onSubmit={handleSubmit}>
			<SelectList/>
		</Form>*/}
	</React.Fragment>
}